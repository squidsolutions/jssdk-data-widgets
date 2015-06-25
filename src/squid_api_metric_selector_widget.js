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
            var projectOid = this.model.get("project");
            var domainOid = this.model.get("domain");
            
            if (projectOid && domainOid) {
                var me = this, isMultiple = true;
    
                if (this.metricIndex !== null) {
                    isMultiple = false;
                }
    
                var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};
                
                // iterate through all domains metrics
                this.getMetrics(projectOid, domainOid).then(function(metrics) {
                    if (metrics.length > 0) {
                        var noneSelected = true;
                        for (var idx=0; idx<metrics.length; idx++) {
                            var metric = metrics[idx];
                            // check if selected
                            var selected = me.isChosen(metric);
                            if (selected === true) {
                                noneSelected = false;
                            }
                            
                            // add to the list
                            var option = {"label" : metric.name, "value" : metric.oid, "selected" : selected};
                            jsonData.options.push(option);
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
    
                    var html = me.template(jsonData);
                    me.$el.html(html);
                    me.$el.show();
        
                    // Initialize plugin
                    var selector = me.$el.find("select");
                    if (isMultiple) {
                        selector.multiselect({
                            buttonText: function(options, select) {
                                return 'Metrics';
                            },
                        });
                    }
        
                    // Remove Button Title Tag
                    me.$el.find("button").removeAttr('title');
                });
            }

            return this;
        },
        
        getMetrics : function(projectOid, domainOid) {
            var metrics = new squid_api.model.MetricCollection();
            metrics.parentId = {
                projectId : projectOid,
                domainId : domainOid
            };
            return metrics.fetch();
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
