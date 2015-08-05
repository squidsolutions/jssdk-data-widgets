(function (root, factory) {
    root.squid_api.view.DataExportScheduler = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {
        template : null,
        indexView : null,
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

            this.indexView = squid_api.template.squid_api_export_scheduler_index_view;

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

        events: {
            "click button": function() {
                this.indexModal.open();
            }
        },

        fetchAndRender : function() {
            exportJobs.fetch();
        },

        index: function() {
            var jsonData = {"jobs": []};
            for (i=0; i<exportJobs.models.length; i++) {
                jsonData.jobs.push(exportJobs.models[i].toJSON());
            }
            var indexView = this.indexView(jsonData);
            this.indexModal = new Backbone.BootstrapModal({
                content: indexView,
                title: "Jobs"
            });
        },

        render : function() {
            // static view
            var html = this.template();
            this.$el.html(html);

            // index view
            this.index();
        }
    });

    return View;
}));
