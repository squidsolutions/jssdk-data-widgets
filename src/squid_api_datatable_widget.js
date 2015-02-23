(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        maxRowsPerPage : 10000,

        format : null,
        
        d3Formatter : null,

        mainModel : null,

        selectMetricHeader : false,

        searching : false,

        paging : false,

        ordering : false,

        noDataMessage : "No data available in table",

        reactiveState : false,

        reactiveMessage : null,

        headerBadges : false,

        domain : null,

        initialize : function(options) {
            this.mainModel = options.mainModel;
            var me = this;

            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
            }

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_datatable_widget;
            }
            if (options.maxRowsPerPage) {
                this.maxRowsPerPage = options.maxRowsPerPage;
            }
            if (options.selectedMetric) {
                this.selectedMetric = options.selectedMetric;
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
        },

        events : ({
            "click thead th.NUMBER" : function(item) {
                if (this.selectMetricHeader) {
                    var selectedMetric = $(item.target).attr("data-content");
                    this.mainModel.set("selectedMetric", selectedMetric);
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

            if (this.$el.attr("id")) {
                globalID = "#" + this.$el.attr('id');
            } else {
                console.log("No ID assigned to DOM element for Data Table");
            }

            d3.select(globalID + " tbody").selectAll("tr").remove();

            // header
            var th = d3.select(globalID + " thead tr").selectAll("th")
                .data(data.results.cols)
                .enter().append("th")
                .text(function(d) {
                    return d.name;
                })
                .attr("data-content", function(d) {
                    return d.id;
                })
                .attr("class", function(d) {
                    return d.dataType;
                });

            // Rows
            var tr = d3.select(globalID + " tbody").selectAll("tr")
                .data(data.results.rows)
                .enter().append("tr");

            // Cells
            var td = tr.selectAll("td")
                .data(function(d) {
                    return d.v;
                })
                .enter().append("td")
                .text(function(d) {
                    return d;
                });
        },

        selectColumn : function() {
            var me = this;

            // Get Table Headers
            var tableHeaders = this.$el.find("table th");

            // Loop over each one and match the value
            for (i=0; i<tableHeaders.length; i++) { 
                if (this.mainModel.get("selectedMetric") == $(tableHeaders[i]).attr("data-content")) {
                    $(tableHeaders[i]).addClass("filtered-by");
                    if (this.headerBadges) {
                        if (me.mainModel.get("orderByDirection") === "DESC") {
                            $(tableHeaders[i]).append("<span class='badge'>Top</span>");
                        } else {
                            $(tableHeaders[i]).append("<span class='badge'>Last</span>");
                        }
                    }
                }
            }
        },

        reactiveStateEvents : function() {
            if (this.mainModel) {
                this.mainModel.on("change:chosenDimensions", this.render, this);
                this.mainModel.on("change:chosenMetrics", this.render, this);
                this.mainModel.on("change:selectedMetric", this.render, this);
                this.mainModel.on("change:orderByDirection", this.render, this);
                api.model.filters.on('change', this.render, this);
            }
        },

        getNamesFromDomain : function(model, item) {
            var namesArray;
            var obj;
            if (model === "dimension") {
                var domainDimensions = this.domain.dimensions;
                namesArray = [];
                for (i=0; i<domainDimensions.length; i++) {
                    obj = {};
                    for (ix=0; ix<item.length; ix++) {
                        if (item[ix] === domainDimensions[i].oid) {
                            obj.id = item[ix];
                            obj.name = domainDimensions[i].name;
                            namesArray.push(obj);
                        }
                    }
                }
                return namesArray;
            } else if (model === "metric") {
                var domainMetrics = this.domain.metrics;
                namesArray = [];
                for (i=0; i<domainMetrics.length; i++) {
                    obj = {};
                    for (ix=0; ix<item.length; ix++) {
                        if (item[ix] === domainMetrics[i].oid) {
                            obj.id = item[ix];
                            obj.name = domainMetrics[i].name;
                            namesArray.push(obj);
                        }
                    }
                }
                return namesArray;
            }
        },

        printChosenItems : function() {
            var chosenDimensions = this.mainModel.get("chosenDimensions");
            var chosenMetrics = this.mainModel.get("chosenMetrics");
            var dimensions = this.getNamesFromDomain("dimension", chosenDimensions);
            var metrics = this.getNamesFromDomain("metric", chosenMetrics);

            this.$el.find("thead tr").html();
            if (this.mainModel.get("analysisRefreshNeeded")) {
                for (i=0; i<dimensions.length; i++) {
                    this.$el.find("thead tr").append("<th data-content=" + dimensions[i].id + ">" + dimensions[i].name + "</th>");
                }
                for (i=0; i<metrics.length; i++) {
                    this.$el.find("thead tr").append("<th data-content=" + metrics[i].id + ">" + metrics[i].name + "</th>");
                }
                this.$el.find(".squid-api-data-widgets-data-table").addClass("setHeaders");
                if (this.model.get("status") == "RUNNING") {
                    this.$el.find("tbody").html("<div class='reactiveMessage'></div>");
                }
            }
        },

        render : function() {
            var jsonData, data, rowIdx, colIdx, row, rows, v, analysis;
            if (! this.domain) {
                this.domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);
            }

            var me = this;

            var model = this.model.toJSON();
            var dataAvailable = true;

            if (!model.dimensions || !model.metrics) {
                dataAvailable = false;
            }
            if (this.model.get("status") == "RUNNING" && this.reactiveState) {

            } else {
                this.$el.html(this.template({'dataAvailable' : dataAvailable, 'noDataMessage' : this.noDataMessage}));
            }
            
            if (this.reactiveState) {
                this.$el.find(".reactiveMessage").hide();
                this.$el.find(".reactiveMessage").fadeIn();
                if (this.domain) {
                    this.printChosenItems();
                }
                this.$el.find(".squid-api-data-widgets-data-table").addClass("setHeaders");
                this.$el.find("tbody").html("<div class='reactiveMessage'><span>" + this.reactiveMessage + "</span></div>");
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
                // Initiate the Data Table after render
                this.$el.find(".sq-table").DataTable({
                    "lengthChange": false,
                    "searching": me.searching,
                    "paging" : me.paging,
                    "ordering":  me.ordering,
                    "fnDrawCallback" : this.addMetricClasses,
                });
            }
        }
    });

    return View;
}));
