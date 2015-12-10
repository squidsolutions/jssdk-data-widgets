(function (root, factory) {
    root.squid_api.controller.FiltersContoller = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api) {

    var View = Backbone.View.extend({
        filters : null,
        config : null,
        onChangeHandler : null,

        initialize: function(options) {
            if (this.model) {
                this.filters = this.model;
            } else {
                this.filters = squid_api.model.filters;
            }

            if (options) {
                // setup options
                if (options.config) {
                    this.config = options.config;
                }
                this.onChangeHandler = options.onChangeHandler;
            }

            if (!this.config) {
                this.config = squid_api.model.config;
            }

            // check for new filter selection made by config update
            this.listenTo(this.config, 'change:selection', function() {
                this.initFilters(this.config);
            });
        },

        initFilters : function(config) {
            var me = this;
            var domainId = config.get("domain");
            var projectId = config.get("project");

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
                $.when(squid_api.controller.facetjob.compute(filters, config.get("selection")))
                .then(function() {
                    // search for a time facet
                    var timeFacet;
                    var sel = filters.get("selection");
                    if (sel && sel.facets) {
                        var facets = sel.facets;
                        for (var i = 0; i < facets.length; i++) {
                            var facet = facets[i];
                            if (facet.dimension.valueType === "DATE" && ! me.config.get("period")) {
                                timeFacet = facet;
                            }
                        }
                    }
                    if (timeFacet) {
                        if (timeFacet.done === false) {
                            console.log("retrieving time facet's members");
                            $.when(squid_api.controller.facetjob.getFacetMembers(filters, timeFacet.id))
                            .always(function() {
                                console.log("time facet dimension = "+timeFacet.dimension.name);
                                me.changed(filters.get("selection"), timeFacet);
                            });
                        } else {
                            me.changed(filters.get("selection"), timeFacet);
                        }
                    } else {
                        console.log("WARN: cannot use any time dimension to use for datepicker");
                        me.changed(filters.get("selection"), null);
                    }
                });
            }
        },

        changed : function(selection, timeFacet) {
            if (this.onChangeHandler) {
                this.onChangeHandler(selection, timeFacet);
            } else {
                // default behavior
                this.filters.set("selection", selection);
            }
        }

    });

    return View;
}));
