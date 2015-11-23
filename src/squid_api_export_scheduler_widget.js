(function (root, factory) {
    root.squid_api.view.DataExportScheduler = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend({
        template: null,
        IndexView: null,
        ExportJobModel: null,
        modalElementClassName : "squid-api-admin-widgets-export-scheduler",
        ExportJobCollection: null,
        schedulerApiUri: null,
        exportJobs: null,
        hiddenFields: null,
        widgetAccessible: false,

        initialize: function (options) {
            widget = this;

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
                if (options.hiddenFields) {
                    this.hiddenFields = options.hiddenFields;
                }
                if (options.reports) {
                    this.reports = options.reports.get("items");
                }
                if (options.modalElementClassName) {
                	this.modalElementClassName = options.modalElementClassName;
                }
                if (options.status) {
                    this.status = options.status;
                } else {
                    this.status = squid_api.model.status;
                }
            }

            this.IndexView = squid_api.template.squid_api_export_scheduler_index_view;

            ExportJobModel = Backbone.DeepModel.extend({
                urlRoot: this.schedulerApiUri + "/jobs",
                idAttribute: "_id",
                url: function () {
                    var base =
                        _.result(this, 'urlRoot') ||
                        _.result(this.collection, 'url') ||
                        urlError();
                    if (this.isNew()) {
                        return base + "?access_token=" + squid_api.model.login.get("accessToken");
                    }
                    var id = this.get(this.idAttribute);
                    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id) + "?access_token=" + squid_api.model.login.get("accessToken");
                }
            });

            ExportJobCollection = Backbone.Collection.extend({
                model: ExportJobModel,
                urlRoot: this.schedulerApiUri,
                url: function () {
                    var url = this.urlRoot + "/jobs/";
                    url = url + "?access_token=" + squid_api.model.login.get("accessToken");
                    return url;
                }
            });

            exportJobs = new ExportJobCollection();

            // listeners
            this.listenTo(squid_api.model.login, "change:accessToken", this.fetchAndRender);
            this.listenTo(exportJobs, 'change reset sync', this.render);
        },

        events: {
            "click button": "renderIndex"
        },

        fetchAndRender: function () {
            exportJobs.fetch({
                success: function (collection, response) {
                    if (response.statusCode === 200) {
                        widget.widgetAccessible = true;
                    } else {
                        widget.widgetAccessible = false;
                    }
                },
                error: function () {
                    widget.widgetAccessible = false;
                }
            });
        },

        closeModal : function(modal) {
        	modal.close();
        	modal.remove();
        },

        renderIndex: function () {
            var me = this;
            var IndexView = Backbone.View.extend({
                model: exportJobs,
                initialize: function () {
                    this.template = squid_api.template.squid_api_export_scheduler_index_view;
                    this.listenTo(exportJobs, "reset change remove sync", this.render);
                },
                events: {
                    "click .create-job": function () {
                        widget.renderForm();
                    },
                    "click .edit-job": function (event) {
                        var id = $(event.target).parents(".job-item").attr("data-attr");
                        widget.renderForm(id);
                    },
                    "click .run-job": function (event) {
                        var id = $(event.target).parents(".job-item").attr("data-attr");
                        var url = me.schedulerApiUri + "/jobs/" + id + "?run=1&access_token=" + squid_api.model.login.get("accessToken");
                        $.ajax({
                            method: "GET",
                            url: url
                        });
                        me.status.set("message", "you have manually triggered a job to run");
                    },
                    "click .delete-job": function (event) {
                        var id = $(event.target).parents(".job-item").attr("data-attr");
                        var job = exportJobs.get(id);
                        job.destroy({
                            success: function () {
                                me.status.set("message", "job successfully deleted");
                            }
                        });
                        exportJobs.remove(job);
                    }
                },

                render: function () {
                    var jsonData = {"jobs": []};
                    for (var i = 0; i < this.model.models.length; i++) {
                        for (ix = 0; ix < me.reports.length; ix++) {
                            if (me.reports[ix].oid === this.model.models[i].get("shortcutId")) {
                                this.model.models[i].set("reportName", me.reports[ix].name);
                            }
                        }
                        // format jsonData
                        var job = this.model.models[i].toJSON();
                        if (job.nextExecutionDate) {
                            job.nextExecutionDate = moment(job.nextExecutionDate).format("DD-MM-YYYY");
                        }
                        jsonData.jobs.push(job);
                    }
                    this.$el.html(this.template(jsonData));

                    this.$el.find(".table").DataTable({
                        paging: false
                    });

                    return this;
                }
            });

            this.indexModal = new Backbone.BootstrapModal({
                content: new IndexView(),
                title: "Scheduled Usage Reports"
            }).open();

            // modal wrapper class
            $(this.indexModal.el).addClass(this.modalElementClassName);

            /* bootstrap doesn't remove modal from dom when clicking outside of it.
            Check to make sure it has been removed whenever it isn't displayed.
             */
            if (me.indexModal.el) {
            	$(me.indexModal.el).one('hidden.bs.modal', function () {
                    me.closeModal(me.indexModal);
                });
                $(me.indexModal.el).find(".close").one("click", function() {
                    $(me.indexModal.el).trigger("hidden.bs.modal");
                });
                $(me.indexModal.el).find(".cancel").one("click", function() {
                    $(me.indexModal.el).trigger("hidden.bs.modal");
                });
            }
        },

        getSchema: function () {
            return $.ajax({
                url: this.schedulerApiUri + "/Schema/?access_token=" + squid_api.model.login.get("accessToken"),
            });
        },

        renderForm: function (id) {
        	var me = this;
            this.getSchema().then(function (data) {
                var modalHeader;
                if (id) {
                    model = exportJobs.where({"_id": id})[0];
                    modalHeader = model.get("reportName") + " scheduled usage report";
                } else {
                    model = new ExportJobModel();

                    var reportId = config.get("report");
                    var reportName;
                    for (i = 0; i < widget.reports.length; i++) {
                        if (widget.reports[i].oid === reportId) {
                            reportName = widget.reports[i].name;
                        }
                    }
                    modalHeader = "schedule a usage report for " + reportName;
                }
                // construct schema ignoring hidden fields
                var schema = {};
                for (var x in data) {
                    if (widget.hiddenFields.indexOf(x) === -1) {
                        schema[x] = {};
                        schema[x].editorClass = "form-control";
                        if ((typeof data[x].options.title !== 'undefined')) {
                            schema[x].title = data[x].options.title;
                        }
                        if (data[x].instance === "Date") {
                            schema[x].type = "Date";
                        } else if (data[x].instance === "Array") {
                            schema[x].type = "List";
                            schema[x].itemType = "Text";
                        } else {
                            if (data[x].enumValues) {
                                schema[x].type = "Select";
                                schema[x].options = data[x].enumValues;
                            } else if (data[x].options.enum) {
                                schema[x].type = "Select";
                                schema[x].options = data[x].options.enum;
                            } else {
                                schema[x].type = "Text";
                            }
                        }
                    }
                }

                widget.formContent = new Backbone.Form({
                    schema: schema,
                    model: model
                });

                var FormView = Backbone.View.extend({
                    initialize: function () {
                        this.render();
                    },
                    render: function () {
                        this.$el.html(widget.formContent.render().el);
                        return this;
                    }
                });

                var formModal = new Backbone.BootstrapModal({
                    content: new FormView(),
                    title: modalHeader
                }).open();

                /* bootstrap doesn't remove modal from dom when clicking outside of it.
                Check to make sure it has been removed whenever it isn't displayed.
                 */
                 $(formModal.el).one('hidden.bs.modal', function () {
                     me.closeModal(formModal);
                 });
                 $(formModal.el).find(".close").one("click", function() {
                     $(formModal.el).trigger("hidden.bs.modal");
                 });
                 $(formModal.el).find(".cancel").one("click", function() {
                     $(formModal.el).trigger("hidden.bs.modal");
                 });

                formModal.on('ok', function () {
                    // the form is used in create and edit mode.
                    var values = widget.formContent.getValue();

                    // manipulate data
                    values.customerId = squid_api.model.customer.get("id");
                    values.userId = squid_api.model.login.get("userId");

                    var emails = widget.formContent.getValue().emails; //Return an array with [old,values,new,values]
                    // if length == 1 then new job
                    // if lenght == 0 then I should keep the last one entered
                    if (emails.length >1) {
                        // Take the new values assuming no deletion
                        emails = widget.formContent.getValue().emails.slice((((widget.formContent.getValue().emails.length - 1) / 2) + 1), widget.formContent.getValue().emails.length);
                        // computing the separator old new values using the first old value.
                        if (widget.formContent.getValue().emails.lastIndexOf(widget.formContent.getValue().emails[0]) > 0) {
                            emails = widget.formContent.getValue().emails.slice(widget.formContent.getValue().emails.lastIndexOf(widget.formContent.getValue().emails[0]), widget.formContent.getValue().emails.length);
                        }
                    }
                    values.emails = emails;

                    if (id) {
                        // EDIT aka PUT /jobs/:id
                        var job = exportJobs.get(id);
                        job.attributes.emails = values.emails;
                        job.set(values);
                        job.save({}, {
                            success: function() {
                                var msg = "";
                                if (model.get("errors")) {
                                    var errors = model.get("errors");
                                    for (var x in errors) {
                                        if (errors[x].message) {
                                            msg = msg + errors[x].message + "";
                                        }
                                    }
                                } else {
                                    exportJobs.add(model);
                                    $(formModal.el).trigger("hidden.bs.modal");
                                    msg = msg + "job successfully modified";
                                }
                                me.status.set("message", msg);
                            }
                        });
                    } else {
                        // CREATE aka POST /jobs/

                        // TODO use squid_api.model.config instead
                        values.state = squid_api.model.state;

                        // Getting the accountID (shared code with PQ Counter)
                        var accountID = 0;
                        var facets = squid_api.model.state.attributes.config.selection.facets;
                        for (var i = 0; i < facets.length; i++) {
                            var check = facets[i].id.indexOf("@'shipto_account_name'", facets[i].id.length - "@'shipto_account_name'".length);
                            if (check !== -1) {
                                if (facets[i] && facets[i].selectedItems && facets[i].selectedItems.length === 1) {
                                    var selection = facets[i].selectedItems[0];
                                    if (selection.attributes && selection.attributes.ID) {
                                        accountID = selection.attributes.ID;
                                    }
                                }
                            }
                        }
                        values.accountID = accountID;
                        values.reportId = squid_api.model.state.attributes.config.report;

                        var newJob = new ExportJobModel(values);
                        newJob.save({}, {
                            success: function (model) {
                                var msg = "";

                                if (model.get("errors")) {
                                    var errors = model.get("errors");
                                    for (var x in errors) {
                                        if (errors[x].message) {
                                            msg = msg + errors[x].message + "";
                                        }
                                    }
                                } else {
                                    exportJobs.add(model);
                                    $(formModal.el).trigger("hidden.bs.modal");
                                    msg = msg + "job successfully saved";
                                }
                                me.status.set("message", msg);
                            }
                        });
                    }
                });

            });
        },

        render: function () {
            var html = this.template();
            this.$el.html(html);

            // activate / disactivate button
            if (this.widgetAccessible) {
                this.$el.find("button").prop("visibility", 'visible');
            } else {
                this.$el.find("button").prop("visibility", 'hidden');
            }
        }
    });

    return View;
}));
