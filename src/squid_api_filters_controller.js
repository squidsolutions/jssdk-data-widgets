(function (root, factory) {
    root.squid_api.controller.FiltersContoller = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api) {

    var View = Backbone.View.extend({
        filters : null,
        config : null,
        onChangeHandler : null,

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
            // check for updated period made by config
            this.listenTo(this.config, 'change:period', this.resetPeriodSelection);
        },

        resetPeriodSelection: function() {
            var selection = this.filters.get("selection");
            var domain = this.config.get("domain");
            var periodConfig = this.config.get("period");
            if (selection) {
                if (selection.facets) {
                    for (i=0; i<selection.facets.length; i++) {
                        if (selection.facets[i].dimension.type === "DATE" && selection.facets[i].id !== periodConfig[domain]) {
                            selection.facets.splice(i, 1);
                        }
                    }
                    this.config.set("selection", selection);
                }
            }
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
                $.when(squid_api.controller.facetjob.compute(filters, this.config.get("selection")))
                .then(function() {
                    // search for time facets and make such they are done
                    var timeFacets = [];
                    var timeFacetDef = [];
                    var sel = filters.get("selection");
                    if (sel && sel.facets) {
                        var facets = sel.facets;
                        for (var i = 0; i < facets.length; i++) {
                            var facet = facets[i];
                            if (facet.dimension.valueType === "DATE") {
                                if (facet.done === false) {
                                    // schedule a new facet members computation
                                    var computation = squid_api.controller.facetjob.getFacetMembers(filters, facet.id);
                                    timeFacetDef.push(computation);
                                } else {
                                    timeFacets.push(facet);
                                }
                            }
                        }
                    }
                    if (timeFacetDef.length > 0) {
                            console.log("retrieving time facets members");
                            $.when.apply($, timeFacetDef).always(function() {
                                timeFacets.concat(arguments);
                                me.changed(filters.get("selection"), timeFacets);
                            });
                    } else {
                        me.changed(filters.get("selection"), timeFacets);
                    }
                });
            }
        },

        defaultBehaviour: function(selection, timeFacets) {
            var configPeriod = this.config.get("period");
            var domain = this.config.get("domain");
            var timeFacet = false;
            if (configPeriod) {
                if (configPeriod[domain]) {
                    for (i=0; i<timeFacets.length; i++) {
                        if (configPeriod[domain] === timeFacets[i].oid) {
                            timeFacet = timeFacets[i];
                        }
                        break;
                    }
                }
            }
            if (!timeFacet) {
                for (i=0; i<timeFacets.length; i++) {
                    timeFacet = timeFacets[i];
                    break;
                }
            }
            if (timeFacet) {
                // set config period
                if (! configPeriod) {
                    var obj = {};
                    obj[domain] = timeFacet.id;
                    this.config.set("period", obj);
                } else {
                    configPeriod[domain] = timeFacet.id;
                    this.config.set("period", configPeriod);
                }
                // set selectedItems
                if (timeFacet.selectedItems.length === 0) {
                    var minDate;
                    var maxDate;
                    // detect mix & max
                    if (timeFacet.items.length > 0) {
                        minDate = timeFacet.items[0].lowerBound;
                        maxDate = timeFacet.items[0].upperBound;
                    } else {
                        minDate = moment().subtract("50", "years").format(squid_api.DATE_FORMAT);
                        maxDate = moment().format(squid_api.DATE_FORMAT);
                    }
                    // set timeFacet selected Items
                    timeFacet.selectedItems = [{upperBound : maxDate, lowerBound : moment(maxDate).subtract("1", "month").format(squid_api.DATE_FORMAT), type : "i"}];
                    // update selection
                    for (ix=0; ix<selection.facets.length; ix++) {
                        if (selection.facets[ix].id === timeFacet.id) {
                            selection.facets[ix] = timeFacet;
                        }
                    }
                    // set selection in config
                    this.config.set("selection", squid_api.utils.buildCleanSelection(selection));
                } else {
                    this.filters.set("selection", selection);
                }
            } else {
                this.filters.set("selection", selection);
            }
        },

        changed : function(selection, timeFacets) {
            if (this.onChangeHandler) {
                this.onChangeHandler(selection, timeFacets);
            } else {
                this.defaultBehaviour(selection, timeFacets);
            }
        }

    });

    return View;
}));
