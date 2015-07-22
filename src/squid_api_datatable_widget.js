(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        maxRowsPerPage : 10000,

        format : null,

        d3Formatter : null,

        config : null,

        paging : false,

        ordering : false,

        noDataMessage : "No data available in table",

        headerBadges : false,

        paginationView : null,

        rollupSummaryColumn : null,

        rollups : null,

        initialize : function(options) {
            var me = this;

            // config is used for orderBy
            if (options.config) {
                this.config = options.config;
            } else {
                this.config = squid_api.model.config;
            }

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
            if (options.rollupSummaryColumn) {
                this.rollupSummaryColumn = options.rollupSummaryColumn;
            }
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
            "click thead th" : function(item) {
                if (this.ordering) {
                    var orderId = parseInt($(item.currentTarget).attr("data-id"));
                    var orderByDirection;
                    if (config.get("rollups") && this.rollupSummaryColumn >= 0) {
                        orderId = orderId - 1;
                    }
                    if ($(item.currentTarget).hasClass("ASC")) {
                        orderByDirection = "DESC";
                    } else {
                        orderByDirection = "ASC";
                    }
                    this.config.set("orderBy", [{"col" : orderId, "direction" : orderByDirection}]);
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
            var invalidSelection = false;

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
                if (rollups && (rollups.length ===0)) {
                    rollups = this.rollups = null;
                }
            } else {
                // use analysis columns
                columns = [];
                var i;
                var obj;
                var facets = this.model.get("facets");
                if (facets) {
                    for (i=0; i<facets.length; i++) {
                        obj = squid_api.utils.find(this.filters.get("selection").facets, "id", facets[i].value);
                        if (obj) {
                            obj.dataType = "STRING";
                            columns.push(obj);
                        } else {
                            // impossible to get column data from selection
                            invalidSelection = true;
                        }

                    }
                }
                var metrics = this.model.get("metricList");
                if (metrics) {
                    var metric;
                    for (i=0; i<metrics.length; i++) {
                        metric = metrics[i];
                        if (metrics[i].id) {
                            obj = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", metrics[i].id.metricId, "Metric");
                            if (obj) {
                                obj.dataType = "NUMBER";
                            } else {
                                // impossible to get column data from selection
                                invalidSelection = true;
                            }
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


            // Add OrderBy Attribute
            var status = this.model.get("status");
            if (config.get("rollups") && this.rollupSummaryColumn >= 0 && status !== "DONE") {
                columns.splice(config.get("rollups")[0].col, 1);
            }
            var orderBy = this.model.get("orderBy");
            if (orderBy) {
                for (col=0; col<columns.length; col++) {
                    columns[col].orderDirection = null;
                }
                // add orderBy direction
                for (ix=0; ix<orderBy.length; ix++) {
                    for (col=0; col<columns.length; col++) {
                        if (this.ordering && config.get("rollups") && this.rollupSummaryColumn >= 0 && col == orderBy[ix].col) {
                            if (status !== "DONE") {
                                columns[col - 1].orderDirection = orderBy[ix].direction;
                            } else {
                                columns[col + 1].orderDirection = orderBy[ix].direction;
                            }
                            break;
                        }
                        else if (this.ordering && col == orderBy[ix].col) {
                            columns[col].orderDirection = orderBy[ix].direction;
                            break;
                        }
                    }
                }
            }

            var rollupColIndex = null;
            var rollupSummaryIndex = null;
            if (rollups) {
                if ((rollups.length>0)) {
                    rollupColIndex = rollups[0].col + 1;
                }
                if (config.get("rollups") && this.rollupSummaryColumn >= 0) {
                    rollupSummaryIndex = this.rollupSummaryColumn + 1;
                }
            }
            me = this;
            // header
            d3.select(selector).select("thead tr").selectAll("th").remove();

            if (!invalidSelection) {
                var th = d3.select(selector).select("thead tr").selectAll("th")
                    .data(columns)
                    .enter().append("th")
                    .attr("class", function(d, i) {
                        var str = "";
                        if (rollups) {
                            if (i === 0) {
                                // hide grouping column
                                str = str + "hide " + d.dataType;
                            } else if (( rollupSummaryIndex !== null) && (i === rollupColIndex)) {
                                // hide rollup column
                                str = str + "hide " + d.dataType;
                            } else {
                                str = str + d.dataType;
                            }
                        }
                        if (d.orderDirection) {
                            str = str + " " + d.orderDirection;
                        }
                        return str;
                    })
                    .html(function(d, i) {
                        var str = d.name;
                        if (d.orderDirection === "ASC") {
                            str = str + " " + "<span class='sort-direction'>&#xffea;</span>";
                        } else if (d.orderDirection === "DESC") {
                            str = str + " " + "<span class='sort-direction'>&#xffec;</span>";
                        }
                        return str;
                    })
                    .attr("data-content", function(d) {
                        if (d.oid) {
                            return d.oid;
                        } else {
                            return d.id;
                        }
                    })
                    .attr("data-id", function(d, i) {
                        return i;
                    });

                // add class if more than 10 columns
                if (this.$el.find("thead th").length > 10) {
                    this.$el.find("table").addClass("many-columns");
                } else {
                    this.$el.find("table").removeClass("many-columns");
                }
            }

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
                if (rollups && (rollups.length ===0)) {
                    rollups = this.rollups = null;
                }

                var rollupColIndex = null;
                var rollupSummaryIndex = null;
                if (rollups) {
                    if ((rollups.length>0)) {
                        rollupColIndex = rollups[0].col + 1;
                    }
                    if (config.get("rollups") && this.rollupSummaryColumn >= 0) {
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
                if (this.paging) {
                    this.paginationView.render();
                    this.$el.find("#pagination").show();
                }
                this.$el.find("#total").show();
                this.$el.find(".sq-loading").hide();
                this.$el.find("#stale").hide();
                this.$el.find(".sort-direction").show();
            }

            if (this.model.get("status") === "RUNNING") {
                // computing in progress
                this.$el.find(".sq-loading").show();
                this.$el.find("#stale").hide();
                this.$el.find(".sort-direction").show();
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
