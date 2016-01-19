(function (root, factory) {
    root.squid_api.view.MetricView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : template,

        selectMetric : false,
        noDataMessage: "No Metrics have been chosen",

        initialize: function(options) {
            var me = this;

            // setup options
            if (options) {
                if (options.template) {
                    this.template = options.template;
                }
                if (options.selectMetric) {
                    this.selectMetric = options.selectMetric;
                }
                if (options.noDataMessage) {
                    this.noDataMessage = options.noDataMessage;
                }
            }

            // setup the models
            if (!this.model) {
                this.model = squid_api.model.config;
            }

            this.model.on("change:domain", function() {
                me.render();
            });

            this.model.on("change:chosenMetrics", function() {
                me.render();
            });
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

        renderMetrics: function(metrics) {
            var me = this;
            var jsonData = {"chosenMetrics" : [], "noChosenMetrics" : true, "noDataMessage" : this.noDataMessage};
            for (var i = 0; i < metrics.length; i++) {
                // add to the list
                var option = {
                        "name" : metrics[i].get("name"),
                        "value" : metrics[i].get("oid"),
                        "selectMetric" : this.selectMetric,
                };
                jsonData.chosenMetrics.push(option);
            }
            if (jsonData.chosenMetrics.length > 0) {
                jsonData.noChosenMetrics = false;
            }
            var html = me.template(jsonData);
            me.$el.html(html);
            me.$el.show();
        },

        render: function() {
            var me = this;
            var domainOid = this.model.get("domain");
            var chosenMetrics = this.model.get("chosenMetrics");
            
            
            if (domainOid && (chosenMetrics)) {
                // prepare all promises
                var metricPromises = [];
                for (var cMetrics = 0; cMetrics < chosenMetrics.length; cMetrics++) {
                    var metric = new squid_api.model.MetricModel();
                    metric.set("id", {
                        "projectId" : this.model.get("project"),
                        "domainId" : domainOid,
                        "metricId" : chosenMetrics[cMetrics]
                    });
                    metricPromises.push(metric.fetch());
                }
                // render when all metrics have been fetched
                squid_api.getSelectedDomain().then(function(domain) {
                    domain.get("metrics").load().done( function(metrics) {
                        var metricModels = [];
                        for (var i=0; i<chosenMetrics.length; i++) {
                            var metric = metrics.findWhere({"oid" : chosenMetrics[i]});
                            if (metric) {
                                metricModels.push(metric);
                            }
                        }
                        me.renderMetrics(metricModels);
                    });
                });
            } else {
                me.renderMetrics([]);
            }

            return this;
        }
    });

    return View;
}));
