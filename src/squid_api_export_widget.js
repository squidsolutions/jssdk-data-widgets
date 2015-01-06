(function (root, factory) {
    root.squid_api.view.DataExport = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        renderTo: null,
        format : "csv",
        compression : true,
        downloadStatus : 0,
        curlCollapsed : true,
        
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
                // Before analysis job creation
                this.$el.find("#download").html("<i class='fa fa-spinner fa-spin'></i>");
                var downloadAnalysis = new squid_api.model.ProjectAnalysisJob();
                downloadAnalysis.set({
                   "id": {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    },
                    "domains": analysis.get("domains"),
                    "dimensions" : analysis.get("dimensions"),
                    "metrics" : analysis.get("metrics"),
                    "orderBy": analysis.get("orderBy")
                    });
                downloadAnalysis.addParameter("timeout",null);
                squid_api.controller.analysisjob.createAnalysisJob(downloadAnalysis, analysis.get("selection"))
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
                        me.$el.find("#download").html("Download");
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
            
            // apply cURL panel state
            if (me.curlCollapsed) {
                me.$el.find('#curl').hide();
            } else {
                me.$el.find('#curl').show();
            }
            
            // Click Handlers
            this.$el.find("#curlbtn").click(function() {
                me.curlCollapsed = !me.curlCollapsed;
                if (me.curlCollapsed) {
                    me.$el.find('#curl').fadeOut();
                } else {
                    me.$el.find('#curl').fadeIn();
                }
            });
            
            // register click handlers
            this.$el.find("#download").click(
                    function(event) {
                        me.download(event);
                    });
            this.$el.find('[name="format"]').click(
                    function(event) {
                        me.clickedFormat(event);
                    });
            this.$el.find('[name="compression"]')
                    .click(function(event) {
                        me.clickedCompression(event);
                    });

            return this;
        }
    });

    return View;
}));
