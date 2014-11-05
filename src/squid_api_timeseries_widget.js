(function (root, factory) {
    root.squid_api.view.TimeSeriesView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_timeseries_widget);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend({

        template : null,
        metrics : null,
        statistics: null,
        dataToDisplay : 10000,
        invalidData: false,
        format : null,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change:status', this.update, this);
                this.model.on('change:error', this.render, this);
            }

            if (options.dataToDisplay) {
                this.dataToDisplay = options.dataToDisplay;
            }

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_timeseries_widget;
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

            // Store the current metrics
            this.metrics = this.model.get("metrics");

            this.render();

            // Resize
            $(window).on("resize", _.bind(this.resize(),this));
        },

        resize : function() {
            var resizing = true;
            return function() {
                if (this.resizing) {
                    window.clearTimeout(resizing);
                }
                this.resizing = window.setTimeout(_.bind(this.render,this), 100);
            };
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },

        update : function() {

            if (!this.model.isDone()) {
                // running
                if (this.model.get("status") == "RUNNING") {
                    $(".sq-loading").show();
                }
            } else if (this.model.get("error")) {
                // error
                $(".sq-loading").hide();
            }

            // Store the current metrics
            this.metrics = this.model.get("metrics");

            this.render();
        },

        seriesColorAssignment : function(serie) {
            // Default
            var color = "#666666";

            // Specify a colour return value for each metric
            switch (serie) {

                case "count" :
                    color = "#fe6e70";
                break;
                case "withFTA" :
                    color = "#67e363";
                break;
                case "max_date" :
                    color = "#b563e2";
                break;
                case "sum_fta" :
                    color = "#ffc46f";
                break;
                case "unique_ftas" :
                    color = "#67e363";
                break;
            }

            return color;
        },

        seriesDataValues : function(serie, index, modelData) {
            var currentIndex = index;

            var seriesData = [];

            $.each(modelData, function(index, value) {
                var object = {};

                // Convert date value into unix
                object.x = moment(value[0]).unix();
                object.y = parseFloat(value[currentIndex + 1]);

                seriesData.push(object);
            });

            return seriesData;
        },

        getData: function() {

                var jsonData, data, rowIdx, colIdx, row, rows, v, analysis;

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
                    for (rowIdx = 0; (rowIdx<rows.length && rowIdx<this.dataToDisplay); rowIdx++) {
                        row = rows[rowIdx];
                        newRow = {v:[]};
                        for (colIdx = 0; colIdx<jsonData.results.cols.length; colIdx++) {
                            v = row.v[colIdx];
                            if (jsonData.results.cols[colIdx].dataType == "NUMBER") {
                                v = v;
                            }
                            newRow.v.push(v);
                        }
                        data.results.rows.push(newRow);
                    }
                }

                return data;
        },

        sortDateValues : function(dates) {
            var data = [];

            $.each(dates, function(index, value) {
                var object = {};

                $.each(value.v, function(index, value) {
                    object[index] = value;
                });

                data.push(object);
            });

            // Make sure that dates are sorted from lowest to highest
            var sortedDates = _.sortBy(data, function(o) { return o[0]; });

            return sortedDates;
        },

        render : function() {

            var me = this;

            var data = this.getData();

            // Metric Data Manipulation
            var metricObject = this.metrics;
            var metricNames = [];

            $.each(metricObject, function(index, value) {
                metricNames.push(value.metricId);
            });

            // Print Template
            this.$el.html(this.template());

            // Time Series [Series Data]
            var series = [];

            if (data.done) {

                $.each(metricNames, function(index, value) {
                    var object = {};

                    $(".sq-loading").hide();

                    object.color = me.seriesColorAssignment(value);
                    object.name = value;
                    object.data = me.seriesDataValues(value, index, me.sortDateValues(data.results.rows));

                    if (isNaN(object.data[0].x)) {
                        me.invalidData = true;
                        return false;

                    } else {
                        me.invalidData = false;
                    }

                    series.push(object);

                });

                if (!me.invalidData) {
                    var tempWidth = $(window).width() - 50;

                    // Time Series Chart

                    var graph = new Rickshaw.Graph({
                           element: document.getElementById("chart"),
                           width: tempWidth,
                           height: 400,
                           renderer: 'line',
                              series: series
                         });

                         graph.render();

                         var hoverDetail = new Rickshaw.Graph.HoverDetail( {
                             graph: graph,
                             xFormatter: function(x) { return "Date: " + moment.utc(x, 'X').format('YYYY-MM-DD');},
                             yFormatter: function(y) { return Math.floor(y); }
                         });

                         var legend = new Rickshaw.Graph.Legend( {
                            graph: graph,
                            element: document.getElementById('legend')
                         });

                         var xAxis = new Rickshaw.Graph.Axis.Time( {
                             graph: graph
                         });

                         var yAxis = new Rickshaw.Graph.Axis.Y( {
                             graph: graph
                         });

                         var slider = new Rickshaw.Graph.RangeSlider({
                             graph: graph,
                             element: document.querySelector('#slider')
                        });

                        var offsetForm = document.getElementById('offset_form');

                        // Change chart type on button change
                        offsetForm.addEventListener('change', function(e) {
                            var offsetMode = e.target.value;

                            if (offsetMode == 'lines') {
                                graph.setRenderer('line');
                                graph.offset = 'zero';
                            } else if (offsetMode == 'stack') {
                                graph.setRenderer('stack');
                                graph.offset = offsetMode;
                            } else if (offsetMode == 'bar') {
                                graph.setRenderer('bar');
                                graph.offset = offsetMode;
                            }

                            graph.render();

                        }, false);

                         yAxis.render();
                         xAxis.render();


                     } else {
                         this.$el.html("<div class='bad-data'>Time Series incompatible, please choose another</span>");
                     }

                     return this;
            }
        }
    });

    return View;
}));
