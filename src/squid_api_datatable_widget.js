(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        maxRowsPerPage : 10000,

        format : null,
        
        d3Formatter : null,
        
        config : null,

        selectMetricHeader : false,

        paging : false,

        ordering : false,

        noDataMessage : "No data available in table",

        headerBadges : false,
        
        paginationView : null,
        
        rollupSummaryColumn : null,

        initialize : function(options) {
            var me = this;
            
            // config is used for orderBy
            this.config = options.config;

            if (this.model) {
                this.listenTo(this.model, 'change:status', this.render);
                this.listenTo(this.model, 'change:facets', this.render);
                this.listenTo(this.model, 'change:metricList', this.render);
                this.listenTo(this.model, 'change:orderBy', this.render);
            }

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_datatable_widget;
            }
            
            // filters are used to get the Dimensions and Metrics names
            if (options.filters) {
                this.filters = options.filters;
            } else {
                this.filters = squid_api.model.filters;
            }
            
            if (options.maxRowsPerPage) {
                this.maxRowsPerPage = options.maxRowsPerPage;
            }
            
            if (options.selectMetricHeader) {
                this.selectMetricHeader = options.selectMetricHeader;
            }
            if (options.paging) {
                this.paging = options.paging;
            }
            if (options.ordering) {
                this.ordering = options.ordering;
            }
            if (options.noDataMessage) {
                this.noDataMessage = options.noDataMessage;
            }
            if (options.headerBadges) {
                this.headerBadges = options.headerBadges;
            }
            this.rollupSummaryColumn = options.rollupSummaryColumn;

            if (d3) {
                this.d3Formatter = d3.format(",.f");
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (this.d3Formatter) {
                    this.format = function(f){
                        if (isNaN(f)) {
                            return f;
                        } else {
                            return me.d3Formatter(f);
                        }
                    };
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }

            this.renderBaseViewPort();
        },

        events : ({
            "click thead th.NUMBER" : function(item) {
                if (this.selectMetricHeader) {
                    var selectedMetric = $(item.target).attr("data-content");
                    this.config.set("selectedMetric", selectedMetric);
                } else {
                    this.$el.off("click", "thead th.NUMBER");
                }
            }
        }),

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },
        
        /**
         * see : http://stackoverflow.com/questions/10966440/recreating-a-removed-view-in-backbone-js
         */
        remove: function() {
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();
            return this;
        },

        displayTableHeader : function(selector) {
            var me = this;
            var columns;
            
            var analysis = this.model;
            // in case of a multi-analysis model
            if (analysis.get("analyses")) {
              analysis = analysis.get("analyses")[0];
            }
            var results = analysis.get("results");
            var rollups;
            if (results) {         
                // use results columns
                columns = results.cols;
             
                // init rollups
                rollups = analysis.get("rollups");
            } else {
                // use analysis columns
                columns = [];
                var i;
                var obj;
                var facets = this.model.get("facets");
                if (facets) {
                    for (i=0; i<facets.length; i++) {
                        obj = squid_api.utils.find(this.filters.get("selection").facets, "id", facets[i].value);
                        obj.dataType = "STRING";
                        columns.push(obj);
                    }
                }
                var metrics = this.model.get("metricList");
                if (metrics) {
                    var metric;
                    for (i=0; i<metrics.length; i++) {
                        metric = metrics[i];
                        if (metrics[i].id) {
                            obj = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", metrics[i].id.metricId, "Metric");
                            obj.dataType = "NUMBER";
                        } else {
                            obj = {
                                    "id" : null,
                                    "name" : metrics[i].name,
                                    "dataType" : "NUMBER"
                            };
                        }
                        columns.push(obj);
                    }
                }
            }
            
            var rollupColIndex = null;
            var rollupSummaryIndex = null;
            if (rollups) {
                if ((rollups.length>0)) {
                    rollupColIndex = rollups[0].col + 1;
                }
                if (this.rollupSummaryColumn >= 0) {
                    rollupSummaryIndex = this.rollupSummaryColumn + 1;
                }
            }

            // header
            d3.select(selector).select("thead tr").selectAll("th").remove();
            var th = d3.select(selector).select("thead tr").selectAll("th")
                .data(columns)
                .enter().append("th")
                .attr("class", function(d, i) {
                    if (rollups) {  
                        if (i === 0) {
                            // hide grouping column
                            return "hide " + d.dataType;
                        } else if (( rollupSummaryIndex !== null) && (i === rollupColIndex)) {
                            // hide rollup column
                            return "hide " + d.dataType;
                        } else {
                            return d.dataType;
                        }
                    }
                })
                .text(function(d, i) {
                    return d.name;
                })
                .attr("data-content", function(d) {
                    if (d.oid) {
                        return d.oid;
                    } else {
                        return d.id;
                    }
                });
        },
        
        displayTableContent : function(selector) {
            var me = this;
            
            var analysis = this.model;
            // in case of a multi-analysis model
            if (analysis.get("analyses")) {
              analysis = analysis.get("analyses")[0];
            }
            var results = analysis.get("results");
            var rollups;
                
            if (results) {
                rollups = analysis.get("rollups");
                var rollupColIndex = null;
                var rollupSummaryIndex = null;
                if (rollups) {
                    if ((rollups.length>0)) {
                        rollupColIndex = rollups[0].col + 1;
                    }
                    if (this.rollupSummaryColumn >= 0) {
                        rollupSummaryIndex = this.rollupSummaryColumn + 1;
                    }
                }
                // apply paging and number formatting
                var data = {};
                data.results = {"cols" : results.cols, "rows" : []};
                rows = results.rows;
                for (rowIdx = 0; (rowIdx<rows.length && rowIdx<this.maxRowsPerPage); rowIdx++) {
                    row = rows[rowIdx];
                    newRow = {v:[]};
                    for (colIdx = 0; colIdx<results.cols.length; colIdx++) {
                        v = row.v[colIdx];
                        if (results.cols[colIdx].dataType == "NUMBER") {
                            v = this.format(v);
                        }
                        newRow.v.push(v);
                    }
                    data.results.rows.push(newRow);
                }
                
                // Rows
                d3.select(selector).select("tbody").selectAll("tr").remove();
                var tr = d3.select(selector).select("tbody").selectAll("tr")
                    .data(data.results.rows)
                    .enter()
                    .append("tr");

                // Cells
                var td = tr.selectAll("td")
                    .data(function(d) {
                        return d.v;
                    })
                    .enter()
                    .append("td")
                    .attr("class", function(d, i) {
                        if (rollups) {
                            if (i === 0) {
                                // hide grouping column
                                return "hide";
                            } else if ((rollupSummaryIndex !== null) && (i === rollupColIndex)) {
                                // hide rollup column
                                return "hide";
                            } else if ((rollupSummaryIndex !== null) && (i === rollupSummaryIndex)) {
                                if (parseInt(this.parentNode.__data__.v[0]) === 1) {
                                    // this is a total (grouped) line
                                    this.parentNode.className = "group";
                                    return "new-category";
                                }
                            } else if ((i === 1 && parseInt(this.parentNode.__data__.v[0]) === 1)) {
                                // this is a total line
                                this.parentNode.className = "group";
                                return "new-category";
                            }
                            // Detect Group & Empty Value
                            if (this.parentNode.className === "group" && d.length === 0) {
                                me.categoryColSpan(this);
                            }
                        }
                    })
                    .text(function(d, i) {
                        var text = d;
                        if (rollups) {
                            if ((rollupSummaryIndex !== null) && (i === rollupSummaryIndex)) {
                                if (parseInt(this.parentNode.__data__.v[0]) === 1) {
                                    // this is a total (grouped) line
                                    text = this.parentNode.__data__.v[rollupColIndex];
                                }
                            } else if (i === 1){
                                if (parseInt(this.parentNode.__data__.v[0]) === 1) {
                                    // this is a total line
                                    text = "Total for "+data.results.cols[rollupColIndex].name;
                                }
                            }
                        }
                        return text;
                    });
                
                // display total
                this.$el.find("#count-entries").html(""+ results.startIndex + " - " + (results.startIndex + data.results.rows.length));
                this.$el.find("#total-entries").html(""+results.totalSize);
            }
        },

        categoryColSpan : function(node) {
            var siblings = node.parentNode.childNodes;
            var colSpan = 1;

            for (i=0; i<siblings.length; i++) {
                // Obtain Sibling With Matching Class
                if (d3.select(siblings[i]).classed("new-category")) {
                    if (d3.select(siblings[i]).attr("colspan")) {
                        colSpan = parseInt(d3.select(siblings[i]).attr("colspan"));
                    }
                    // Increment ColSpan Value 
                    d3.select(siblings[i]).attr("colspan", colSpan + 1);
                }
            }

            // Remove Node
            node.remove();
        },
        
        renderBaseViewPort : function() {
            this.$el.html(this.template());
            if (this.paging) {
                this.paginationView = new squid_api.view.PaginationView( {
                    model : this.model,
                    config : this.config,
                    el : this.$el.find("#pagination")
                });
                this.paginationView.render();
            }
        },

        render : function() {
            var me = this;
            var selector = "#"+this.el.id+" .sq-table";
            if (this.model.get("facets") && this.filters.get("selection")) {
                // display table header
                this.displayTableHeader(selector);
            }
            
            if (this.model.get("status") === "DONE") {
                // display results
                this.displayTableContent(selector);
                this.paginationView.render();
                this.$el.find("#pagination").show();
                this.$el.find("#total").show();
                this.$el.find(".sq-loading").hide();
                this.$el.find("#stale").hide();
            }
    
            if (this.model.get("status") === "RUNNING") {
                // computing in progress
                this.$el.find(".sq-loading").show();
                this.$el.find("#stale").hide();
            }
            
            if (this.model.get("status") === "PENDING") {
                // refresh needed
                d3.select(selector).select("tbody").selectAll("tr").remove();
                this.$el.find("#pagination").hide();
                this.$el.find("#total").hide();
                this.$el.find(".sq-loading").hide();
                this.$el.find("#stale").show();
            }

            return this;
        }
        
    });

    return View;
}));
