(function (root, factory) {
    root.squid_api.controller.FiltersContoller = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

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
                squid_api.controller.facetjob.compute(filters, filters.get("userSelection"));
            });
            
            // update config if filters have changed
            this.listenTo(filters, 'change:selection', function(filters) {
                me.refreshFilters(filters.get("selection"));    
            });
            
            // check for domain change performed
            this.listenTo(squid_api.model.config, 'change:domain', function(config) {
                var id = filters.get("id");
                if (id) {
                    filters.set("id" , {
                        "projectId" : id.projectId,
                        "domainId" : config.get("domain"),
                        "facetjobId" : null
                        });
                }
                me.refreshFilters(null);
            });
            
            // check for project change performed
            this.listenTo(squid_api.model.config, 'change:project', function(config) {
                var id = filters.get("id");
                if (id) {
                    filters.set("id" , {
                        "projectId" : config.get("project"),
                        "domainId" : null,
                        "facetjobId" : null
                        });
                }
            });
            
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
                if (this.onChangeHandler) {
                    this.onChangeHandler.call(f);
                } else {
                    squid_api.controller.facetjob.compute(f);
                }
            }
        }
    });

    return View;
}));
