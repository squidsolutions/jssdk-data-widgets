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
                    // search for time facets and make such they are done
                    var timeFacets = [];
                    var timeFacetDef = [];
                    var sel = filters.get("selection");
                    if (sel && sel.facets) {
                        var facets = sel.facets;
                        for (var i = 0; i < facets.length; i++) {
                            var facet = facets[i];
                            if (facet.dimension.valueType === "DATE" && ! me.config.get("period")) {
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

        changed : function(selection, timeFacets) {
            if (this.onChangeHandler) {
                this.onChangeHandler(selection, timeFacets);
            } else {
                // default behavior
                this.filters.set("selection", selection);
            }
        }

    });

    return View;
}));
