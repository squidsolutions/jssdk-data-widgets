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
                me.selectItem();
            });
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
                var selectionList = this.$el.find(".sortable li");

                // Remove currently selected dimension
                for (i=0; i<selectionList.length; i++) {
                    $(selectionList[i]).removeAttr("data-selected");
                    $(selectionList[i]).removeClass("ui-selected");
                }
                
                // Add class and data attributes
                $(item.currentTarget).attr("data-selected", "true");
                $(item.currentTarget).addClass("ui-selected");

                var selectedItem = $(item.currentTarget).attr("data-content");

                // Update
                this.model.set({"selectedDimension" : selectedItem});
            }
        },

        render: function() {
            var chosenDimensions = this.model.get("chosenDimensions");
            var jsonData = {"chosenDimensions" : {}};
            
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
            }

            var html = this.template(jsonData);
            this.$el.html(html);

            this.$el.show();

            // Make dimesions sortable & selectable
            this.dimensionSort();

            return this;
        },

        selectItem: function() {
            var me = this;
            var dimensions = this.$el.find(".sortable li");

            for (i = 0; i < dimensions.length; i++) {
                $(dimensions[i]).removeAttr("data-selected");
                $(dimensions[i]).removeClass("ui-selected");

                if ($(dimensions[i]).attr("data-content") === me.model.get("selectedDimension")[0]) {
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
