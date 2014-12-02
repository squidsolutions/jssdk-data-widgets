(function (root, factory) {
    root.squid_api.view.DimensionView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        dimensions : null,
        chosenDimension : null,
        selectedDimensions : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            if (options.chosenDimensionModel) {
                this.chosenDimensions = options.chosenDimensionModel;
            }

            if (options.selectedDimensionModel) {
                this.selectedDimensions = options.selectedDimensionModel;
            }

            this.chosenDimensions.on("change", function() {
                me.render();
            });

            this.selectedDimensions.on("change", function() {
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
                    var dimension = {};
                    
                    dimension.name = $(dimensions[i]).text();
                    dimension.value = $(dimensions[i]).attr("data-content");

                    selected.push(dimension);
                }

                // Update
                this.chosenDimensions.set({"dimensions" : selected});

            },
            // Dimension Selection
            "click li": function(item) {
                var selectionList = this.$el.find(".sortable li");
                var selectedItem = [];

                // Remove currently selected dimension
                for (i=0; i<selectionList.length; i++) {
                    $(selectionList[i]).removeAttr("data-selected");
                    $(selectionList[i]).removeClass("ui-selected");
                }
                
                // Add class and data attributes
                $(item.currentTarget).attr("data-selected", "true");
                $(item.currentTarget).addClass("ui-selected");

                // Add to array
                selectedItem.push($(item.currentTarget).attr("data-content"));

                // Update
                this.selectedDimensions.set({"dimensions": selectedItem});
            }
        },

        render: function() {
            var html = this.template({"chosenDimensions" : this.chosenDimensions.toJSON().dimensions});
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

                if ($(dimensions[i]).attr("data-content") === me.selectedDimensions.toJSON().dimensions[0]) {
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
