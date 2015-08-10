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
                urlRoot : this.schedulerApiUri + "/jobs",
                idAttribute: "_id",
                url: function() {
                  var base =
                    _.result(this, 'urlRoot') ||
                    _.result(this.collection, 'url') ||
                    urlError();
                    if (this.isNew()) return base+"?access_token=" + squid_api.model.login.get("accessToken");
                    var id = this.get(this.idAttribute);
                    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id)+"?access_token=" + squid_api.model.login.get("accessToken");
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
            this.render();
        },

        events: {
            "click button" : "renderIndex"
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
                    this.listenTo(exportJobs, "reset change remove sync", this.render);
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
                    "click .run-job": function(event) {
                        var id = $(event.target).parents(".job-item").attr("data-attr");
                        var url = me.schedulerApiUri + "/jobs/" + id + "?run=1&access_token=" + squid_api.model.login.get("accessToken");
                        $.ajax({
                            method: "GET",
                            url: url,
                        });
                    },
                    "click .delete-job": function(event) {
                        // TODO this.model.delete();
                        var id = $(event.target).parents(".job-item").attr("data-attr");
                        var mmm = exportJobs.get(id);
                        mmm.destroy();
                        exportJobs.remove(mmm);
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
            }).open();
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
                    /*if(x=="emails"){
                      schema[x].validators = ['required', 'email'];
                    }*/
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


                formModal.on('ok', function (event) {
                  // the form is used in create and edit mode.
                  var values = me.formContent.getValue();
                  if(id){
                    // EDIT aka PUT /jobs/:id
                    var m = exportJobs.get(id);
                    m.set(values);
                    m.save();
                    alert("Job updated");

                  } else{
                    // CREATE aka POST /jobs/
                    var mm = new exportJobModel(values);
                    mm.save();
                    exportJobs.add(mm);
                    alert("Job created");
                  }

                  //if (!isValid) formModal.preventClose();
                  //formModal.content.saveForm();
                  //me.formContent.model.set(JSON.stringify(values));
                  //me.formContent.model.save();
                  //me.exportJobModel.fetch({data: JSON.stringify(values), type='POST'});
                  /*for (var val in values){
                    alert(val);
                  }*/
                });

            });
        },

        render : function() {
            // static view
            var html = this.template();
            this.$el.html(html);
        }
    });

    return View;
}));
