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
            this.filters.on("change:status", function() {
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
        		var orderBy = this.config.get("orderBy");
        		var obj = {};
        		if (orderBy) {
        			obj.expression = {"value" : orderBy[0].expression.value};
        			if (orderBy[0].direction === "DESC") {
        				obj.direction = "ASC";
        			} else {
        				obj.direction = "DESC";
        			}
        		}    		
        		this.config.set({"orderBy" : [obj]});
        		return false;
        	}
        },
        
        getColIndex : function(model, columns) {
        	var col = 0;
        	for (i=0; i<columns.length; i++) {
        		if (columns[i].value === model.val()) {
        			col = i;
        		}
        	}
        	return col;
        },
        
        expressionExists: function(columns) {
        	var orderBy = this.config.get("orderBy");
        	var count = 0;
    		for (i=0; i<columns.length; i++) {
    			if (orderBy[0].expression.value === columns[i].value) {
    				count++;
    			}
    		}
    		if (count > 0) {
    			this.$el.find("select").multiselect('select', orderBy[0].expression.value);
    		} else {
    			if (columns[0]) {
    				this.config.set({"orderBy" : [{expression:{value: columns[0].value}, direction:"DESC"}], "selectedMetric" : columns[0].value});
    			} else {
    				this.config.unset("orderBy");
    				this.config.unset("selectedMetric");
    			}
    		}
        },

        render : function() {
            var me = this;
            var filters = this.filters.get("selection");
            var chosenDimensions = this.config.get("chosenDimensions");
            var limit = this.config.get("limit");
            var columns = [];
            var orderBy;

            var orderByList = this.config.get("orderBy");
            var checked = true;
            if (orderByList) {
                orderBy = this.config.get("orderBy")[0];
                if (orderBy.direction === "ASC") {
                    checked = false;
                }
            }
            if (this.filters.get("status") === "DONE") {
                squid_api.getSelectedDomain().always(function(domain) {
                    if (domain) {
                        var metrics = domain.get("metrics");
                        var chosenMetrics = me.config.get("chosenMetrics");
                        orderBy = me.config.get("orderBy");
        
                        if (chosenDimensions) {
                            for (i=0; i<chosenDimensions.length; i++) {
                                if (filters) {
                                    for (ix=0; ix<filters.facets.length; ix++) {
                                        if (chosenDimensions[i] === filters.facets[ix].id) {
                                            columns.push({"label" : filters.facets[ix].dimension.name, "value" : filters.facets[ix].id});
                                        }
                                    }
                                }
                            }
                        }
        
                        if (metrics && chosenMetrics) {
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
                    
    
                        var jsonData = {"checked" : checked, "limit" : limit, "Columns" : columns, "orderByDirectionDisplay" : me.orderByDirectionDisplay, "removeOrderDirection" : me.removeOrderDirection};
        
                        var html = me.template(jsonData);
                        me.$el.html(html);
        
                        me.$el.find("select").multiselect({
                            onChange: function(model) {
                                var obj = {};
                                var orderBy = me.model.get("orderBy");
                                if (orderBy) {
                                    obj.expression = {"value" : model.val()};
                                    if (orderBy[0].direction) {
                                        obj.direction = orderBy[0].direction;
                                    } else {
                                        obj.direction = "DESC";
                                    }
                                }           		
                                me.config.set({"orderBy" : [obj], "selectedMetric" : model.val()});
                            }
                        });
        
                        if (orderBy) {
                            if (orderBy[0].expression) {
                                // verify if existing expression exists
                                me.expressionExists(columns);  		
                            }
                        } else if (me.$el.find("select").val()) {
                            var obj = {"expression" : {"value" : me.$el.find("select").val()}, "direction" : "DESC"};
                            me.config.set({"orderBy" : [obj], "selectedMetric" : me.$el.find("select").val()});
                        }
        
                        me.$el.find("select").multiselect("refresh");
        
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
