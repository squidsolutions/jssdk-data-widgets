(function (root, factory) {
    root.squid_api.view.DisplayTypeSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_displaytype_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

    template : null,
    renderTo : null,
    baseWidget : null,
    squidApiPrefix : "squid_api.view.",
    views: {},

    initialize: function(options) {

        var me = this;

        if (squid_api.view.TimeSeriesView) {
            this.views.TimeSeriesView = true;
        }

        if (squid_api.view.DataTableView) {
            this.views.DataTableView = true;
        }

        if (squid_api.view.FlowChartView) {
            this.views.FlowChartView = true;
        }

        // Store template
        if (options.template) {
            this.template = options.template;
        } else {
            this.template = template;
        }

        // Store Widget Render to element
        if (options.renderTo) {
            this.renderTo = options.renderTo;
        }

        if (options.baseWidget) {
            this.baseWidget = options.baseWidget;
        }

        this.render();
    },

    setModel: function(model) {
        this.model = model;
        this.initialize();
    },

    events: {
        "click li": "changeWidget"
    },

    changeWidget: function(item){
        var me = this;
        var view, widget;

        // Check if a click event has been triggered
        if (item.type === "click") {
            view = this.squidApiPrefix + item.currentTarget.dataset.content;
        } else {
            view = this.squidApiPrefix + item;
        }

        this.$el.find(item.currentTarget).addClass("active");
        this.$el.find(item.currentTarget).siblings().removeClass("active");

        // Select Widget
        if (view === this.squidApiPrefix + "DataTableView") {
            widget = new squid_api.view.DataTableView ({
                el : me.renderTo,
                model : analysis
            });
        } else if (view === this.squidApiPrefix + "TimeSeriesView") {
            widget = new squid_api.view.TimeSeriesView ({
                el : me.renderTo,
                model : analysis
            });
        }

        // Render the widget
        widget.render();
    },

    render: function() {
        var me = this;

        var availableViews = [];

        // Display template
        var html = this.template(this.views);
        this.$el.html(html);

        var baseElement = this.$el.find("li");

        $.each(baseElement, function() {
            $(this).removeClass("active");

            if ($(this).attr("data-content") === me.baseWidget) {
                $(this).addClass("active");
            }
        });

        if (this.baseWidget) {
            this.changeWidget(this.baseWidget);
        }

        return this;
    }
});

return View;

}));
