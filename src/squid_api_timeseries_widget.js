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
        yearAnalysis: null,

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
            if (options.mainModel) {
                this.mainModel = options.mainModel;
            }

            // setup options
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
            if (this.mainModel) {
                this.mainModel.on("change:yearByYear", this.render, this);
            }
            if (this.yearAnalysis) {
                this.listenTo(this.yearAnalysis, 'change:status', this.render);
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

        seriesDataValues : function(dateIndex, metricIndex, modelData) {
            var yearByYear = false;

            if (this.mainModel.get("yearByYear") === true) {
                yearByYear = true;
            }

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
            for (var i=0; (i<modelData.length); i++) {
                var yearChange = false;

                value = modelData[i].v;

                if (yearByYear) {
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
                if ((currentSerieName === null) || (serieName != currentSerieName) || yearChange === true) {
                    currentSerieName = serieName;
                    // create a new serie
                    serie = {};
                    serie.color = palette.color();
                    if (yearChange) {
                        serie.name = moment(value[dateIndex]).year();
                    } else {
                        serie.name = currentSerieName;
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

            var currentDate = moment(this.startDate);

            // Store new Series Values
            var newSerie = {};
            var updatedData = [];

            // Calculate the difference in days between the start / end date
            var dateDifference;
            if (this.interpolationRange) {
                dateDifference = moment(this.endDate).diff(currentDate, this.interpolationRange) + 1;
            } else {
                dateDifference = moment(this.endDate).diff(currentDate, 'days') + 1;
            }

            /*
                Hashmaps with date as object key values / include a default y value of 0
                Add a value for each day
            */

            while (currentDate.diff(this.endDate, 'days') <= 0) {
                newSerie[currentDate.format("YYYY-MM-DD")] = { y : 0 };
                currentDate = currentDate.add(1, 'days');
            }

            for (serieIdx=0; serieIdx<series.length; serieIdx++) {
                // Get each serie
                var existingSerie = series[serieIdx].data;

                // Check if there is a difference between numbers of days / serie values
                if (series[serieIdx].data.length !== dateDifference && yearByYear === false) {

                    // Fill in the values from existing serie
                    for (i=0; i<existingSerie.length; i++) {
                        var s = newSerie[existingSerie[i].x];
                        if (s !== undefined) {
                            s.y = existingSerie[i].y;
                        }
                    }

                    // Update the array with the new data
                    var updatedArray = [];
                    for (var key in newSerie) {
                        var obj = {};
                        obj.x = moment.utc(key).unix();
                        obj.y = newSerie[key].y;
                        updatedArray.push(obj);
                    }

                    // Update the existing data
                    series[serieIdx].data = updatedArray;
                } else {
                    
                    // Convert API date into UNIX + Sort if no manipulation occurs
                    for (i=0; i<existingSerie.length; i++) {
                        if (yearByYear) {
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
            
            // See if Year By Year is Selected
            if (this.mainModel && this.mainModel.get("yearByYear")) {
                if (this.yearAnalysis) {
                    analysis = this.yearAnalysis;
                }
            } else {
                analysis = this.model;
            }

            data = analysis.toJSON();
            data.done = this.model.isDone();

            return data;
        },

        render : function() {
            var me = this;
            var status = this.model.get("status");
            
            if (status == "PENDING" || status == "DONE") {
                this.$el.html(this.template());
            }
            if (status === "PENDING") {
                this.$el.find(".sq-loading").hide();
                this.$el.find("#stale").show();
            }
            if (status === "RUNNING") {
                // refresh needed
                this.$el.find(".sq-loading").show();
            }
            if (status === "DONE") {
                this.$el.find("#stale").hide();
                var data = this.getData();

                if (data.done && data.results) {
                    this.$el.find(".sq-loading").hide();

                    // Temp Fix for correct resizing
                    this.$el.css("width", "100%");
                    // Store Start and end Dates

                    var lastFacet = data.selection.facets.length - 1;
                    if (data.selection.facets[lastFacet]) {
                        this.startDate = data.selection.facets[lastFacet].selectedItems[0].lowerBound;
                        this.endDate = data.selection.facets[lastFacet].selectedItems[0].upperBound;
                    }
                    
                    var dateColumnIndex=0;
                    
                    while (data.results.cols[dateColumnIndex].dataType != "DATE") {
                        dateColumnIndex++;
                    }

                    // Time Series [Series Data]
                    var series = this.seriesDataValues(dateColumnIndex, dateColumnIndex+1, data.results.rows);
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
                            series: series
                        });

                        graph.render();

                        var hoverDetail = new Rickshaw.Graph.HoverDetail( {
                            graph: graph,
                            xFormatter: function(x) { return "Date: " + moment.utc(x, 'X').format('YYYY-MM-DD');},
                            yFormatter: function(y) { return Math.floor(y); },
                            formatter: function(series, x, y) {
                                var content = "";
                                if (series.name) {
                                    content = series.name + ": ";
                                }
                                content += me.format(y) + " " + metricName;
                                return content;
                            }
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

                        yAxis.render();
                        xAxis.render();
                    } else {
                        this.$el.html("<div class='bad-data'>No Series data to View</span>");
                    }

                    if (this.yearSwitcherView){
                        this.yearSwitcherView.setElement(this.$el.find("#yearswitcher"));
                        this.yearSwitcherView.render();
                    }

                    return this;
                }
            }
        }
    });

    return View;
}));
