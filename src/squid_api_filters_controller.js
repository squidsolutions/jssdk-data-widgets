(function (root, factory) {
    root.squid_api.controller.FiltersContoller = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api) {

    var View = Backbone.View.extend({
        filters : null,
        config : null,
        onChangeHandler : null,

        initialize: function(options) {

            var me = this;

            // setup options

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

            // controller

            var filters = this.filters;

            // check for new filter selection made by user
            this.listenTo(filters, 'change:userSelection', function() {
                console.log("compute (change:userSelection)");
                squid_api.controller.facetjob.compute(filters, filters.get("userSelection"));
            });
            
            // check for new filter selection made by config update
            this.listenTo(this.config, 'change:selection', function() {
                console.log("compute (change:selection)");
                // make sure the domain of filters is set
                if (me.config.get("domain")) {
                    var id = filters.get("id");
                    if (id) {
                        filters.set("id" , {
                            "projectId" : id.projectId,
                            "facetjobId" : null
                            });
                        filters.setDomainIds([{
                            "projectId" : id.projectId,
                            "domainId" : me.config.get("domain")
                        }]);
                    }
                }
                squid_api.controller.facetjob.compute(filters, me.config.get("selection"));
            });

            // update config if filters have changed
            this.listenTo(filters, 'change:selection', function(filters) {
                me.config.set("selection", squid_api.utils.buildCleanSelection(filters.get("selection")));
            });

            // check for domain change performed
            this.listenTo(this.config, 'change:domain', function(config) {
                if (config.get("domain")) {
                    var id = filters.get("id");
                    if (id) {
                        filters.set("id" , {
                            "projectId" : id.projectId,
                            "facetjobId" : null
                            });
                        filters.setDomainIds([{
                            "projectId" : id.projectId,
                            "domainId" : config.get("domain")
                        }]);
                    }
                    me.initFilters(config);
                }
            });

            // check for project change performed
            this.listenTo(this.config, 'change:project', function(config) {
                var id = filters.get("id");
                if (id) {
                    filters.set("id" , {
                        "projectId" : config.get("project"),
                        "facetjobId" : null
                        });
                    filters.setDomainIds(null);
                }
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

       refreshFilters : function(selection) {
           var changed = false;
           var f = this.filters;

           var domainOid = this.config.get("domain");
           if (domainOid) {
               f.set({"id": {
                   "projectId": this.config.get("project")
               }}, {
                   "silent" : true
               });
               f.setDomainIds([domainOid], true);
               changed = changed || f.hasChanged();
           } else {
               // reset the domains
               f.setDomainIds(null, true);
               changed = changed || f.hasChanged();
           }

           f.set({"selection": selection}, {
               "silent" : true
           });
           changed = changed || f.hasChanged();

           if (changed === true) {
               this.changed(selection);
           }
       },

       changed : function(selection, timeFacet) {
           if (this.onChangeHandler) {
               this.onChangeHandler(selection, timeFacet);
           } else {
               console.log("compute (facetjob changed)");
               squid_api.controller.facetjob.compute(this.filters, selection);
           }
       }

    });

    return View;
}));
