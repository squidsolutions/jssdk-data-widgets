(function (root, factory) {
    root.squid_api.view.DataExport = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        renderTo: null,
        format : "csv",
        compression : true,
        downloadStatus : 0,
        
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
            if (options.renderTo) {
                this.renderTo = options.renderTo;
            }
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },
        
        clickedFormat : function (event) {
            var t = event.target;
            this.format = t.value;
            this.render();
        },
        
        clickedCompression : function (event) {
            var t = event.target;
            this.compression = (t.checked);
            this.render();
        },
        
        download : function(event) {
            var me = this, analysis = this.model;
      
            if (this.downloadStatus === 0) {
                event.preventDefault();
                this.downloadStatus = 1;
                this.$el.find("#download").html("Computing...");
                var downloadAnalysis = new squid_api.model.ProjectAnalysisJob();
                downloadAnalysis.set({
                   "id": {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    },
                    "domains": analysis.get("domains"),
                    "dimensions" : analysis.get("dimensions"),
                    "metrics" : analysis.get("metrics"),
                    "selection": analysis.get("selection"),
                    "orderBy": analysis.get("orderBy")
                    });
                downloadAnalysis.addParameter("timeout",null);
                squid_api.controller.analysisjob.createAnalysisJob(downloadAnalysis)
                    .done(function(model, response) {
                        me.downloadStatus = 2;
                        // create download link
                        var analysisJobResults = new squid_api.model.ProjectAnalysisJobResult();
                        analysisJobResults.addParameter("format",me.format);
                        if (me.compression) {
                            analysisJobResults.addParameter("compression","gzip");
                        }
                        analysisJobResults.set({
                                "id": downloadAnalysis.get("id"),
                                "oid": downloadAnalysis.get("oid")
                            });
                        console.log(analysisJobResults.url());
                        me.$el.find("#download").html("Click this link to download");
                        me.$el.find("#download").attr("href",analysisJobResults.url());
                        me.$el.find("#download").removeClass("btn-default");
                        me.$el.find("#download").addClass("btn-link");
                    })
                    .fail(function(model, response) {
                        console.error("createAnalysisJob failed");
                    });
            } else {
                me.downloadStatus = 0;
                me.$el.find("#download").html("Download");
                me.$el.find("#download").removeClass("btn-link");
                me.$el.find("#download").addClass("btn-default");
            }
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
                // render the curl snippet
                var exportAnalysis = new squid_api.model.ProjectAnalysisJob();
                exportAnalysis.addParameter("format",this.format);
                if (this.compression) {
                    exportAnalysis.addParameter("compression","gzip");
                }
                exportAnalysis.addParameter("access_token","[access_token]");
                exportAnalysis.set({
                   "id": {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    },
                    "domains": analysis.get("domains"),
                    "dimensions" : analysis.get("dimensions"),
                    "metrics" : analysis.get("metrics"),
                    "selection": analysis.get("selection"),
                    "orderBy": analysis.get("orderBy")
                    });

                // escape all spaces in the json injected into cURL
                var data = JSON.stringify(exportAnalysis).replace(/\'/g, '\\\'');
                
                this.$el.html(this.template({
                    "data-target" : this.renderTo,
                    "formatCSV": (this.format == "csv"),
                    "formatJSON": (this.format == "json"),
                    "compression": (this.compression),
                    "curl": exportAnalysis.url().replace(/\[access_token\]/g, '<b>[access_token]</b>'),
                    "curlFileName" : "analysis."+((this.format == "csv")?"csv":"")+((this.format == "json")?"json":"")+((this.compression)?".gz":""),
                    "origin": "https://api.squidsolutions.com",
                    "data": data,
                    "customerId" : squid_api.customerId,
                    "clientId" : squid_api.clientId,
                    "redirectURI":"https://api.squidsolutions.com",
                    "apiURL":squid_api.apiURL
                    })
                );
                
                // register click handlers
                this.$el.find("#download").click(function(event) {me.download(event);});
                this.$el.find('[name="format"]').click(this.clickedFormat);
                this.$el.find('[name="compression"]').click(this.clickedCompression);

                // Close cURL panel by default
                // this.$el.find('.collapse').collapse('hide');
            }
            return this;
        }
    });

    return View;
}));
