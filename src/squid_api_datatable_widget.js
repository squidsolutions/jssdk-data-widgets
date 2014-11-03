(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        maxRowsPerPage : 10000,

        format : null,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change', this.render, this);
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
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (d3) {
                    this.format = d3.format(",.f");
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

            // Rows
            var tr = d3.select(globalID + " tbody").selectAll("tr")
                .data(data.results.rows)
                .enter().append("tr")

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

        render : function() {
            var jsonData, data, rowIdx, colIdx, row, rows, v, analysis;

            var me = this;

            analysis = this.model;

            // Use the first analyses array

            if (analysis.get("analyses")) {
              analysis = analysis.get("analyses")[0];
            }

            jsonData = analysis.toJSON();

            data = {};
            data.done = this.model.isDone();
            if (jsonData.results) {
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
            }
            this.$el.html(this.template(data));

            if (!this.model.isDone()) {
                // running
                if (this.model.get("status") == "RUNNING") {
                    $(".sq-loading").show();
                }
            } else if (this.model.get("error")) {
                // error
                $(".sq-loading").hide();
            } else {
                // display
                this.dataTableInsert(data);

                $(".sq-loading").hide();
                // Initiate the Data Table after render

                this.$el.find(".sq-table").DataTable();

            }

            return this;
        }
    });

    return View;
}));
