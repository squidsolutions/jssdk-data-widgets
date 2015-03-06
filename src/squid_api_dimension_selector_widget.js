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

            // listen for filters change as we use them to filter out boolean dimensions
            squid_api.model.filters.on("change", function() {
                me.render();
            });
            
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
                var running = (squid_api.model.status.get("status") != squid_api.model.status.STATUS_DONE);
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
            var isMultiple = true;
            var me = this;

            if (this.dimensionIndex !== null) {
                isMultiple = false;
            }
            
            var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};
            
            // iterate through all filter facets
            var selection = this.filters.get("selection");
            if (selection) {
                var facets = selection.facets;
                if (facets) {
                    var dimensions = [];
                    var dims = facets;
                    for (var i=0; i<facets.length; i++){
                        var facet = facets[i];
                        // do not display boolean dimensions
                        // this is a workaround as the API should return a dimension type
                        var isBoolean = false;
                        if ((facet.items.length == 1) && (facet.items[0].value == "true")) {
                            isBoolean = true; 
                        }
                        
                        if (!isBoolean) {
                            if (this.dimensionIdList) {
                                // insert and sort
                                var idx = this.dimensionIdList.indexOf(facet.dimension.oid);
                                if (idx >= 0) {
                                    dimensions[idx] = facet;
                                }
                            } else {
                                // default unordered behavior
                                dimensions.push(facet);
                            }
                        }
                    }
                    
                    for (var dimIdx=0; dimIdx<dimensions.length; dimIdx++) {
                        var facet1 = dimensions[dimIdx];
                        // check if selected
                        var selected = this.isChosen(facet1);
                        // add to the list
                        var option = {"label" : facet1.dimension.name, "value" : facet1.id, "selected" : selected};
                        jsonData.options.push(option);
                    }
                }
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            // Initialize plugin
            var selector = this.$el.find("select");
            if (isMultiple) {
                 selector.multiselect({
                    buttonText: function(options, select) {
                        return 'Dimensions';
                    },
                    onChange: function(option, selected, index) {
                        var chosenModel = _.clone(me.model.get("chosenDimensions"));
                        var currentItem = option.attr("value");

                        if (selected) {
                            chosenModel.push(option.attr("value"));
                            me.model.set({"chosenDimensions": chosenModel});
                            me.model.set("selectedDimension", currentItem);
                        } else {
                            // If deselected remove item from array
                            for (var i = chosenModel.length; i--;) {
                                if (chosenModel[i] === currentItem) {
                                    chosenModel.splice(i, 1);
                                }
                            }
                            me.model.set({"chosenDimensions": chosenModel});
                        }
                    }
                });
            } else {
                this.$el.find("select").on("change", function() {
                    var dimension = $(this).val();
                    me.model.set({"selectedDimension": dimension});
                });
            }

            // Remove Button Title Tag
            this.$el.find("button").removeAttr('title');

            return this;
        },
        
        isChosen : function(dim) {
            var selected = false;

            var dimensions = this.model.get("chosenDimensions");

            if (dimensions) {
                if (this.dimensionIndex !== null) {
                    if (dim.oid == dimensions[this.dimensionIndex]) {
                        selected = true;
                    }
                } else {
                    for (var j=0; j<dimensions.length; j++) {
                        if (dim.oid == dimensions[j]) {
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
