(function (root, factory) {
    root.squid_api.view.DimensionSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        dimensionIdList : null,
        dimensionIndex: null,

        initialize: function(options) {
            var me = this;
            
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
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
                    }
                } else {
                    // computation is done : enable input
                    select.removeAttr("disabled");
                    if (isMultiple) {
                        select.multiselect('enable');
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
            
            // iterate through all domains dimensions
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);
            if (domain) {
                if (domain.dimensions) {
                    var dimensions = [];
                    var dims = domain.dimensions;
                    for (var i=0; i<dims.length; i++){
                        var dim = dims[i];
                        // do not display boolean dimensions
                        // this is a workaround as the API should return a dimension type
                        var isBoolean = false;
                        var filters = squid_api.model.filters;
                        if (filters ) {
                            var sel = filters.get("selection");
                            if (sel) {
                                var facets = sel.facets;
                                var fi = 0;
                                while ((fi < facets.length) && (!isBoolean)) {
                                    var facet = facets[fi];
                                    fi++;
                                    if (facet.dimension.oid == dim.oid) {
                                        if ((facet.items.length == 1) && (facet.items[0].value == "true")) {
                                            isBoolean = true; 
                                        }
                                    }
                                }
                            }
                        }
                        
                        if (!isBoolean) {
                            if (this.dimensionIdList) {
                                // insert and sort
                                var idx = this.dimensionIdList.indexOf(dim.oid);
                                if (idx >= 0) {
                                    dimensions[idx] = dim;
                                }
                            } else {
                                // default unordered behavior
                                dimensions.push(dim);
                            }
                        }
                    }
                    
                    for (var dimIdx=0; dimIdx<dimensions.length; dimIdx++) {
                        var dimension = dimensions[dimIdx];
                        // check if selected
                        var selected = this.isChosen(dimension);
                        
                        // add to the list
                        var option = {"label" : dimension.name, "value" : dimension.oid, "selected" : selected};
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
                        return 'Dimensions <span class="caret"></span>';
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
