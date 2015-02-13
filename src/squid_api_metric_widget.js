(function (root, factory) {
    root.squid_api.view.MetricView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        
        format : null,
        
        d3Formatter : null,

        selectMetric : false,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.selectMetric) {
                this.selectMetric = options.selectMetric;
            }

            if (d3) {
                this.d3Formatter = d3.format(",.f");
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (this.d3Formatter) {
                    this.format = function(f){
                        if (isNaN(f)) {
                            return f;
                        } else {
                            return me.d3Formatter(f);
                        }
                    };
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }
            
            if (this.model) {
                this.model.on("change:chosenMetrics", function() {
                    me.render();
                });

                this.model.on("change:selectedMetric", function() {
                    me.render();
                });
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            // Dimension Sorting
            "click li": function(item) {
                if (this.selectMetric) {
                    var metrics = this.$el.find(".chosen-metrics li");

                    for (i = 0; i < metrics.length; i++) {
                        $(metrics[i]).removeAttr("data-selected");
                        $(metrics[i]).removeClass("ui-selected");
                    }

                    $(item.currentTarget).addClass("ui-selected");
                    $(item.currentTarget).attr("data-selected", true);

                    var selectedItem = $(item.currentTarget).attr("data-content");
                
                    // Update
                    this.model.set({"selectedMetric" : selectedItem});
                }
            }
        },

        render: function() {

            var chosenMetrics   = this.model.get("chosenMetrics");
            var selectedMetric  = this.model.get("selectedMetric");
            var jsonData        = {"chosenMetrics" : []};
            
            // iterate through all domains dimensions
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);
            var domainMetrics = domain.metrics;

            for (var dMetrics = 0; dMetrics < domainMetrics.length; dMetrics++) {
                for (var cMetrics = 0; cMetrics < chosenMetrics.length; cMetrics++) {
                    if (domainMetrics[dMetrics].id.metricId === chosenMetrics[cMetrics]) {
                        // add to the list
                        var option = {
                            "name" : domainMetrics[dMetrics].name,
                            "value" : chosenMetrics[cMetrics],
                            "selectMetric" : this.selectMetric,
                        };
                        jsonData.chosenMetrics.push(option);
                    }   
                }
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            return this;
        }
    });

    return View;
}));
