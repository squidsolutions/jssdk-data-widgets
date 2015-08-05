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

        renderIndex: function() {
            var me = this;
            var indexView = Backbone.View.extend({
                model: exportJobs,
                initialize: function() {
                    this.template = squid_api.template.squid_api_export_scheduler_index_view;
                    this.render();
                },
                events: {
                    "click .create-job": function() {
                        me.renderForm();
                    },
                    "click .edit-job": function(event) {
                        var id = $(event.target).parents(".job-item").attr("data-attr");
                        me.renderForm(id);
                    },
                    "click .delete-job": function(event) {
                        // TODO
                    }
                },
                render: function() {
                    var jsonData = {"jobs": []};
                    for (i=0; i<this.model.models.length; i++) {
                        jsonData.jobs.push(this.model.models[i].toJSON());
                    }
                    this.$el.html(this.template(jsonData));
                    return this;
                }
            });
            this.indexModal = new Backbone.BootstrapModal({
                content: new indexView(),
                title: "Jobs"
            });
        },

        getSchema: function() {
            var dfd = $.Deferred();
            $.ajax({
                url: this.schedulerApiUri + "/Schema/?access_token=" + squid_api.model.login.get("accessToken"),
            }).done(function( schema ) {
                dfd.resolve(schema);
            });
            return dfd.promise();
        },

        renderForm: function(id) {
            this.getSchema().then(function(schema) {
                var me = this;
                if (id) {
                    model = exportJobs.where({"_id" : id})[0];
                } else {
                    model = new exportJobModel();
                }

                // modify schema for BackBone form
                for (var x in schema) {
                    schema[x].editorClass = "form-control";
                }

                this.formContent = new Backbone.Form({
                    schema: schema,
                    model: model
                }).render();
                var formView = Backbone.View.extend({
                    initialize: function() {
                        this.render();
                    },
                    events: {

                    },
                    render: function() {
                        this.$el.html(me.formContent.el);
                        return this;
                    }
                });
                var formModal = new Backbone.BootstrapModal({
                    content: new formView(),
                    title: "Jobs Form"
                }).open();
            });
        },

        render : function() {
            // static view
            var html = this.template();
            this.$el.html(html);

            // index view
            this.renderIndex();
        }
    });

    return View;
}));
