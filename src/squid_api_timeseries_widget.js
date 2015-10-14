(function (root, factory) {
    root.squid_api.view.TimeSeriesView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_timeseries_widget);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend({

        template : null,
        dataToDisplay : 10000,
        format : null,
        d3Formatter : null,
        startDate: null,
        endDate: null,
        colorPalette: null,
        interpolationRange: null,
        yearSwitcherView: null,
        metricSelectorView: null,
        staleMessage : "Click refresh to update",

        initialize : function(options) {

            if (options.dataToDisplay) {
                this.dataToDisplay = options.dataToDisplay;
            }
            if (options.colorPalette) {
                this.colorPalette = options.colorPalette;
            }
            if (options.interpolationRange) {
                this.interpolationRange = options.interpolationRange;
            }
            if (options.yearSwitcherView) {
                this.yearSwitcherView = options.yearSwitcherView;
            }
            if (options.yearAnalysis) {
                this.yearAnalysis = options.yearAnalysis;
            }
            if (options.metricSelectorView) {
                this.metricSelectorView = options.metricSelectorView;
            }
            if (options.staleMessage) {
                this.staleMessage = options.staleMessage;
            }
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_timeseries_widget;
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

            if (this.model) {
                this.listenTo(this.model, 'change:status', this.render);
                this.listenTo(this.model, 'change:error', this.render);
            }

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

        /**
         * see : http://stackoverflow.com/questions/10966440/recreating-a-removed-view-in-backbone-js
         */
        remove: function() {
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();
            $(window).off("resize");
            return this;
        },

        seriesDataValues : function(dateIndex, metricIndex, modelRows, modelCols) {
            var series = [];
            var value, date;
            var serie;
            var currentSerieName = null;
            var serieName = "";

            var palette = new Rickshaw.Color.Palette();

            if (this.colorPalette) {
                palette.scheme = this.colorPalette;
            }

            // Start of Data Manipulation
            var manipTimeStart = new Date();
            var currentYear;

            // Store Serie Values from data
            for (var i=0; (i<modelRows.length); i++) {
                var yearChange = false;

                value = modelRows[i].v;

                if (this.YearOverYear) {
                    if (moment(value[dateIndex]).year() !== currentYear) {
                        yearChange = true;
                        currentYear = moment(value[dateIndex]).year();
                    }
                }

                date = moment.utc(value[dateIndex]);

                // Obtain the correct name based on index
                if (dateIndex>0) {
                    serieName = value[dateIndex-1];
                }
                if ((currentSerieName === null) || (serieName !== currentSerieName) || yearChange === true) {
                    currentSerieName = serieName;
                    // create a new serie
                    serie = {};
                    if (yearChange) {
                        serie.name = moment(value[dateIndex]).year();
                    } else {
                        serie.name = modelCols[metricIndex].name;
                        serie.color = palette.color();
                    }
                    serie.data = [];
                    series.push(serie);
                }

                if (date.isValid()) {
                    var object = {};
                    object.x = moment(date).format("YYYY-MM-DD");
                    if (value[metricIndex] === null) {
                        object.y = 0;
                    } else {
                        object.y = parseFloat(value[metricIndex]);
                    }
                    serie.data.push(object);
                } else {
                    console.debug("Invalid date : "+value[dateIndex]);
                }
            }

            // Inverse Array to obtain Correct Colour
            if (this.YearOverYear) {
                series = series.reverse();
                for (i=0; i<series.length; i++) {
                    series[i].color = palette.color();
                }
            }

            var startDate = moment(this.startDate);

            // Store new Series Values
            var newSerie = {};

            // Calculate the difference in days between the start / end date
            var dateDifference;
            if (this.interpolationRange) {
                dateDifference = moment(this.endDate).utc().endOf('day').diff(startDate.startOf("day"), this.interpolationRange);
                // detect date difference with returned data set
                if (series.length > 0) {
                    if (series[0].data.length !== dateDifference) {
                        dateDifference = series[0].data.length;
                        console.log("interpolation month calculation differs from returned result set");
                    }
                }
            } else {
                dateDifference = moment(this.endDate).diff(startDate, 'days');
            }

            /*
                Hashmaps with date as object key values / include a default y value of 0
                Add a value for each day
            */

            while (startDate.diff(this.endDate, 'days') <= 0) {
                newSerie[startDate.format("YYYY-MM-DD")] = { y : 0 };
                startDate = startDate.add(1, 'days');
            }

            for (serieIdx=0; serieIdx<series.length; serieIdx++) {
                // Get each serie
                var existingSerie = series[serieIdx].data;

                // Check if there is a difference between numbers of days / serie values
                if (series[serieIdx].data.length !== dateDifference && this.YearOverYear === false) {

                    // Fill in the values from existing serie
                    for (i=0; i<existingSerie.length; i++) {
                        var s = newSerie[existingSerie[i].x];
                        if (s !== undefined) {
                            s.y = existingSerie[i].y;
                        }
                    }

                    // Update the array with the new data
                    var updatedArray = [];
                    for (var i2=0; i2<newSerie.length; i2++) {
                        var obj = {};
                        var key = newSerie[i2];
                        obj.x = moment.utc(key).unix();
                        obj.y = newSerie[key].y;
                        updatedArray.push(obj);
                    }

                    // Update the existing data
                    series[serieIdx].data = updatedArray;
                } else {
                    // Convert API date into UNIX + Sort if no manipulation occurs
                    for (i=0; i<existingSerie.length; i++) {
                        if (this.YearOverYear) {
                            var modifiedSerie = "2014" + existingSerie[i].x.substring(4);
                            existingSerie[i].x = moment.utc(modifiedSerie).unix();
                        } else {
                            existingSerie[i].x = moment.utc(existingSerie[i].x).unix();
                        }
                    }

                    series[serieIdx].data = this.sortDateValues(series[serieIdx].data);
                }
            }

            // End of Data Manipulation
            var manipTimeEnd = new Date();
            var manipTimeDifference = manipTimeEnd - manipTimeStart;
            console.log("TimeSeries manipulation time: " + manipTimeDifference + " ms");

            return series;
        },

        sortDateValues : function(dates) {
            dates.sort(function(a,b){
                return (a.x - b.x);
            });
            return dates;
        },

        getData: function() {
            var data, analysis;

            // Support Mutli / Single Analysis Jobs
            if (this.model.get("analyses")) {
                if (this.YearOverYear) {
                    analysis = this.model.get("analyses")[1];
                } else {
                    analysis = this.model.get("analyses")[0];
                }
            } else {
                 analysis = this.model;
            }

            data = analysis.toJSON();
            data.done = this.model.isDone();

            return data;
        },

        render : function() {

            var status = this.model.get("status");
            this.YearOverYear = squid_api.model.config.get("YearOverYear");

            if (status === "PENDING") {
                this.$el.html(this.template({"staleMessage" : this.staleMessage}));
                this.$el.find(".sq-loading").hide();
                this.$el.find("#stale").show();
            }
            if (status === "RUNNING") {
                this.$el.find(".sq-loading").show();
            }
            if (status === "DONE") {
                this.$el.html(this.template());
                this.$el.find("#stale").hide();
                this.$el.find(".sq-loading").hide();

                var data = this.getData();

                if (data.done && data.results) {
                    this.$el.find(".sq-loading").hide();

                    // Temp Fix for correct resizing
                    this.$el.css("width", "100%");

                    // Store Start and end Dates
                    var facets = data.selection.facets;
                    for (i=0; i<facets.length; i++) {
                        var items = facets[i].selectedItems;
                        for (ix=0; ix<items.length; ix++) {
                            if (items[ix].lowerBound && items[ix].upperBound) {
                                this.startDate = items[ix].lowerBound;
                                this.endDate = items[ix].upperBound;
                            }
                        }
                    }

                    var dateColumnIndex=0;

                    while (data.results.cols[dateColumnIndex].dataType !== "DATE") {
                        dateColumnIndex++;
                    }

                    // Time Series [Series Data]
                    var series = this.seriesDataValues(dateColumnIndex, dateColumnIndex+1, data.results.rows, data.results.cols);
                    var metricName = data.results.cols[dateColumnIndex+1].name;

                    if (series.length>0 && (series[0].data.length>0)) {

                        var tempWidth = this.$el.width();

                        // Time Series Chart
                        var graph = new Rickshaw.Graph({
                            element: document.getElementById("chart"),
                            width: tempWidth,
                            height: 400,
                            renderer: 'line',
                            interpolation: 'linear',
                            strokeWidth: 3,
                            series: series
                        });

                        graph.render();

                        new Rickshaw.Graph.HoverDetail( {
                            graph: graph,
                            formatter: function(series, x, y) {
                                var formatter = d3.format(",.f");
                                var date;
                                if (squid_api.model.config.get("YearOverYear")) {
                                    date = '<span class="date">' + series.name + "-" + moment(new Date(x * 1000)).format("MM-DD") + '</span>';
                                } else {
                                    date = '<span class="date">' + moment(new Date(x * 1000)).format("YYYY-MM-DD") + '</span>';
                                }
                                var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
                                var content = swatch + formatter(parseInt(y)) + " " + metricName + '<br>' + date;

                                return content;
                            }
                        });

                        new Rickshaw.Graph.Legend( {
                            graph: graph,
                            element: document.getElementById('legend')
                        });

                        var xAxis = new Rickshaw.Graph.Axis.Time( {
                            graph: graph
                        });

                        var yAxis = new Rickshaw.Graph.Axis.Y( {
                            graph: graph
                        });

                        new Rickshaw.Graph.RangeSlider({
                            graph: graph,
                            element: document.querySelector('#slider')
                        });

                        yAxis.render();
                        xAxis.render();
                    } else {
                        this.$el.html("<div class='bad-data'>No Series data to View</span>");
                    }
                }
            }
            if (this.yearSwitcherView){
                this.yearSwitcherView.setElement(this.$el.find("#yearswitcher"));
                this.yearSwitcherView.render();
            }
            if (this.metricSelectorView){
                this.metricSelectorView.setElement(this.$el.find("#metricselector"));
                this.metricSelectorView.render();
            }
        }
    });

    return View;
}));
