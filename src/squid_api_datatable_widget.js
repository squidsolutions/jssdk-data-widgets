(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        maxRowsPerPage : 10000,

        format : null,
        
        d3Formatter : null,

        mainModel : null,
        
        config : null,

        selectMetricHeader : false,

        searching : false,

        paging : false,

        ordering : false,

        noDataMessage : "No data available in table",

        reactiveState : false,

        reactiveMessage : null,

        headerBadges : false,

        domain : null,

        pageLength : 10,

        reports : false,

        initialize : function(options) {
            var me = this;
            
            this.mainModel = options.mainModel;
            this.config = options.config;
            if (this.config) {
                this.listenTo(this.config, 'change', this.render);
            }

            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
            }

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_datatable_widget;
            }
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
            if (options.searching) {
                this.searching = options.searching;
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
            if (options.reactiveState) {
                this.reactiveState = options.reactiveState;
                this.reactiveStateEvents();
            }
            if (options.reactiveMessage) {
                this.reactiveMessage = options.reactiveMessage;
            }
            if (options.headerBadges) {
                this.headerBadges = options.headerBadges;
            }
            if (options.pageLength) {
                this.pageLength = options.pageLength;
            }
            if (options.reports) {
                this.reports = options.reports;
            }
            if (options.reportCategoryID) {
                this.reportCategoryID = options.reportCategoryID;
            }
            if (options.reportAccountID) {
                this.reportAccountID = options.reportAccountID;
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

            this.beforeRender();
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

        dataTableInsert : function(data) {

            var globalID;
            var me = this;

            if (this.$el.attr("id")) {
                globalID = "#" + this.$el.attr('id');
            } else {
                console.log("No ID assigned to DOM element for Data Table");
            }

            // Store Columns to Manipulate
            if (this.reports) {
                var dataCols = data.results.cols;
                var categoryId = 0;
                var accountId = 0;
                for (i=0; i<dataCols.length; i++) {
                    if (dataCols[i].id == this.reportCategoryID) {
                        categoryId = i;
                    }
                    if (dataCols[i].id == this.reportAccountID) {
                        accountId = i;
                    }
                }
            }

            d3.select(globalID + " tbody").selectAll("tr").remove();

            // header
            var th = d3.select(globalID + " thead tr").selectAll("th")
                .data(data.results.cols)
                .enter().append("th")
                .attr("class", function(d, i) {
                    if (me.reports) {
                        if (i === categoryId || i === accountId) {
                            return "hide " + d.dataType;
                        } else {
                            return d.dataType;
                        }
                    } else {
                        return d.dataType;
                    }
                })
                .text(function(d, i) {
                    return d.name;
                })
                .attr("data-content", function(d) {
                    return d.id;
                });

            // Rows
            var tr = d3.select(globalID + " tbody").selectAll("tr")
                .data(data.results.rows)
                .enter()
                .append("tr");

            // Cells
            var td = tr.selectAll("td")
                .data(function(d) {
                    return d.v;
                })
                .enter().append("td")
                .attr("class", function(d, i) {
                    if (me.reports) {
                        if (i === categoryId || i === accountId) {
                            return "hide";
                        }
                        if (i === accountId + 1 && parseInt(this.parentNode.__data__.v[categoryId]) === categoryId + 1) {
                            this.parentNode.className = "new-category";
                            return "new-category";
                        }
                    }
                })
                .text(function(d, i) {
                    if (me.reports) {
                        if (i === accountId + 1) {
                            if (parseInt(this.parentNode.__data__.v[categoryId]) === categoryId + 1) {
                                return this.parentNode.__data__.v[accountId];
                            } else {
                                return d;
                            }
                        } else {
                            return d;
                        }
                    } else {
                        return d;
                    }
                });
        },

        selectColumn : function() {
            var me = this;

            // Get Table Headers
            var tableHeaders = this.$el.find("table th");

            // Loop over each one and match the value
            for (i=0; i<tableHeaders.length; i++) { 
                if (this.config.get("selectedMetric") === $(tableHeaders[i]).attr("data-content")) {
                    $(tableHeaders[i]).addClass("filtered-by");
                    if (this.headerBadges) {
                        if (me.config.get("orderByDirection") === "DESC") {
                            $(tableHeaders[i]).append("<span class='badge'>Top</span>");
                        } else {
                            $(tableHeaders[i]).append("<span class='badge'>Last</span>");
                        }
                    }
                }
            }
        },

        reactiveStateEvents : function() {
            if (this.config) {
                this.config.on("change:chosenDimensions", this.render, this);
                this.config.on("change:chosenMetrics", this.render, this);
                this.config.on("change:selectedMetric", this.render, this);
                this.config.on("change:orderByDirection", this.render, this);
                api.model.filters.on('change', this.render, this);
            }
        },

        getNamesFromDomain : function(model, metrics) {
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", this.config.get("domain"), "Domain");
            if (domain) {
                if (metrics) {
                    var namesArray;
                    var obj;
                    if (model === "metric") {
                        var domainMetrics = domain.metrics;
                        namesArray = [];
                        for (var ix0=0; ix0<domainMetrics.length; ix0++) {
                            obj = {};
                            for (var ix1=0; ix1<metrics.length; ix1++) {
                                if (metrics[ix1] === domainMetrics[ix0].oid) {
                                    obj.id = metrics[ix1];
                                    obj.name = domainMetrics[ix0].name;
                                    namesArray.push(obj);
                                }
                            }
                        }
                        return namesArray;
                    }
                }
            }
        },

        printChosenItems : function() {
            var chosenDimensions = this.config.get("chosenDimensions");
            var chosenMetrics = this.config.get("chosenMetrics");
            // var dimensions = chosenDimensions;
            // Get Dimension Names
            var dimensions = [];

            var selection = this.filters.get("selection");
            if (selection && chosenDimensions) {
                var facets = selection.facets;
                if (facets) {
                    for (i=0; i<chosenDimensions.length; i++) {
                        for (ix=0; ix<facets.length; ix++) {
                            if (chosenDimensions[i] === facets[ix].id) {
                                var obj = {};
                                obj.id = facets[ix].id;
                                if (facets[ix].name) {
                                    obj.name = facets[ix].name;
                                } else {
                                    obj.name = facets[ix].dimension.name;
                                }
                                dimensions.push(obj);
                            }
                        }
                    }
                }
            }

            var metrics = this.getNamesFromDomain("metric", chosenMetrics);
            this.$el.find("thead tr").html();
            if (this.mainModel.get("analysisRefreshNeeded") && this.model.get("status") !== "RUNNING") {
                if (dimensions) {
                    for (i=0; i<dimensions.length; i++) {
                        this.$el.find("thead tr").append("<th data-content=" + dimensions[i].id + ">" + dimensions[i].name + "</th>");
                    }
                }
                if (metrics) {
                    for (i=0; i<metrics.length; i++) {
                        this.$el.find("thead tr").append("<th data-content=" + metrics[i].id + ">" + metrics[i].name + "</th>");
                    }
                }
                this.$el.find(".squid-api-data-widgets-data-table").addClass("setHeaders");
                if (this.model.get("status") == "RUNNING") {
                    this.$el.find("tbody").html("<div class='reactiveMessage'></div>");
                }
                if (chosenDimensions && chosenMetrics) {
                    if (chosenDimensions.length === 0 && chosenMetrics.length === 0) {
                        this.$el.find("thead tr").append("<th data-column='empty'>Empty Table</th>");
                    }
                }
            }
        },

        beforeRender: function() {
            this.$el.html(this.template({'noDataMessage' : this.noDataMessage}));
        },

        render : function() {
            var jsonData, data, rowIdx, colIdx, row, rows, v, analysis;
            if (!this.domain) {
                this.domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId, "Domain");
            }

            var me = this;

            var model = this.model.toJSON();
            var dataAvailable = true;

            if (!model.dimensions && !model.metrics && !model.facets) {
                dataAvailable = false;
            }
            if ((this.model.get("status") !== "RUNNING") && this.reactiveState) {
                if (this.mainModel.get("refreshButtonPressed")) {
                    this.$el.html(this.template({'dataAvailable' : dataAvailable, 'noDataMessage' : this.noDataMessage}));
                }
            }
            
            if (this.reactiveState) {
                this.$el.find(".reactiveMessage").hide();
                this.$el.find(".reactiveMessage").show();
                this.printChosenItems();
                if (this.mainModel.get("analysisRefreshNeeded")) {
                    this.$el.find(".squid-api-data-widgets-data-table").addClass("setHeaders");
                    this.$el.find("tbody").html("<div class='reactiveMessage'><span>" + this.reactiveMessage + "</span></div>");
                }
            } else {
                this.display();
            }
               
            if (!this.model.isDone()) {
                this.$el.find(".squid-api-data-widgets-data-table").removeClass("notdone");
                // running
                if (this.model.get("status") == "RUNNING") {
                    $(".sq-loading").show();
                    this.$el.find(".dataTables_wrapper").addClass("running");
                } else {
                    $(".sq-loading").hide();
                    this.$el.find(".dataTables_wrapper").removeClass("done");
                }
            } else if (this.model.get("error")) {
                // error
                $(".sq-loading").hide();
            } else {
                if (this.reactiveState && ! this.mainModel.get("analysisRefreshNeeded")) {
                    this.display();
                    this.$el.find(".squid-api-data-widgets-data-table").removeClass("setHeaders");
                }
                $(".sq-loading").hide();
                this.selectColumn();
            }

            return this;
        },

        addMetricClasses : function() {
            var index = [];
            var me = this;
            var columnHeaders = $(this).find("th");

            for (i=0; i<columnHeaders.length; i++) {
                if ($(columnHeaders[i]).hasClass("NUMBER")) {
                    index.push(i);
                }
            }

            var bodyTr = $(this).find("tbody tr");

            for (i=0; i<bodyTr.length; i++) {
                var items = $(bodyTr[i]).find("td");

                for (i1=0; i1<index.length; i1++) {
                    for (i2=0; i2<items.length; i2++) {
                        if (i2 === index[i1]) {
                            $(items[i2]).addClass("NUMBER");
                        }
                    }
                }
            }
        },
        
        display : function() {
            var analysis = this.model;
            var me = this;

            // in case of a multi-analysis model
            if (analysis.get("analyses")) {
              analysis = analysis.get("analyses")[0];
            }

            var jsonData = analysis.toJSON();
            if (jsonData.results) {
                // apply paging and number formatting
                data = {};
                data.done = this.model.isDone();
                data.results = {"cols" : jsonData.results.cols, "rows" : []};
                rows = jsonData.results.rows;
                for (rowIdx = 0; (rowIdx<rows.length && rowIdx<this.maxRowsPerPage); rowIdx++) {
                    row = rows[rowIdx];
                    newRow = {v:[]};
                    for (colIdx = 0; colIdx<jsonData.results.cols.length; colIdx++) {
                        v = row.v[colIdx];
                        if (jsonData.results.cols[colIdx].dataType == "NUMBER") {
                            v = this.format(v);
                        }
                        newRow.v.push(v);
                    }
                    data.results.rows.push(newRow);
                }
                
                // build the html datatable
                this.dataTableInsert(data);

                // match orderBy column with default sorting
                var columnToSelect = this.config.get("selectedMetric");
                var columnOrderDirection = this.config.get("orderByDirection");
                if (!columnOrderDirection) {
                    columnOrderDirection = "asc";
                } else {
                    // for data table compatibility we need to format the string
                    columnOrderDirection = columnOrderDirection.toLowerCase();
                }
                
                // cycle through each header element to order automatically
                var tableHeaders = this.$el.find("thead th");
                var columnToOrder = 0;

                for (i=0; i<tableHeaders.length; i++) {
                    if ($(tableHeaders[i]).attr("data-content") === columnToSelect) {
                        columnToOrder = i;
                    }
                }
                

                // Initiate the Data Table after render
                this.$el.find(".sq-table").DataTable({
                    "lengthChange": false,
                    "searching": this.searching,
                    "paging" : this.paging,
                    "ordering":  this.ordering,
                    "fnDrawCallback" : this.addMetricClasses,
                    "order": [[ columnToOrder, columnOrderDirection ]],
                    "iDisplayLength" : this.pageLength
                });
            }
        }
    });

    return View;
}));
