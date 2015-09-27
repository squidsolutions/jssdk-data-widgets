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
            if (options) {
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
            }

            // setup the models
            if (!this.model) {
                this.model = squid_api.model.config;
            }

            // setup the model listeners
            this.listenTo(this.model,"change:domain", this.render);

            // listen for global status change
            this.listenTo(squid_api.model.status,"change:status", this.handleStatus);
        },

        handleStatus: function() {
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
                // Remove Button Title Tag
                this.$el.find("button").removeAttr('title');

                var chosenMetrics = this.model.get("chosenMetrics");
                var selectedMetrics = [];

                // build the selection array
                for (i = 0; i < oid.length; i++) {
                    var selectedOid = $(oid[i]).val();
                    selectedMetrics.push(selectedOid);
                }

                // check for additions
                var selectedMetricsNew = [];
                chosenMetricsNew = _.intersection(_.union(chosenMetrics, selectedMetrics), selectedMetrics);

                // Update
                this.model.set({"chosenMetrics" : chosenMetricsNew});
            }
        },

        render: function() {
            var projectOid = this.model.get("project");
            var domainOid = this.model.get("domain");

            if (projectOid && domainOid) {
                var me = this, isMultiple = true;

                if (this.metricIndex !== null) {
                    isMultiple = false;
                }

                var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};

                // iterate through all domains metrics
                squid_api.utils.getDomainMetrics().then(function(metrics) {
                    squid_api.utils.fetchModel("domain").then(function(domain) {
                        squid_api.utils.fetchModel("project").then(function(project) {
                            me.metrics = metrics;
                            if (metrics.models.length > 0) {
                                var noneSelected = true;
                                for (var idx=0; idx<metrics.models.length; idx++) {
                                    var metric = metrics.models[idx];

                                    if (metric.get("dynamic") === false || domain.get("dynamic") === true) {
                                        // check if selected
                                        var selected = me.isChosen(metrics.models[idx]);
                                        if (selected === true) {
                                            noneSelected = false;
                                        }

                                        // add to the list
                                        var option = {"label" : metric.get("name"), "value" : metric.get("oid"), "selected" : selected};
                                        jsonData.options.push(option);
                                    }
                                }

                                if (noneSelected === true) {
                                    me.model.set("chosenMetrics", []);
                                }

                                // Alphabetical Sorting
                                jsonData.options.sort(function(a, b) {
                                    var labelA=a.label.toLowerCase(), labelB=b.label.toLowerCase();
                                    if (labelA < labelB)
                                        return -1;
                                    if (labelA > labelB)
                                        return 1;
                                    return 0; // no sorting
                                });
                            }

                            // check if empty
                            if (jsonData.options.length === 0) {
                                jsonData.empty = true;
                            }

                            var html = me.template(jsonData);
                            me.$el.html(html);
                            me.$el.show();

                            // Initialize plugin
                            var selector = me.$el.find("select");
                            if (isMultiple) {
                                selector.multiselect({
                                    buttonContainer: '<div class="squid-api-data-widgets-metric-selector-open" />',
                                    buttonText: function(options, select) {
                                        return 'Metrics';
                                    },
                                    onDropdownShown: function(event) {
                                        if (project.get("_role") == "WRITE" || project.get("_role") == "OWNER") {
                                            me.$el.find("li.configure").remove();
                                            me.$el.find("li").first().before("<li class='configure'> configure</option>");
                                            me.$el.find("li").first().off().on("click", function() {
                                                var metricSelect = new squid_api.view.ColumnsManagementWidget({
                                                    buttonLabel : "<i class='fa fa-arrows-h'></i>",
                                                    type : "Metric",
                                                    collection : me.metrics,
                                                    model : new squid_api.model.MetricModel(),
                                                    autoOpen : true,
                                                    successHandler : function() {
                                                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                                                        squid_api.model.status.set({'message' : message});
                                                    }
                                                });
                                            })
                                        }
                                    }
                                });
                            }

                            // Remove Button Title Tag
                            me.$el.find("button").removeAttr('title');
                        });
                    });
                });
            }

            return this;
        },

        isChosen : function(item) {
            var selected = false;
            var metrics = this.model.get("chosenMetrics");

            if (metrics) {
                for (var j=0; j<metrics.length; j++) {
                    if (item.get("oid") == metrics[j]) {
                        selected = true;
                    }
                }
            }
            return selected;
        }

    });

    return View;
}));
