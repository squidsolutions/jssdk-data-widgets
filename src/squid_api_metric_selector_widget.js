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

            // To populate metrics
            squid_api.model.project.on("change:domains", function() {
                me.render();
            });
            
            this.model.on("change:domain", function() {
                me.render();
            });

            // listen for global status change
            squid_api.model.status.on("change:status", this.enable, this);
        },

        enable: function() {
            var select = this.$el.find("select");
            var multiSelectDropdown = this.$el.find(".multiselect-container");
            if (select) {
                var isMultiple = true;
                if (this.metricIndex !== null) {
                    isMultiple = false;
                }
                var running = (squid_api.model.status.get("status") != squid_api.model.status.STATUS_DONE);
                if (running) {
                    // computation is running : disable input
                    select.attr("disabled","disabled");
                    if (isMultiple) {
                        select.multiselect('disable');
                        multiSelectDropdown.append("<div class='dropdownDisabled'></div>");
                    }
                } else {
                    // computation is done : enable input
                    select.removeAttr("disabled");
                    if (isMultiple) {
                        select.multiselect('enable');
                        multiSelectDropdown.find(".dropdownDisabled").remove();
                    }
                }
            }
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

                // Remove Button Title Tag
                this.$el.find("button").removeAttr('title');

                // Update
                this.model.set({"chosenMetrics" : selected});
            }
        },

        render: function() {
            var isMultiple = true;

            if (this.metricIndex !== null) {
                isMultiple = false;
            }

            var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};
            
            // iterate through all domains metrics
            var metrics = this.getDomainMetrics();
            if (metrics) {
                for (var idx=0; idx<metrics.length; idx++) {
                    var metric = metrics[idx];
                    // check if selected
                    var selected = this.isChosen(metric);
                    
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
                selector.multiselect({
                    buttonText: function(options, select) {
                        return 'Metrics';
                    },
                });
            }

            // Remove Button Title Tag
            this.$el.find("button").removeAttr('title');

            return this;
        },
        
        getDomainMetrics : function() {
            var metrics;
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", this.model.get("domain"));
            if (domain) {
                metrics = domain.metrics;
            }
            return metrics;
        },
        
        isChosen : function(item) {
            var selected = false;
            var metrics = this.model.get("chosenMetrics");

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
