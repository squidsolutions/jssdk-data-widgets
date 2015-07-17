(function (root, factory) {
    root.squid_api.view.DataExportScheduler = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {
        template : null,
        exportJobModel : null,
        exportJobCollection : null,
        schedulerApiUri : null,
        exportJobs : null,
        
        initialize : function(options) {
            // setup options
            if (options) {
                if (options.template) {
                    this.template = options.template;
                } else {
                    this.template = squid_api.template.squid_api_export_scheduler_widget;
                }
                if (options.schedulerApiUri) {
                    this.schedulerApiUri = options.schedulerApiUri;
                }
            }
            
            exportJobModel = Backbone.Model.extend({
                urlRoot : this.schedulerApiUri,
                url: function() {
                    var url = this.urlRoot + "/jobs/" + this.get("id");
                    url = url + "?access_token=" + squid_api.model.login.get("accessToken");
                    return url;
                }
            });
            
            exportJobCollection = Backbone.Collection.extend({
                model: exportJobModel,
                urlRoot : this.schedulerApiUri,
                url: function() {
                    var url = this.urlRoot + "/jobs/";
                    url = url + "?access_token=" + squid_api.model.login.get("accessToken");
                    return url;
                }
            });

            exportJobs = new exportJobCollection();
            

            // listeners
            this.listenTo(squid_api.model.login, "change:accessToken", this.fetchAndRender);
            this.listenTo(exportJobs, "reset change remove sync", this.render);
            
        },
        
        fetchAndRender : function() {
            exportJobs.fetch();
        },
        
        render : function() {
            var jsonData = {"jobs" : exportJobs};
            this.html = this.template(jsonData);
            this.$el.html(this.html);
        }
    
    
    
    });
    
    return View;
}));