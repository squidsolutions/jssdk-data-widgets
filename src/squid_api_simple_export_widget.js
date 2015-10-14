(function (root, factory) {
    root.squid_api.view.SimpleDataExport = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        exportTemplate : null,
        downloadStatus : 0,
        currentJobId : null,
        analysis : null,
        
        initialize : function(options) {
            if (this.model) {
                this.analysis = this.model.get("analysis");
                this.listenTo(this.analysis, 'change', this.render);
                this.listenTo(this.model, 'change:templateData', this.render);
                this.listenTo(this.model, "change:enabled", this.setDownloadBtnState);
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            }
            
            this.exportTemplate = app.template[options.exportTemplate];
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },

        setDownloadBtnState : function() {
            // Loop through passed model to see if any false values exist
            var disabled = this.model.get("enabled") === false;
            var downloadBtn = this.$el.find("#download");
            if (disabled) {
                downloadBtn.addClass("disabled");
            } else {
                downloadBtn.removeClass("disabled");
            }
        },
        
        render : function() {
            
            var me = this;
            var analysis = this.analysis;
                         
             // prepare download link
             this.downloadStatus = 1;
             var downloadBtn = this.$el.find("#download");
             downloadBtn.addClass("disabled");
             
             if (analysis.get("id").projectId) {
                 var downloadAnalysis = new squid_api.model.ProjectAnalysisJob();
                 downloadAnalysis.set(analysis.attributes);
                 downloadAnalysis.set({
                     "id": {
                         "projectId": analysis.get("id").projectId,
                         "analysisJobId": null
                     },
                     "autoRun": false});
                 squid_api.controller.analysisjob.createAnalysisJob(downloadAnalysis, analysis.get("selection"))
                 .done(function() {
                     me.downloadStatus = 2;
                     me.currentJobId = downloadAnalysis.get("id");
                     // create download link
                     var analysisJobResults = new squid_api.model.ProjectAnalysisJobRender();
                     analysisJobResults.addParameter("format",me.format);
                     if (me.compression) {
                         analysisJobResults.addParameter("compression","gzip");
                     }
     
                     // build the template
                     var velocityTemplate = me.exportTemplate(me.model.get("templateData"));
                     analysisJobResults.setParameter("template", base64.encode(velocityTemplate));
                     analysisJobResults.setParameter("type","text/html");
                     analysisJobResults.setParameter("timeout",null);
                             
                     analysisJobResults.set({
                         "id": me.currentJobId,
                         "oid": downloadAnalysis.get("oid")
                     });
                     console.log("download url : "+analysisJobResults.url());
                     var downloadBtn = me.$el.find("#download");
                     downloadBtn.attr("href",analysisJobResults.url());
                     me.setDownloadBtnState();

                 })
                 .fail(function() {
                     console.error("createAnalysisJob failed");
                     me.setDownloadBtnState();
                 });
            }

            return this;
        }
    });

    return View;
}));
