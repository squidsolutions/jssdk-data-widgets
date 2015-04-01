(function (root, factory) {
    root.squid_api.view.OrderByView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        format : null,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change', this.render, this);
            }
            
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
                    if (event.target.checked) {
                        this.model.set({"orderByDirection" : "DESC"});
                    } else {
                        this.model.set({"orderByDirection" : "ASC"});
                    }
                }
            }
        },

        getDomainMetrics : function() {
            var metrics;
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);
            if (domain) {
                metrics = domain.metrics;
            }
            return metrics;
        },

        render : function() {
            var checked;
            var me = this;

            if (this.model.get("orderByDirection") === "DESC") {
                checked = "checked";
            } else {
                checked = "";
            }
            var limit = null;
            if (this.model.get("tableAnalysis")) {
                limit = this.model.get("tableAnalysis").get("limit");
            } else {
                limit = this.model.get("limit");
            }

            var metrics = this.getDomainMetrics();
            var chosenMetrics = this.model.get("chosenMetrics");
            var metricList = [];
            if (metrics && chosenMetrics) {
                for (var id=0; id<metrics.length; id++) {
                    var metric = metrics[id];
                    // Match with chosen
                    for (var match=0; match<chosenMetrics.length; match++) {
                        if (metric.oid === chosenMetrics[match]) {
                            var option = {"label" : metric.name, "value" : metric.oid};
                            metricList.push(option);
                        }
                    }
                }
            } else {
                for (var idx=0; idx<metrics.length; idx++) {
                    var metric1 = metrics[idx];
                    var option1 = {"label" : metric1.name, "value" : metric1.oid};
                    metricList.push(option1);
                }
            }

            var jsonData = {"direction" : checked, "limit" : limit, "chosenMetrics" : metricList};

            var html = this.template(jsonData);
            this.$el.html(html);

            this.$el.find("select").multiselect({
                onChange: function(option, selected, index) {
                    var metric = option.attr("value");
                    me.model.set({"selectedMetric": metric});
                }
            });

            if (this.model.get("selectedMetric")) {
                this.$el.find("select").multiselect('select', this.model.get("selectedMetric"));
            }

            this.$el.find("select").multiselect("refresh");

            // Set Limit Value
            this.$el.find(".sq-select").val(jsonData.limit);  

            return this;
        }
    });

    return View;
}));
