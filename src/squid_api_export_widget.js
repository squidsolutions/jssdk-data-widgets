(function (root, factory) {
    root.squid_api.view.DataExport = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        initialize : function(options) {
            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_export_widget;
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
        
        events : {
            "click": "doExport"
        },

        render : function() {
            var me = this;

            if (!this.model.isDone()) {
                this.$el.html("");
            } else if (this.model.get("error")) {
                // error
                this.$el.html("");
            } else {
                this.$el.html(this.template());
            }
            return this;
        },
        
        doExport : function() {
            
            // create the export analysis
            var exportAnalysis = new squid_api.model.AnalysisJob();
            var analysis = this.model;
            exportAnalysis.set({
                "domains": analysis.get("domains"),
                "dimensions" : analysis.get("dimensions"),
                "metrics" : analysis.get("metrics")
                });
            exportAnalysis.format = "csv";

            
            var selection =  squid_api.model.filters.get("selection");
            squid_api.controller.analysisjob.createAnalysisJob(exportAnalysis, selection)
                .done(function(model, response) {
                    console.log(model.url());
                    // get the analysis results
                    var analysisJobResults = new squid_api.model.ProjectAnalysisJobResult();
                    analysisJobResults.set({
                        "id": model.get("id"),
                        "oid": model.get("oid")
                        });
                    analysisJobResults.format = "csv";
                    // open the analysis results
                    console.log(model.url());
                    window.open(analysisJobResults.url());
                })
                .fail(function(model, response) {
                    console.log(response);
                });
        }
    });

    return View;
}));
