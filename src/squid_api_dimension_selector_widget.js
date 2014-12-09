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
            
            api.model.status.on("change:domain", function() {
                me.render();
            }); 
            
            if (this.model) {
                this.model.on("change:chosenDimensions", function() {
                    me.render();
                });
            }

            this.render();
        },

        events: {
            "change": function(item) {
                var oid = this.$el.find("select option:selected");
                var chosenDimensions = this.model.get("chosenDimensions");

                var selected = [];

                for (i = 0; i < oid.length; i++) {
                    selected.push($(oid[i]).val());
                }

                // Compare selected with chosen
                var compare = [];
                for (i=0; i<selected.length; i++) {
                    var count = 0;
                    for (s=0; s<chosenDimensions.length; s++) {
                        if (selected[i] === chosenDimensions[s]) {
                            count++;
                        }
                    }
                    var obj = {};
                    obj.dimension = selected[i];
                    obj.count = count;
                    compare.push(obj);
                }

                // Get different dimension and set as selected
                var diffDimension;
                for (i=0; i<compare.length; i++) {
                    if (compare[i].count === 0) {
                        diffDimension = compare[i].dimension;
                    }
                }

                // Set selected Dimension
                if (diffDimension !== undefined) {
                    this.model.set({"selectedDimension" : diffDimension});
                }

                // Update chosen Dimensions
                this.model.set({"chosenDimensions" : selected});
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
                        return 'Dimensions';
                    },
                });
            }

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
