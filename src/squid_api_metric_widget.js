(function (root, factory) {
    root.squid_api.view.MetricView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        
        format : null,
        
        d3Formatter : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
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
            
            if (this.model) {
                this.model.on("change:chosenMetrics", function() {
                    me.render();
                });

                this.model.on("change:selectedMetric", function() {
                    me.render();
                });

                this.model.get("totalAnalysis").on("change:results", function() {
                    me.render();
                });
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            // Dimension Sorting
            "click li": function(item) {
                var metrics = this.$el.find(".chosen-metrics li");

                for (i = 0; i < metrics.length; i++) {
                    $(metrics[i]).removeAttr("data-selected");
                    $(metrics[i]).removeClass("ui-selected");
                }

                $(item.currentTarget).addClass("ui-selected");
                $(item.currentTarget).attr("data-selected", true);

                var selectedItem = $(item.currentTarget).attr("data-content");
                
                // Update
                this.model.set({"selectedMetric" : selectedItem});
            }
        },

        render: function() {

            var results;
            var currentAnalysis = this.model.get("totalAnalysis");
            var chosenMetrics   = this.model.get("chosenMetrics");
            var selectedMetric  = this.model.get("selectedMetric");
            var jsonData        = {"chosenMetrics" : []};

            if (currentAnalysis) {
                results = currentAnalysis.get("results");
            }
            
            // iterate through all domains dimensions
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);

            if (results) {
                for (var idx = 0; idx < results.cols.length; idx++) {

                    for (var cm = 0; cm < chosenMetrics.length; cm++) {
                        var col = results.cols[idx];

                        if (chosenMetrics[cm] === col.id) {
                            // get the total for the metric
                            totalValue = results.rows[0].v[idx];
                            if (col.dataType == "NUMBER") {
                                totalValue = this.format(totalValue);
                            }

                            var selected, attrSelected;

                            if (selectedMetric === col.id) {
                                selected     = "ui-selected";
                                attrSelected = "true";
                            } else {
                                selected     = "";
                                attrSelected = "";
                            }

                             // add to the list
                            var option = {
                                "name" : col.name,
                                "value" : col.id,
                                "selected" : selected,
                                "attrSelected" : attrSelected,
                                "total" : {
                                    "value" : totalValue,
                                    "unit" : null
                                }
                            };
                            jsonData.chosenMetrics.push(option);
                        }
                    }
                }
                var html = this.template(jsonData);
                this.$el.html(html);
                this.$el.show();
            }

            return this;
        }
    });

    return View;
}));
