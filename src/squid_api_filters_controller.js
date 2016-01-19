(function (root, factory) {
    root.squid_api.controller.FiltersController = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api) {

    var View = Backbone.View.extend({
        filters : null,
        config : null,
        onChangeHandler : null,
        timeFacetDef : [],

        initialize: function(options) {
            this.config = squid_api.model.config;

            if (this.model) {
                this.filters = this.model;
            } else {
                this.filters = squid_api.model.filters;
            }

            if (options) {
                this.onChangeHandler = options.onChangeHandler;
            }

            // check for new filter selection made by config update
            this.listenTo(this.config, 'change:selection', this.initFilters);
        },

        initFilters : function() {
            var me = this;
            var domainId = this.config.get("domain");
            var projectId = this.config.get("project");

            if (projectId && domainId) {
                var domainPk = {
                        "projectId" : projectId,
                        "domainId" : domainId
                };

                // launch the default filters computation
                var filters = new squid_api.model.FiltersJob();
                filters.set("id", {
                    "projectId": projectId
                });
                filters.set("engineVersion", "2");
                filters.setDomainIds([domainPk]);

                console.log("compute (initFilters)");
                var timeFacets = [];
                $.when(squid_api.controller.facetjob.compute(filters, this.config.get("selection")))
                .always(function() {
                    // update global filters
                    me.filters.set({"domains": filters.get("domains"), "id" : filters.get("id")}, {"silent" : true});
                    // search for time facets
                    var sel = filters.get("selection");
                    if (sel && sel.facets) {
                        var facets = sel.facets;
                        for (var i = 0; i < facets.length; i++) {
                            var facet = facets[i];
                            if (facet.dimension.type === "CONTINUOUS" && facet.dimension.valueType === "DATE") {
                                timeFacets.push(facet);
                            }
                        }
                    }
                    // delegate further processing
                    me.changed(filters.get("selection"), timeFacets);
                });
            } else {
                console.log("WARN : selection changed but project or domain are null");
            }
        },

        /**
         *   responsible providing default behavoir in order to:
         *   1. detecting a time facet to set the config
         *   2. automatically selecting a currently active facet range
         *   3. setting the facet selection
         */
        changed: function(selection, timeFacets) {
            var configPeriod = this.config.get("period");
            var domain = this.config.get("domain");
            var timeFacet = null;
            if (configPeriod && configPeriod[domain]) {
                // pick the time facet corresponding to the selected period
                for (i=0; i<timeFacets.length; i++) {
                    if (configPeriod[domain] === timeFacets[i].id && ! timeFacets[i].error) {
                        timeFacet = timeFacets[i];
                        break;
                    }
                }
            }
            if (!timeFacet) {
                // pick the first time facet
                for (i=0; i<timeFacets.length; i++) {
                    if (timeFacets[i].dimension.valueType === "DATE" && timeFacets[i].dimension.type === "CONTINUOUS"  && ! timeFacets[i].error) {
                        timeFacet = timeFacets[i];
                        break;
                    }
                }
            }
            if (timeFacet) {
                // set period to the selected timefacet
                if (configPeriod) {
                    if (configPeriod[domain]) {
                        if (configPeriod[domain] !== timeFacet.id) {
                            configPeriod[domain] = timeFacet.id;
                        }
                    } else {
                        configPeriod[domain] = timeFacet.id;
                    }
                } else {
                    var obj = {};
                    obj[domain] = timeFacet.id;
                    configPeriod = obj;
                }
                this.config.set("period", configPeriod);
                
                if (this.onChangeHandler) {
                    this.onChangeHandler(selection, timeFacets);
                } else {
                    // defaultBehaviour
                    if (timeFacet.selectedItems.length === 0) {
                        // no date range selected : apply default time selection rules
                        var minDate;
                        var maxDate;
                        if (timeFacet.items.length > 0) {
                            minDate = timeFacet.items[0].lowerBound;
                            maxDate = timeFacet.items[0].upperBound;
                        } else {
                            // if no min and max, arbitrary select a 50 years range
                            minDate = moment().subtract("50", "years").startOf("day").format(squid_api.DATE_FORMAT);
                            maxDate = moment().endOf("day").format(squid_api.DATE_FORMAT);
                        }
                        // select a one month date range
                        timeFacet.selectedItems = [{
                            upperBound : maxDate, 
                            lowerBound : moment(maxDate).subtract("1", "month").format(squid_api.DATE_FORMAT), 
                            type : "i"}];
                        for (ix=0; ix<selection.facets.length; ix++) {
                            if (selection.facets[ix].id === timeFacet.id) {
                                selection.facets[ix] = timeFacet;
                            }
                        }
                        // apply selection to config (will trigger new facet computation)
                        this.config.set("selection", squid_api.utils.buildCleanSelection(selection));
                    } else {
                        this.filters.set("selection", selection);
                    }
                }
            } else {
                this.filters.set("selection", selection);
            }
        },

    });

    return View;
}));
