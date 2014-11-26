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

        render : function() {
            var me = this, analysis = this.model;

            if (!analysis.isDone()) {
                this.$el.html("");
            } else if (analysis.get("error")) {
                // error
                this.$el.html("");
            } else if (!analysis.get("oid")) {
                // analysis not ready yet
                this.$el.html("");
            } else {
                // render the export link
                var analysisJobResults = new squid_api.model.ProjectAnalysisJobResult();
                analysisJobResults.addParameter("format","csv");
                analysisJobResults.set({
                    "id": analysis.get("id"),
                    "oid": analysis.get("oid")
                    });
                console.log(analysisJobResults.url());
                
                // render the curl snippet
                var exportAnalysis = new squid_api.model.ProjectAnalysisJob();
                exportAnalysis.addParameter("format","csv");
                exportAnalysis.set({
                   "id": {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    },
                    "domains": analysis.get("domains"),
                    "dimensions" : analysis.get("dimensions"),
                    "metrics" : analysis.get("metrics"),
                    "selection": analysis.get("selection")
                    });
                console.log(exportAnalysis.url());
                // escape all spaces in the json injected into cURL
                var data = JSON.stringify(exportAnalysis).replace(/\'/g, '\\\'');
                
                this.$el.html(this.template({
                    csv: analysisJobResults.url(),
                    curl: exportAnalysis.url(),
                    origin: "https://api.squidsolutions.com",
                    data: data
                    })
                );
            }
            return this;
        }
    });

    return View;
}));
