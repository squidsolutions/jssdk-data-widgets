(function (root, factory) {
    root.squid_api.view.MetricSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        metricIdList : null,
        metricIndex: null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            if (options.metricIdList) {
                this.metricIdList = options.metricIdList;
            }

            if (options.metricIndex !== null) {
                this.metricIndex = options.metricIndex;
            }

            api.model.status.on("change:domain", function() {
                me.render();
            });
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            "change": function(event) {
                var oid = this.$el.find("select option:selected");
                var selected = [];

                for (i = 0; i < oid.length; i++) {
                    selected.push($(oid[i]).val());
                }

                // Update
                this.model.set({"chosenMetrics" : selected});
            }
        },

        render: function() {
            var isMultiple = true;

            if (this.metricIndex !== null) {
                isMultiple = false;
            }

            var jsonData = {"selAvailable" : true, "options" : [{"label" : "", "value" : "", "selected" : false}], "multiple" : isMultiple};
            
            // iterate through all domains metrics
            var metrics = this.getDomainMetrics();
            if (metrics) {
                for (var idx=0; idx<metrics.length; idx++) {
                    var metric = metrics[idx];
                    // check if selected
                    var selected = this.isSelected(metric);
                    
                    // add to the list
                    var option = {"label" : metric.name, "value" : metric.oid, "selected" : selected};
                    jsonData.options.push(option);
                }
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            // Initialize plugin
            var selector = this.$el.find("select");
            if (isMultiple) {
                selector.multiselect();
            }

            return this;
        },
        
        getDomainMetrics : function() {
            var metrics;
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);
            if (domain) {
                metrics = domain.metrics;
            }
            return metrics;
        },
        
        isSelected : function(item) {
            var selected = false;

            /* See if we can obtain the metrics.
            If not check for a multi analysis array */

            var metrics = this.model.get("selectedMetrics");

            if (metrics) {
                for (var j=0; j<metrics.length; j++) {
                    if (item.oid == metrics[j]) {
                        selected = true;
                    }
                }
            }
            return selected;
        }

    });

    return View;
}));
