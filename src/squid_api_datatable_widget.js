(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        maxRowsPerPage : 10000,

        format : null,
        
        d3Formatter : null,

        mainModel : null,

        initialize : function(options) {
            this.mainModel = options.mainModel;

            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
                this.mainModel.on("change:selectedMetric", this.selectColumn, this);
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
            if (d3) {
                this.d3Formatter = d3.format(",.f");
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (this.d3Formatter) {
                    var me = this;
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
            // Get Table Headers
            var tableHeaders = this.$el.find("table th");

            // Loop over each one and match the value
            for (i=0; i<tableHeaders.length; i++) { 
                if (this.mainModel.get("selectedMetric") == $(tableHeaders[i]).attr("data-content")) {
                    $(tableHeaders[i]).addClass("filtered-by");
                }
            }
        },

        render : function() {
            var jsonData, data, rowIdx, colIdx, row, rows, v, analysis;

            var me = this;

            this.$el.html(this.template());

            if (!this.model.isDone()) {
                // running
                if (this.model.get("status") == "RUNNING") {
                    $(".sq-loading").show();
                } else {
                    $(".sq-loading").hide();
                }
            } else if (this.model.get("error")) {
                // error
                $(".sq-loading").hide();
            } else {
                // display
                this.display();

                $(".sq-loading").hide();
            }

            this.selectColumn();

            return this;
        },
        
        display : function() {
            var analysis = this.model;

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
                    "ordering": false,
                    "lengthChange": false,
                    "searching": false
                });
            }
        }
    });

    return View;
}));
