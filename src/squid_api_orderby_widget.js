(function (root, factory) {
    root.squid_api.view.OrderByView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        format : null,
        removeOrderDirection: false,
        orderByDirectionDisplay: null,
        metricList: null,
        filters: null,

        initialize : function(options) {
            var me = this;
        
            if (options.config) {
            	this.config = options.config;
            } else {
            	this.config = squid_api.model.config;
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
            if (options.filters) {
            	this.filters = options.filters;
            } else {
            	this.filters = squid_api.model.filters;
            }
            if (options.status) {
            	this.status = options.status;
            } else {
            	this.status = squid_api.model.status;
            }
            
            this.config.on('change:chosenDimensions', this.render, this);
            this.config.on('change:chosenMetrics', this.render, this);
            this.config.on('change:orderBy', this.render, this);
            
            // listen for selection change as we use it to get dimensions
            this.filters.on("change:selection", function() {
                me.render();
            });
            
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
        
        events: {
        	"click .onoffswitch": function() {
                if (! this.disabled) {
                    var orderBy = this.config.get("orderBy");
                    var obj = {};
                    if (orderBy) {
                        if (orderBy[0]) {
                            if (orderBy[0].expression) {
                                obj.expression = {"value" : orderBy[0].expression.value};
                            }
                            if (orderBy[0].direction) {
                                if (orderBy[0].direction === "DESC") {
                                    obj.direction = "ASC";
                                } else {
                                    obj.direction = "DESC";
                                }
                            }
                        }
                        this.config.set({"orderBy" : [obj]});
                    }
                }
        		return false;
        	}
        },

        render : function(model, attribute, event) {
            var me = this;

            var filters = this.filters.get("selection");
            var chosenDimensions = this.config.get("chosenDimensions");
            var chosenMetrics = this.config.get("chosenMetrics");
            var orderBy = this.config.get("orderBy");
            var limit = this.config.get("limit");
            var autoSet = true;

            if (event) {
                if (event.unset) {
                    autoSet = false;
                }
            }

            var columns = [];
            if (filters) {
                // obtain chosenDimension metadata
                if (chosenDimensions) {
                    count = chosenDimensions.length;
                    for (var ix0=0; ix0<chosenDimensions.length; ix0++) {
                        if (filters) {
                            for (ix1=0; ix1<filters.facets.length; ix1++) {
                                if (chosenDimensions[ix0] === filters.facets[ix1].id) {
                                    columns.push({"label" : filters.facets[ix1].dimension.name, "value" : filters.facets[ix1].id});
                                }
                            }
                        }
                    }
                }

            // get selected domain in order to retieve domain metrics
            squid_api.getSelectedDomain().always(function(domain) {
                if (domain) {
                    var metrics = domain.get("metrics");

                    // auto set orderBy if one isn't set
                    if (! orderBy) {
                        if (chosenDimensions) {
                            if (chosenDimensions.length !== 0 && autoSet) {
                                for (var i=0; i<chosenDimensions.length; i++) {
                                    me.config.set("orderBy", [{"expression" : {"value" : chosenDimensions[i]}, "direction":"DESC"}]);
                                    break;
                                }
                            }
                        }
                        if (chosenMetrics) {
                            if (chosenMetrics.length !== 0 && ! orderBy) {
                                for (var ix=0; ix<chosenMetrics.length; ix++) {
                                    var metric = metrics.findWhere({oid: chosenMetrics[ix]});
                                    if (metric && autoSet) {
                                        var definition = metric.get("definition");
                                        me.config.set("orderBy", [{"expression" : {"value" : definition}, "direction":"DESC"}]);
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        var foundExpression = false;
                        var expressionValue = orderBy[0].expression.value;
                        if (chosenDimensions) {
                            if (chosenDimensions.length !== 0) {
                                for (var i1=0; i1<chosenDimensions.length; i1++) {
                                    if (chosenDimensions[i1] == expressionValue) {
                                        foundExpression = true;
                                    }
                                }
                            }
                        }
                        if (chosenMetrics) {
                            if (chosenMetrics.length !== 0) {
                                for (var i2=0; i2<chosenMetrics.length; i2++) {
                                    var metric = metrics.findWhere({oid: chosenMetrics[i2]});
                                    if (metric) {
                                        var definition = metric.get("definition");
                                        if (definition === expressionValue) {
                                            foundExpression = true;
                                        }
                                    }
                                }
                            }
                        }
                        if (! foundExpression && orderBy.length < 2) {
                            // TODO: refactor into supporting multi orderBy
                            me.config.unset("orderBy");
                        }
                    }

                    // obtain chosenMetrics metadata
                    if (metrics && chosenMetrics) {
                        count = count + chosenMetrics.length;
                        for (var id=0; id<metrics.length; id++) {
                            var metric = metrics.at(id);
                            // Match with chosen
                            for (var match=0; match<chosenMetrics.length; match++) {
                                if (metric.get("oid") === chosenMetrics[match]) {
                                    var option = {"label" : metric.get("name"), "value" : metric.get("definition")};
                                    columns.push(option);
                                }
                            }
                        }
                    }

                    // view data
                    var jsonData = {
                        "disabled" : false,
                        "limit" : limit,
                        "orderByDirectionDisplay" : me.orderByDirectionDisplay,
                        "removeOrderDirection" : me.removeOrderDirection
                    };

                    if (orderBy) {
                        if (orderBy.length > 0) {
                            for (var i=0; i<columns.length; i++) {
                                if (orderBy[0].expression) {
                                    if (columns[i].value === orderBy[0].expression.value) {
                                        columns[i].selected = true;
                                    }
                                }
                            }
                            if (orderBy[0].direction === "ASC") {
                                jsonData.checked = true;
                            }
                        }
                    }

                    // set columns
                    jsonData.Columns = columns;

                    // check if widget needs disabling
                    if (columns.length === 0) {
                        jsonData.disabled = true;
                        me.disabled = true;
                    } else {
                        me.disabled = false;
                    }

                    // print html
                    var html = me.template(jsonData);
                    me.$el.html(html);

                    // instantiate widget
                    me.$el.find("select").multiselect({
                        onChange: function(model) {
                            if (model.val() !== "none") {
                                var obj = {"expression": {"value" : model.val()}, "direction" : "DESC"};
                                me.config.set({"orderBy" : [obj]});
                            } else {
                                me.config.unset("orderBy");
                            }
                        }
                    });

                    // Set Limit Value
                    me.$el.find(".sq-select").val(jsonData.limit);
                }
            });

        }

        return this;
        }
    });

    return View;
}));
