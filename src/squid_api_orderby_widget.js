(function (root, factory) {
    root.squid_api.view.OrderByView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        format : null,
        removeOrderDirection: false,
        orderByDirectionDisplay: null,
        metricList: null,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change', this.render, this);
            }

            if (options.removeOrderDirection) {
                this.removeOrderDirection = options.removeOrderDirection;
            }
            if (options.orderByDirectionDisplay) {
                this.orderByDirectionDisplay = options.orderByDirectionDisplay;
            }
            if (options.metricList) {
                this.metricList = options.metricList;
            }

            // To populate metrics
            squid_api.model.project.on("change:domains", this.render, this);

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_orderby_widget;
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (d3) {
                    this.format = d3.format(",.1f");
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            "change": function(event) {
                if (event.target.checked !== undefined || event.target.type === "checkbox") {
                    var orderByDirection;
                    if (event.target.checked) {
                        orderByDirection = "DESC";
                    } else {
                        orderByDirection = "ASC";
                    }
                    var orderByList = this.model.get("orderBy");
                    var orderBy;
                    if (orderByList) {
                        orderBy = orderByList[0];
                        this.model.set("orderBy", [{"col" : orderBy.col, "direction" : orderByDirection}]);
                    }
                }
            }
        },

        render : function() {
            var direction = "";
            var me = this;

            var orderByList = this.model.get("orderBy");
            if (orderByList) {
                var orderBy = this.model.get("orderBy")[0];
                if (orderBy.direction === "DESC") {
                    direction = "checked";
                }
            }

            var limit = this.model.get("limit");

            squid_api.utils.getDomainMetrics().then(function(metrics) {
                metrics = metrics.models;
                var chosenMetrics = squid_api.model.config.get("chosenMetrics");
                var metricList = [];

                if (me.metricList) {
                    var appMetrics = me.metricList;
                    for (var idx=0; idx<metrics.length; idx++) {
                        for (ix=0; ix<appMetrics.length; ix++) {
                            var metric1 = metrics[idx];
                            if (appMetrics[ix] === metric1.oid) {
                                var option1 = {"label" : metric1.name, "value" : metric1.oid};
                                metricList.push(option1);
                            }
                        }
                    }
                } else if (metrics && chosenMetrics) {
                    for (var id=0; id<metrics.length; id++) {
                        var metric = metrics[id];
                        // Match with chosen
                        for (var match=0; match<chosenMetrics.length; match++) {
                            if (metric.get("oid") === chosenMetrics[match]) {
                                var option = {"label" : metric.get("name"), "value" : metric.get("oid")};
                                metricList.push(option);
                            }
                        }
                    }
                }

                var jsonData = {"direction" : direction, "limit" : limit, "chosenMetrics" : metricList, "orderByDirectionDisplay" : me.orderByDirectionDisplay, "removeOrderDirection" : me.removeOrderDirection};

                var html = me.template(jsonData);
                me.$el.html(html);

                me.$el.find("select").multiselect({
                    onChange: function(option, selected, index) {
                        var metric = option.attr("value");
                        me.model.set({"selectedMetric": metric});
                    }
                });

                if (me.model.get("selectedMetric")) {
                    me.$el.find("select").multiselect('select', me.model.get("selectedMetric"));
                }

                me.$el.find("select").multiselect("refresh");

                // Set Limit Value
                me.$el.find(".sq-select").val(jsonData.limit);
            });

            return this;
        }
    });

    return View;
}));
