(function (root, factory) {
    root.squid_api.view.DataExport = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        renderTo: null,
        compression : true,
        curlCollapsed : true,
        displayInAccordion : false,
        viewPort : null,
        formats : [{"format" : "csv", "mime-type" : "text/csv", "template" : null}],
        selectedFormatIndex : 0,
        templateData : null,
        displayScripting : true,
        displayCompression : true,
        downloadButtonLabel : "Download your data",

        initialize : function(options) {
            if (this.model.get("analysis")) {
                this.listenTo(this.model.get("analysis"), 'change', this.render);
                this.listenTo(this.model, 'change:templateData', this.refreshViewSqlUrl);
                this.listenTo(this.model, 'change:enabled', this.enabled);
            } else {
                this.listenTo(this.model, 'change', this.render);
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_export_widget;
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
            if (options.sqlView) {
            	this.sqlView = true;
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
            this.refreshViewSqlUrl();
        },

        clickedCompression : function (event) {
            var t = event.target;
            this.compression = (t.checked);
            this.refreshViewSqlUrl();
        },

        downloadAnalysisResults : function(currentJobId) {
            var me = this;
            var viewPort = $(me.viewPort);
            if (this.popup) {
            	viewPort = this.popup;
            }
            
            // create download link
            var analysisJobResults;
            var selectedFormat = this.formats[this.selectedFormatIndex];
            var velocityTemplate;
            var postMethod;
            var downloadBtn = viewPort.find("#download");
            var downloadForm = viewPort.find("#download-form");
            
            if (!selectedFormat.template) {
                // use getResults method
                analysisJobResults = new squid_api.model.ProjectAnalysisJobResult();
                analysisJobResults.addParameter("format",selectedFormat.format);
                postMethod = "GET";
            } else {
                // use render method
                analysisJobResults = new squid_api.model.ProjectAnalysisJobRender({"format" : selectedFormat.format});
                analysisJobResults.setParameter("type", selectedFormat.type);
                analysisJobResults.setParameter("timeout", null);
                // build the template
                
                if (selectedFormat.format === "xml") {
                    if (me.model.get("templateData").options.xmlType) {
                        velocityTemplate = selectedFormat.template[me.model.get("templateData").options.xmlType](me.model.get("templateData"));
                    } else {
                        velocityTemplate = selectedFormat.template(me.model.get("templateData"));
                    }
                } else {
                    velocityTemplate = selectedFormat.template(me.model.get("templateData"));
                }
                postMethod = "POST";
            }
            if (me.compression) {
                analysisJobResults.addParameter("compression","gzip");
            } else {
                analysisJobResults.addParameter("compression","none");
            }
            analysisJobResults.set({
                "id": currentJobId,
                "oid": currentJobId.oid
            });
            
            downloadBtn.removeClass("disabled");
            
            downloadForm.attr("action",analysisJobResults.url());
            downloadForm.attr("method",postMethod);
            downloadForm.empty();
            downloadForm.append("<input type='hidden' name='access_token' value='"+analysisJobResults.getParameter("access_token")+"'/>");
            downloadForm.append("<input type='hidden' name='compression' value='"+analysisJobResults.getParameter("compression")+"'/>");
            if (velocityTemplate) {
                downloadForm.append("<input type='hidden' name='template' value='"+base64.encode(velocityTemplate)+"'/>");
            }
            if (analysisJobResults.getParameter("type")) {
                downloadForm.append("<input type='hidden' name='type' value='"+analysisJobResults.getParameter("type")+"'/>");
            }
            if (analysisJobResults.getParameter("format")) {
                downloadForm.append("<input type='hidden' name='format' value='"+analysisJobResults.getParameter("format")+"'/>");
            }
            if (analysisJobResults.getParameter("timeout")) {
                downloadForm.append("<input type='hidden' name='timeout' value='"+analysisJobResults.getParameter("timeout")+"'/>");
            }
            downloadForm.submit();
        },

        refreshViewSqlUrl : function() {
            var me = this;
            var viewPort = $(me.viewPort);
            if (this.displayInPopup) {
            	viewPort = this.popup;
            }
            if (me.currentJobId) {
                // create download link
                var analysisJobResults;
                var selectedFormat = this.formats[this.selectedFormatIndex];
                // use getResults method
                analysisJobResults = new squid_api.model.ProjectAnalysisJobViewSQL();
                analysisJobResults.addParameter("format",selectedFormat.format);
                analysisJobResults.set({
                    "id": me.currentJobId,
                    "oid": me.currentJobId.oid
                });
                var downloadBtn = viewPort.find("#view-sql");
                downloadBtn.attr("href",analysisJobResults.url());
                downloadBtn.removeClass("disabled");
            }
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
                downloadAnalysis.set({
                    "id": {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    }});
                // trigger the analysis computation and wait until it's done (or times out)
                squid_api.controller.analysisjob.createAnalysisJob(downloadAnalysis, analysis.get("selection"))
                .done(function(analysis) {
                    if (analysis.get("status") === "DONE") {
                        // get the results
                        me.downloadAnalysisResults(analysis.get("id"));
                    } else {
                        // analysis timed out, retry (in a loop)
                        squid_api.controller.analysisjob.getAnalysisJobResults(null, analysis).done(function(results) {
                            // get the results
                            me.downloadAnalysisResults(results.get("id"));
                        })
                        .fail(function() {
                            console.error("createAnalysisJob failed");
                            downloadBtn.removeClass("disabled");
                        });
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
                    $("button.btn-open-export-panel").prop('disabled', true);
                } else {
                    $("button.btn-open-export-panel").prop('disabled', false);
                }
            }

            var data, curl, curlFileName;
            if (me.displayScripting !== false) {
                // render the curl snippet
                var exportAnalysis = new squid_api.model.ProjectAnalysisJob();
                exportAnalysis.addParameter("format", this.formats[this.selectedFormatIndex].format);
                if (this.compression) {
                    exportAnalysis.addParameter("compression","gzip");
                }
                exportAnalysis.addParameter("access_token","[access_token]");
                exportAnalysis.set(analysis.attributes);
                exportAnalysis.set(
                   "id", {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    });

                // escape all spaces in the json injected into cURL
                data = JSON.stringify(exportAnalysis).replace(/\'/g, '\\\'');
                curlFileName = "analysis";
                if (selectedFormat.format) {
                    curlFileName += "."+selectedFormat.format;
                }
                if (this.compression) {
                    curlFileName += ".gz";
                }
                curl = exportAnalysis.url().replace(/\[access_token\]/g, '<b>[access_token]</b>');
            }

            $(this.viewPort).html(this.template({
                "displayInAccordion" : this.displayInAccordion,
                "downloadButtonLabel" : this.downloadButtonLabel,
                "displayInPopup" : this.displayInPopup,
                "sqlView" : this.sqlView,
                "data-target" : this.renderTo,
                "formats": formatsDisplay,
                "displayCompression" : this.displayCompression,
                "compression": (this.compression),
                "curl": curl,
                "curlFileName" : curlFileName,
                "origin": "https://api.squidsolutions.com",
                "data": data,
                "customerId" : squid_api.customerId,
                "clientId" : squid_api.clientId,
                "redirectURI":"https://api.squidsolutions.com",
                "apiURL":squid_api.apiURL
                })
            );

            // prepare download link
            this.downloadStatus = 1;
            var downloadBtn = $(me.viewPort).find("#view-sql");
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
                    me.refreshViewSqlUrl();
                })
                .fail(function() {
                    console.error("createAnalysisJob failed");
                });
            }

            // apply cURL panel state
            if (me.curlCollapsed) {
                $(this.viewPort).find('#curl').hide();
            } else {
                $(this.viewPort).find('#curl').show();
            }

            // Click Handlers
            $(this.viewPort).find("#curlbtn").click(function() {
            	var viewPort = $(me.viewPort);
            	if (me.displayInPopup) {
            		viewPort = me.popup;
            	}
            		
                me.curlCollapsed = !me.curlCollapsed;
                if (me.curlCollapsed) {
                	viewPort.find('#curl').fadeOut();
                } else {
                	viewPort.find('#curl').fadeIn();
                }
            });

            $(this.viewPort).find('[name="format"]').click(
                function(event) {
                    me.clickedFormat(event);
                });
            $(this.viewPort).find('[name="compression"]')
            .click(function(event) {
                me.clickedCompression(event);
            });
            
            $(this.viewPort).find("#download").click(function() {
                me.download();
            });
            
            if (this.displayInPopup) {
            	this.popup = this.$el.find(".download-wrapper").dialog({
                    dialogClass: "squid-api-export-panel-popup",
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
