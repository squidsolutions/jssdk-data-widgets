(function (root, factory) {
    root.squid_api.view.MetricSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        metrics : null,
        metricCollection: [],

        initialize: function(options) {

            var me, domains;

            me = this;

            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            // Check for existing metrics
            if (this.model.get('metrics')) {

                var metricsBaseObject = this.model.get('metrics');
                var metricsNames = [];

                $.each(metricsBaseObject, function() {
                    metricsNames.push(this.metricId);
                });

                me.metrics = metricsNames;
            }

            squid_api.model.project.on('change', function(model) {
                var domainId, domain;
                
                me.metrics = [];

                /* See if we can obtain the domain's.
                If not check for a multi analysis array */

                domains = me.model.get("domains");

                if (!domains) {
                    domains = me.model.get("analyses")[0].get("domains");
                }

                domain = squid_api.utils.find(model.get("domains"), "oid", domains[0].domainId);

                $.each(domain.metrics, function(index, value) {

                    if ($.inArray(value.oid, me.metrics) !== -1) {
                        value.selected = true;
                    }

                    me.metricCollection.push(value);

                });

                me.render();

            });

            // this.render(me);
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            "change": function(event) {
                // Collect list of desired metrics and trigger a model change
                var metrics = this.$el.find("select option:selected");
                var selected = [];
                $(metrics).each(function(index, metric){
                    selected.push($(this).val());
                });

                this.model.setMetricIds(selected);

            }
        },

        render: function() {
            var me = this;

            // Display template
            var html = this.template({ metricCollection: me.metricCollection });
            this.$el.html(html);

            // Initialize plugin
            this.$el.find("select").multiselect();

            return this;
        }

    });

    return View;

}));
