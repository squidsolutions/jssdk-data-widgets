(function (root, factory) {
    root.squid_api.view.Materialize = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        renderTo: null,
        compression : true,
        displayInAccordion : false,
        viewPort : null,
        formats : [{"format" : "csv", "mime-type" : "text/csv", "template" : null}],
        selectedFormatIndex : 0,
        templateData : null,
        displayScripting : true,
        displayCompression : true,
        materializeDatasetsView : false,
        downloadButtonLabel : "Create Your DataFrame",
        popupDialogClass : "squid-api-materialize-panel-popup",

        initialize : function(options) {
            var me = this;

            if (this.model.get("analysis")) {
                this.listenTo(this.model.get("analysis"), 'change', function() {
                    me.render();
                    me.enabled();
                });
                this.listenTo(this.model, 'change:templateData', function() {
                    me.enabled();
                });
                this.listenTo(this.model, 'change:templateData', function() {
                    if(this.materializeDatasetsView === true) {
                        me.refreshViewMaterializeDatasets();
                        me.enabled();
                    }
                });
                this.listenTo(this.model, 'change:enabled', this.enabled);
            } else {
                this.listenTo(this.model, 'change', function() {
                    me.render();
                    me.enabled();
                });
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_materialize_widget;
            }
            if (options.formats) {
                this.formats = options.formats;
            }
            if (options.renderTo) {
                this.renderTo = options.renderTo;
            }
            if (options.displayInAccordion) {
            	this.displayInAccordion = true;
                this.viewPort = this.renderTo;
            } else {
                this.viewPort = this.$el;
            }
            if (options.displayInPopup) {
            	this.displayInPopup = true;
            }
            if (options.materializeDatasetsView) {
                this.materializeDatasetsView = true;
            }
            if (options.downloadButtonLabel) {
            	this.downloadButtonLabel = options.downloadButtonLabel;
            }
            if (options.displayScripting === false) {
                this.displayScripting = false;
            }
            if (options.displayCompression === false) {
                this.displayCompression = false;
            }
            if (options.popupDialogClass) {
                this.popupDialogClass = options.popupDialogClass;
            }

        },

        infomaterialize : function (event) {
            //if ($(this.viewPort).find('.squid-api-materialize-panel-popup')) {
                $(this.viewPort).find('[data-toggle="materialize-tooltip"]').tooltip();
            //}
        },

        infodestination : function (event) {
            //if ($(this.viewPort).find('.squid-api-materialize-panel-popup')) {
            $(this.viewPort).find('[data-toggle="materialize-destination-tooltip"]').tooltip();
            //}
        },



        enabled: function() {
        	var viewPort = this.viewPort;
        	if (this.popup) {
        		viewPort = this.popup;
        	}
        	if (this.model.get("enabled")) {
        		this.$el.find("button").prop("disabled", false);
        		viewPort.find("button#download").prop("disabled", false);
        	} else {
        		this.$el.find("button").prop("disabled", true);
        		viewPort.find("button#download").prop("disabled", true);
        	}
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },

        clickedFormat : function (event) {
            var t = event.target;
            this.selectedFormatIndex = null;
            for (var i=0; i<this.formats.length;i++) {
                if (this.formats[i].format === t.value) {
                    this.selectedFormatIndex = i;
                }
            }
            if(this.materializeDatasetsView === true) {
                this.refreshViewMaterializeDatasets();
            }
        },

        clickedVirtualize : function (event) {
            var t = event.target;
            this.virtualize = (t.checked);
            if(this.materializeDatasetsView === true) {
                this.refreshViewMaterializeDatasets();
            }
        },



        refreshViewMaterializeDatasets : function() {
            var me = this;
            var viewPort = $(me.viewPort);
            if (this.displayInPopup) {
                viewPort = this.popup;
            }
            var analysis = this.model.get("analysis");
            if (!analysis) {
                analysis = this.model;
            }


            // prepare materialize datasets download link
            var downloadBtnD = $(me.viewPort).find("#view-materializedatasets");
            downloadBtnD.addClass("disabled");

            if (analysis.get("id").projectId) {
                var downloadAnalysis = new squid_api.model.InternalanalysisjobModel();
                downloadAnalysis.set(
                    {
                        "name": viewPort.find("#destDomain").val(),
                        "options": {
                            "analysisJob": analysis,
                            "sourceProjectId": analysis.get("id").projectId,
                            "destProjectId": viewPort.find("#destProject").val(),
                            "destSchema": viewPort.find("#destSchema").val()
                        }
                    }
                );
                downloadAnalysis.save();
            }


            //var downloadBtn = viewPort.find("#view-materializedatasets");
            //downloadBtn.attr("href", downloadAnalysis.url());
            //downloadBtn.removeClass("disabled");
        },

        download : function() {
            var me = this;
            var viewPort = $(this.viewPort);
            if (this.displayInPopup) {
            	viewPort = this.popup;
            }
            var analysis = this.model.get("analysis");
            var enabled = this.model.get("enabled");
            if (!analysis) {
                analysis = this.model;
            }
            var downloadBtn = viewPort.find("#download");
            downloadBtn.addClass("disabled");

            if (analysis.get("id").projectId && enabled !== false) {
                var downloadAnalysis = new squid_api.model.ProjectAnalysisJob();
                downloadAnalysis.set(analysis.attributes);
                downloadAnalysis.setParameter("timeout", 10000);
                downloadAnalysis.setParameter("maxResults", 1);
                downloadAnalysis.set("autoRun", false);
                downloadAnalysis.set({
                    "id": {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    }});
                //
                squid_api.controller.analysisjob.createAnalysisJob(downloadAnalysis, analysis.get("selection"))
                .done(function(analysis) {
                    if (analysis.get("limit") || (analysis.get("template"))) {
                        // trigger the analysis computation and wait until it's done (in a loop)
                        squid_api.controller.analysisjob.getAnalysisJobResults(null, analysis).done(function(results) {
                            // get the results
                            me.downloadAnalysisResults(results.get("id"));
                        })
                        .fail(function() {
                            console.error("createAnalysisJob failed");
                            downloadBtn.removeClass("disabled");
                        });
                    } else {
                        // compute and get the results without retrying (streaming way)
                        me.downloadAnalysisResults(analysis.get("id"));
                    }
                })
                .fail(function() {
                    console.error("createAnalysisJob failed");
                    downloadBtn.removeClass("disabled");
                });
            }
        },

        render : function() {
            var me = this;
            var analysis = this.model.get("analysis");
            if (!analysis) {
                analysis = this.model;
            }

            var selectedFormat = this.formats[this.selectedFormatIndex];
            var formatsDisplay = [];
            for (var i=0; i<this.formats.length;i++) {
                formatsDisplay[i] = this.formats[i];
                if (i === this.selectedFormatIndex) {
                    formatsDisplay[i].selected = true;
                }
            }

            if (this.displayInAccordion) {
                this.$el.html("<button type='button' class='btn btn-open-export-panel' data-toggle='collapse' data-target=" + this.renderTo + "> "+ this.downloadButtonLabel + "<span class='glyphicon glyphicon-download-alt'></span></button>");
                var facets = analysis.get("facets");
                var metrics = analysis.get("metrics");
                if ((!facets || facets.length === 0) && (!metrics || metrics.length === 0)) {
                    $("button.btn-open-materialize-panel").prop('disabled', true);
                } else {
                    $("button.btn-open-materialize-panel").prop('disabled', false);
                }
            }

            $(this.viewPort).html(this.template({
                "displayInAccordion" : this.displayInAccordion,
                "downloadButtonLabel" : this.downloadButtonLabel,
                "displayInPopup" : this.displayInPopup,
                "materializeDatasetsView" : this.materializeDatasetsView,
                "data-target" : this.renderTo,
                "formats": formatsDisplay,
                "displayVirtualize" : this.displayVirtualize,
                "virtualize": (this.virtualize),
                "origin": "https://api.squidsolutions.com",
                "customerId" : squid_api.customerId,
                "clientId" : squid_api.clientId,
                "redirectURI":"https://api.squidsolutions.com",
                "apiURL":squid_api.apiURL
                })
            );
            var dfButton = new squid_api.view.DomainSelectorButton({
                el : '#materializebtn'
            });

            dfButton.$el.click(function() {
                dfModal.render();
            });

            var dfCollection = new squid_api.view.BookmarkCollectionManagementWidget({
                onSelect: function() {
                    dfModal.close();
                }
            });

            var dfModal = new squid_api.view.ModalView({
                view : dfCollection
            });


            var projectCollection = new squid_api.view.ProjectCollectionManagementWidget({
                onSelect: function() {
                    projectModal.close();
                }
            });

            var projectModal = new squid_api.view.ModalView({
                view : projectCollection
            });

            var projectButton = new squid_api.view.ProjectSelectorButton({
                el : '#destProject'
            });

            projectButton.$el.click(function() {
                projectModal.render();
            });


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
                    me.currentJobId = downloadAnalysis.get("id");
                })
                .fail(function() {
                    console.error("createAnalysisJob failed");
                });
            }

            $(this.viewPort).find('.squid-api-data-widgets-materialize-widget').mouseover(
                function(event) {
                    me.infomaterialize(event);
                }
            );

            $(this.viewPort).find('#materializedatasets-destination').mouseover(
                function(event) {
                    me.infodestination(event);
                }
            );


            $(this.viewPort).find('[name="format"]').click(
                function(event) {
                    me.clickedFormat(event);
                });
            $(this.viewPort).find('[name="virtualize"]')
            .click(function(event) {
                me.clickedVirtualize(event);
            });

            $(this.viewPort).find("#download").click(function() {
                me.download();
            });
            if(this.materializeDatasetsView === true) {
                $(this.viewPort).find("#view-materializedatasets").click(function () {
                    me.refreshViewMaterializeDatasets();
                });
            }
            if (this.displayInPopup) {
                // remove any existing popups
                $("." + this.popupDialogClass).remove();

                this.popup = this.$el.find(".download-wrapper").dialog({
                    dialogClass: this.popupDialogClass,
                    autoOpen: false,
                    position: {
                        my: "left-70 top", at: "left-70 bottom", of: this.$el.find("button.popup-trigger")
                    },
                    clickOutside: true, // clicking outside the dialog will close it
                    clickOutsideTrigger: this.$el.find("button.popup-trigger"), // Element (id or class) that triggers the dialog opening
                });

                // Click Event for filter panel button
                this.$el.find("button.popup-trigger").click(function() {
                    if (me.popup.dialog("isOpen")) {
                    	me.popup.dialog( "close" );
                    } else {
                    	me.popup.dialog( "open" );
                    }
                });
            }

            return this;
        }
    });

    return View;
}));
