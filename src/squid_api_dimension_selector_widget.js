(function (root, factory) {
    root.squid_api.view.DimensionSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        dimensionIdList : null,
        dimensionIndex: null,
        filters: null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            if (options.filters) {
                this.filters = options.filters;
            } else {
                this.filters = squid_api.model.filters;
            }

            if (options.dimensionIdList) {
                this.dimensionIdList = options.dimensionIdList;
            }
            if (options.dimensionIndex !== null) {
                this.dimensionIndex = options.dimensionIndex;
            }

            // listen for selection change as we use it to get dimensions
            this.filters.on("change:selection", function() {
                me.render();
            });

            if (!this.model) {
                this.model = squid_api.model.config;
            }

            // listen for global status change
            squid_api.model.status.on('change:status', this.enable, this);
        },

        enable: function() {
            var select = this.$el.find("select");
            var multiSelectDropdown = this.$el.find(".multiselect-container");
            if (select) {
                var isMultiple = true;
                if (this.dimensionIndex !== null) {
                    isMultiple = false;
                }
                var running = (squid_api.model.status.get("status") !== squid_api.model.status.STATUS_DONE);
                if (running) {
                    // computation is running : disable input
                    select.attr("disabled","disabled");
                    if (isMultiple) {
                        select.multiselect('disable');
                        multiSelectDropdown.append("<div class='dropdownDisabled'></div>");
                    }
                } else {
                    // computation is done : enable input
                    select.removeAttr("disabled");
                    if (isMultiple) {
                        select.multiselect('enable');
                        multiSelectDropdown.find(".dropdownDisabled").remove();
                    }
                }
            }
        },

        render: function() {
            var me = this;
                squid_api.utils.fetchModel("project").then(function(project) {
                    squid_api.utils.fetchModel("domain").then(function(domain) {
                        var isMultiple = true;

                        if (me.dimensionIndex !== null) {
                            isMultiple = false;
                        }

                        var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};

                        // iterate through all filter facets
                        var selection = me.filters.get("selection");
                        if (selection) {
                            var facets = selection.facets;
                            if (facets) {
                                me.dimensions = [];
                                for (var i=0; i<facets.length; i++){
                                    var facet = facets[i];
                                    if (facet.dimension.dynamic === false || domain.get("dynamic") === true) {
                                        var isBoolean = false;
                                        if (facet.dimension.type === "SEGMENTS") {
                                            isBoolean = true;
                                        }
                                        if (facet.items) {
                                        	if ((facet.items.length === 1) && (facet.items[0].value === "true")) {
                                        		isBoolean = true;
                                        	}
                                        }
                                        // do not display boolean dimensions
                                        if (!isBoolean) {
                                            if (me.dimensionIdList) {
                                                // insert and sort
                                                var idx = me.dimensionIdList.indexOf(facet.dimension.oid);
                                                if (idx >= 0) {
                                                    me.dimensions[idx] = facet;
                                                }
                                            } else {
                                                // default unordered behavior
                                                me.dimensions.push(facet);
                                            }
                                        }
                                        // avoid holes
                                        if (!me.dimensions[i]) {
                                            me.dimensions[i] = null;
                                        }
                                    }
                                }
                                var noneSelected = true;
                                for (var dimIdx=0; dimIdx<me.dimensions.length; dimIdx++) {
                                    var facet1 = me.dimensions[dimIdx];
                                    if (facet1) {
                                        // check if selected
                                        var selected = me.isChosen(facet1);
                                        if (selected === true) {
                                            noneSelected = false;
                                        }
                                        // add to the list
                                        var name;
                                        if (facet1.name) {
                                            name = facet1.name;
                                        } else {
                                            name = facet1.dimension.name;
                                        }
                                        var option = {"label" : name, "value" : facet1.id, "selected" : selected, "error" : me.dimensions[dimIdx].error};
                                        jsonData.options.push(option);
                                    }
                                }
                                if (noneSelected === true) {
                                    me.model.set("chosenDimensions", []);
                                }
                            }
                        }

                        // Alphabetical Sorting
                        jsonData.options.sort(function(a, b) {
                            var labelA=a.label.toLowerCase(), labelB=b.label.toLowerCase();
                            if (labelA < labelB) {
                                return -1;
                            }
                            if (labelA > labelB) {
                                return 1;
                            }
                            return 0; // no sorting
                        });

                        // check if empty
                        if (jsonData.options.length === 0) {
                            jsonData.empty = true;
                        }

                        var html = me.template(jsonData);
                        me.$el.html(html);
                        me.$el.show();

                        // Initialize plugin
                        var selector = me.$el.find("select");
                        if (isMultiple) {
                             selector.multiselect({
                                buttonContainer: '<div class="squid-api-data-widgets-dimension-selector" />',
                                buttonText: function() {
                                    return 'Dimensions';
                                },
                                onChange: function(option, selected) {
                                    var chosenModel = _.clone(me.model.get("chosenDimensions"));
                                    if (!chosenModel) {
                                        chosenModel = [];
                                    }
                                    var currentItem = option.attr("value");

                                    if (selected) {
                                        chosenModel.push(option.attr("value"));
                                    } else {
                                        // If deselected remove item from array
                                        for (var i = chosenModel.length; i--;) {
                                            if (chosenModel[i] === currentItem) {
                                                chosenModel.splice(i, 1);
                                            }
                                        }
                                    }
                                    me.model.set("chosenDimensions", chosenModel);
                                },
                                onDropdownShown: function() {
                                    if (project.get("_role") === "WRITE" || project.get("_role") === "OWNER") {
                                        me.$el.find("li.configure").remove();
                                        me.$el.find("li").first().before("<li class='configure'> configure</option>");
                                        me.$el.find("li").first().off().on("click", function() {
                                            new squid_api.view.ColumnsManagementWidget({
                                                buttonLabel : "<i class='fa fa-arrows-h'></i>",
                                                type : "Dimension",
                                                collection :new squid_api.model.DimensionCollection(),
                                                model : new squid_api.model.DimensionModel(),
                                                autoOpen : true,
                                                successHandler : function() {
                                                    var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                                                    squid_api.model.status.set({'message' : message});
                                                }
                                            });
                                        });
                                    }
                                }
                            });
                        } else {
                            var selectedDimension = me.model.get("selectedDimension");

                            me.$el.find("select").on("change", function() {
                                var dimension = $(me).val();
                                me.model.set("chosenDimensions", [dimension]);
                            });

                            if (selectedDimension) {
                                me.$el.find("select").val(selectedDimension);
                            }
                        }

                        // Remove Button Title Tag
                        me.$el.find("button").removeAttr('title');
                    });
                });

            return this;
        },

        isChosen : function(facet) {
            var selected = false;

            var dimensions = this.model.get("chosenDimensions");

            if (dimensions) {
                if (this.dimensionIndex !== null) {
                    if (facet.id === dimensions[this.dimensionIndex]) {
                        selected = true;
                    }
                } else {
                    for (var j=0; j<dimensions.length; j++) {
                        if (facet.id === dimensions[j]) {
                            selected = true;
                        }
                    }
                }
            }
            return selected;
        }

    });

    return View;
}));
