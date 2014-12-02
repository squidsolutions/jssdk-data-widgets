(function (root, factory) {
    root.squid_api.view.DimensionSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        dimensions : null,
        dimensionIdList : null,
        dimensionIndex: null,
        chosenDimensionModel : null,
        selectedDimensionsModel : null,

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
            if (options.chosenDimensionModel) {
                this.chosenDimensionModel = options.chosenDimensionModel;
            }
            if (options.selectedDimensionsModel) {
                this.selectedDimensionsModel = options.selectedDimensionsModel;
            }

            this.model.on('change', function() {
                me.render();
            });

            this.render();
        },

        setModel: function(model) {
            this.model = this.chosenDimensionModel;
            this.initialize();
        },

        events: {
            "change": function(event) {
                var oid = this.$el.find("select option:selected");
                var selected = [];

                for (i = 0; i < oid.length; i++) {
                    var dimension = {};
                    
                    dimension.name = $(oid[i]).text();
                    dimension.value = $(oid[i]).val();

                    selected.push(dimension);
                }

                // Update
                this.chosenDimensionModel.set({"dimensions" : selected});
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
                    
                    for (var dimIdx=0; dimIdx<dimensions.length; dimIdx++) {
                        var dimension = dimensions[dimIdx];
                        // check if selected
                        var selected = this.isSelected(dimension);
                        
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
                    onChange: function(option, checked) {
                        if (checked) {
                            // Update Selected Item
                            var selectedItem = [$(option).attr("value")];
                            me.selectedDimensionsModel.set({"dimensions": selectedItem});
                        }
                    }
                });
            }

            return this;
        },
        
        isSelected : function(dim) {
            var selected = false;

            var dimensions = this.model.get("dimensions");
            if (!dimensions && (this.model.get("analyses"))) {
                // multi-analysis case
                dimensions = this.model.get("analyses")[0].get("dimensions");
            }

            if (dimensions) {
                if (this.dimensionIndex !== null) {
                    if (dim.oid == dimensions[this.dimensionIndex].dimensionId) {
                        selected = true;
                    }
                } else {
                    for (var j=0; j<dimensions.length; j++) {
                        if (dim.oid == dimensions[j].dimensionId) {
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
