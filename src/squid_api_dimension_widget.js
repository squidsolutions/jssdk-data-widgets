(function (root, factory) {
    root.squid_api.view.DimensionView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        selectDimension: false,
        filters : null,

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

            if (options.selectDimension) {
                this.selectDimension = options.selectDimension;
            }
            
            // listen for selection change as we use it
            this.filters.on("change:selection", function() {
                me.render();
            });

            this.model.on("change:chosenDimensions", function() {
                me.render();
            });

            this.model.on("change:selectedDimension", function() {
                me.render();
            });

            this.render();
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            // Dimension Sorting
            "change": function(event) {
                var dimensions = this.$el.find(".sortable li");
                var selected = [];

                for (i = 0; i < dimensions.length; i++) {
                    selected.push($(dimensions[i]).attr("data-content"));
                }

                // Update
                this.model.set({"chosenDimensions" : selected});

            },
            // Dimension Selection
            "click li": function(item) {
                if (this.selectDimension) {
                    var itemClicked = $(item.currentTarget);

                    if (itemClicked.attr("data-selected")) {
                        itemClicked.removeAttr("data-selected");
                        itemClicked.removeClass("ui-selected");
                        this.model.set({"selectedDimension" : null});
                    } else {
                        itemClicked.attr("data-selected", "true");
                        itemClicked.siblings().removeAttr("data-selected").removeClass("ui-selected");
                        this.model.set({"selectedDimension" : itemClicked.attr("data-content")});
                    } 
                } 
            }
        },

        render: function() {
            var chosenDimensions = this.model.get("chosenDimensions");
            var jsonData = {"chosenDimensions" : []};
            var html;
            
            // iterate through all filter facets
            var selection = this.filters.get("selection");
            if (chosenDimensions && selection) {
                var facets = selection.facets;
                if (facets) {
                    var chosenFacets = [];
                    for (var dc=0; dc<chosenDimensions.length; dc++) {
                        for (var d=0; d<facets.length; d++){
                            var facet = facets[d];
                            if (chosenDimensions[dc] == facet.id) {
                                var item = {};
                                item.id = facet.id;
                                if (facet.name) {
                                    item.value = facet.name;
                                } else {
                                    item.value = facet.dimension.name;
                                }
                                chosenFacets.push(item);
                            }
                        } 
                    }
                    jsonData.chosenDimensions = chosenFacets;
                }
            } else {
                html = this.template({"noChosenDimensions" : true});
            }
                
            if (jsonData.chosenDimensions.length === 0) {
                html = this.template({"noChosenDimensions" : true});
            } else {
                html = this.template(jsonData);
            }
            
            this.$el.html(html);

            this.$el.show();

            // Make dimesions sortable & selectable
            this.dimensionSort();

            // Select selected dimension
            this.selectItem();

            return this;
        },

        selectItem: function() {
            var me = this;
            var dimensions = this.$el.find(".sortable li");
            if (this.selectDimension) {
                for (i = 0; i < dimensions.length; i++) {
                    if ($(dimensions[i]).attr("data-content") === me.model.get("selectedDimension")) {
                        $(dimensions[i]).attr("data-selected", "true");
                        $(dimensions[i]).addClass("ui-selected");
                    }
                }
            }
        },

        dimensionSort : function() {
            this.$el.find(".sortable").sortable({
                revert: true,
                stop: function(event, ui) { ui.item.trigger("change"); }
            });
        }
    });

    return View;
}));
