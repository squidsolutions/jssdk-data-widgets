(function (root, factory) {
    root.squid_api.view.DimensionView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

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
        },

        render: function() {
            var chosenDimensions = this.model.get("chosenDimensions");
            var jsonData = {"chosenDimensions" : []};
            var html;
            
            // iterate through all domains dimensions
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);

            if (domain) {
                if (domain.dimensions) {
                    var dimensions = [];
                    var dims = domain.dimensions;
                    for (var dc=0; dc<chosenDimensions.length; dc++) {
                        for (var d=0; d<dims.length; d++){
                            var dim = dims[d];
                            if (chosenDimensions[dc] == dims[d].oid) {
                                var item = {};
                                item.id = dims[d].oid;
                                item.value = dims[d].name;
                                dimensions.push(item);
                            }
                        } 
                    }
                    jsonData.chosenDimensions = dimensions;
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

            for (i = 0; i < dimensions.length; i++) {
                if ($(dimensions[i]).attr("data-content") === me.model.get("selectedDimension")) {
                    $(dimensions[i]).attr("data-selected", "true");
                    $(dimensions[i]).addClass("ui-selected");
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
