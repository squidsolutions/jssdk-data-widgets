(function (root, factory) {
    root.squid_api.view.BarChartView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_barchart_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,

        initialize: function(options) {
            var me = this;

            if (this.model) {
                this.listenTo(this.model, 'change:status', this.update);
                this.listenTo(this.model, 'change:error', this.render);
            }

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();

        },

        barDataValues: function(data) {
            // Set up base object + arrays
            var barData = {};
            barData.values = [];
            barData.xValues = [];
            barData.yValues = [];

            // Store these values
            for (i=0; i<data.length; i++) {
                barData.values.push(data[i].v);
                barData.xValues.push(data[i].v[1]);
                barData.yValues.push(data[i].v[0]);
            }

            return barData;
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

        remove: function() {
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();
            return this;
        },

        update: function() {
          if (this.model.get("dimensions").length < 2) {
              this.render();
          }
        },

        render: function() {

            var data = this.getData();

            if (data.done) {

                // Print Template
                this.$el.html(this.template());

                // Obtain Bar Chart Data
                var barData = this.barDataValues(data.results.rows);

                //Calculate largest value / width of screen
                var maxValue = Math.max.apply(Math, barData.xValues);
                var screenWidth = this.$el.find("#bar_chart").width();

                //ToolTip Declaration
                var tooltip = d3.select('body').append('div')
                    .style('position', 'absolute')
                    .style('padding', '0 10px')
                    .style('background', 'white')
                    .style('opacity', 0);

                // Pre definitions for the bar chart
                var width = screenWidth,
                    barHeight = 30;
                    ySpacing = 45;

                // Set A max / min height
                var height;

                if (barData.values.length < 5) {
                    height = 200;
                } else {
                    height = 500;
                }

                // To make the chart fit (Width)
                xScale = d3.scale.linear()
                    .domain([0, maxValue])
                    .range([0, width - 205]);

                xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('top');

                // To make the chart fit (Height)
                var yScale = d3.scale.ordinal()
                    .domain(barData.yValues)
                    .rangePoints([0, height]);

                //Define Y axis
                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(10);

                // Bar Chart
                var chart = d3.select("#bar_chart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("class", "chart");

                // Append data container
                var bar = chart.selectAll("div")
                    .data(barData.values)
                    .enter().append("g")
                    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

                // Bar Rectangles with Tooltips / Transition on load
                var barItem = bar.append("rect")
                    .attr("y", function(d, i) {
                        return i*15;
                    })
                    .attr("x", function(d, i) {
                        return i + 200;
                    })
                    .attr("width", function(d) {
                        return 0;
                    })
                    .attr('fill', '#026E87')
                    .attr("height", barHeight)
                    .on('mouseover', function(d) {
                        tooltip.transition()
                            .style('opacity', 1);
                        tooltip.html(d[0] + " - " + parseInt(d[1]))
                            .style('left', (d3.event.pageX - 35) + 'px')
                            .style('top',  (d3.event.pageY - 30) + 'px');
                        tempColor = this.style.fill;
                        d3.select(this)
                            .style('opacity', 1)
                            .style('fill', '#1aadcf');
                        })
                    .on('mouseout', function(d) {
                        tooltip.html("");
                        d3.select(this)
                            .style('opacity', 1)
                            .style('fill', tempColor);
                    })
                    .transition()
                        .attr('width', function(d) {
                            return xScale(d[1]);
                        })
                        .delay(function(d, i) {
                            return i * 20;
                        })
                        .duration(1000)
                        .ease('bounce');

                    // xAxis (Starting 200px from left)
                    var xAxis = d3.select("#bar_chart svg")
                        .append("g")
                        .attr('class', 'axis')
                        .attr('width', width)
                        .attr('x', 400)
                        .attr('transform', 'translate(200,' + (height - 1) + ')')
                        .call(xAxis);

                    // yAxis (Starting 200px from right)
                    var yAxisAppend = d3.select("#bar_chart svg")
                        .append("g")
                        .attr('class', 'axis')
                        .attr('height', height)
                        .attr('transform', 'translate(200,0)')
                        .call(yAxis)
                        .selectAll(".tick");

                    // Y aXis label spacing
                    var texts = yAxisAppend.attr("transform", function(d, i) {
                        return "translate(0," + (15 + (i * ySpacing)) + ")";
                    });
                }

            return this;
        }

    });

    return View;
}));
