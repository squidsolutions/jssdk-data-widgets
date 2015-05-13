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

        initialize : function(options) {
            
            if (this.model) {
                this.listenTo(this.model, 'change:status', this.update);
                this.listenTo(this.model, 'change:error', this.render);
            }

            if (options.dataToDisplay) {
                this.dataToDisplay = options.dataToDisplay;
            }
            if (options.colorPalette) {
                this.colorPalette = options.colorPalette;
            }
            if (options.interpolationRange) {
                this.interpolationRange = options.interpolationRange;
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

        update : function() {

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
            }

            this.render();
        },

        seriesDataValues : function(dateIndex, metricIndex, modelData) {
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

            // Store Serie Values from data
            for (var i=0; (i<modelData.length); i++) {
                value = modelData[i].v;
                date = moment.utc(value[dateIndex]);
                
                // Obtain the correct name based on index
                if (dateIndex>0) {
                    serieName = value[dateIndex-1];
                }
                if ((currentSerieName === null) || (serieName != currentSerieName)) {
                    currentSerieName = serieName;
                    // create a new serie
                    serie = {};
                    serie.color = palette.color();
                    serie.name = currentSerieName;
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
                if (series[serieIdx].data.length !== dateDifference) {

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
                        existingSerie[i].x = moment.utc(existingSerie[i].x).unix();
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

            analysis = this.model;
            // Use the first analyses array
            if (analysis.get("analyses")) {
                analysis = analysis.get("analyses")[0];
            }

            data = analysis.toJSON();
            data.done = this.model.isDone();

            return data;
        },

        render : function() {

            var me = this;

            var data = this.getData();

            if (data.done) {           
                // Temp Fix for correct resizing
                this.$el.css("width", "100%");
                // Print Template
                this.$el.html(this.template());
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
                $(".sq-loading").hide();
                return this;
            }
        }
    });

    return View;
}));
