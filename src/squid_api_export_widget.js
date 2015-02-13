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
        currentJobId : null,
        displayInAccordion : false,
        renderStore : null,
        
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
            if (options.displayInAccordion) {
                this.displayInAccordion = options.displayInAccordion;
                this.renderStore = this.renderTo;
            } else {
                this.renderStore = this.$el;
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
      
            if  (this.downloadStatus === 2) {
                // poll job status
                var downloadBtn = $(me.renderStore).find("#download");
                downloadBtn.addClass("hidden");
                $(me.renderStore).find("#downloading").removeClass("hidden");
                
                var observer = $.Deferred();
                var pollAnalysis = new squid_api.model.AnalysisJob();
                pollAnalysis.set({
                   "id": {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": me.currentJobId.analysisJobId,
                    }});
                observer.always(function(){
                    // Done
                    squid_api.model.status.pullTask(pollAnalysis);
                    me.downloadStatus = 0;
                    me.render();
                });
                squid_api.model.status.pushTask(pollAnalysis);
                squid_api.controller.analysisjob.getAnalysisJob(observer, pollAnalysis);
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
            
                $(this.renderStore).html(this.template({
                    "displayInAccordion" : this.displayInAccordion,
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

            if (this.displayInAccordion) {
                this.$el.html("<button type='button' class='btn btn-open-export-panel' data-toggle='collapse' data-target=" + this.renderTo + ">Export<span class='glyphicon glyphicon-chevron-up'></span></button>");
            }
            
            // apply cURL panel state
            if (me.curlCollapsed) {
                $(this.renderStore).find('#curl').hide();
            } else {
                $(this.renderStore).find('#curl').show();
            }
            
            // Click Handlers
            $(this.renderStore).find("#curlbtn").click(function() {
                me.curlCollapsed = !me.curlCollapsed;
                if (me.curlCollapsed) {
                    $(me.renderStore).find('#curl').fadeOut();      
                } else {
                    $(me.renderStore).find('#curl').fadeIn();
                }
            });
            
            // register click handlers    
             $(this.renderStore).find("#download").click(
                function(event) {
                    me.download(event);
                });
             $(this.renderStore).find('[name="format"]').click(
                function(event) {
                    me.clickedFormat(event);
                });
             $(this.renderStore).find('[name="compression"]')
                .click(function(event) {
                    me.clickedCompression(event);
                });
             
             
             // prepare download link
             this.downloadStatus = 1;
             var downloadBtn = $(me.renderStore).find("#download");
             // Before analysis job creation
             downloadBtn.addClass("disabled");
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
                     me.currentJobId = downloadAnalysis.get("id");
                     // create download link
                     var analysisJobResults = new squid_api.model.ProjectAnalysisJobResult();
                     analysisJobResults.addParameter("format",me.format);
                     if (me.compression) {
                         analysisJobResults.addParameter("compression","gzip");
                     }
                     analysisJobResults.set({
                             "id": me.currentJobId,
                             "oid": downloadAnalysis.get("oid")
                         });
                     console.log(analysisJobResults.url());
                     downloadBtn.attr("href",analysisJobResults.url());
                 })
                 .fail(function(model, response) {
                     console.error("createAnalysisJob failed");
                 });

            return this;
        }
    });

    return View;
}));
