(function (root, factory) {
    root.squid_api.view.DomainSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_domain_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        displayAllDomains : false,
        onChangeHandler: null,

        initialize: function(options) {
            // setup options
            if (options) {
                if (options.template) {
                    this.template = options.template;
                } else {
                    this.template = template;
                }
                
                if (options.onChangeHandler) {
                    this.onChangeHandler = options.onChangeHandler;
                }
                if (options.multiSelectView) {
                    this.multiSelectView = options.multiSelectView;
                }
                
                if (typeof options.displayAllDomains !== 'undefined') {
                    this.displayAllDomains = options.displayAllDomains;
                }
            }
            
            if (!this.model) {
                this.model = squid_api.model.config;
            }
            this.model.on("change:domain", this.render, this);
            this.model.on("change:project", this.render, this);
            
        },

        events: {
            "change .sq-select": function(event) {
                if (this.onChangeHandler) {
                    this.onChangeHandler.call(this,event);
                } else {
                    // default behavior
                    var selectedOid = event.target.value || null;
                    this.model.set({
                        "domain" : selectedOid,
                        "chosenDimensions" : null,
                        "selectedDimension" : null,
                        "chosenMetrics" : null,
                        "selectedMetric" : null
                    });
                }
            }
        },

        render: function() {
            var me = this;
            var domain, domains, jsonData = {"selAvailable" : true, "options" : [{"label" : "Select Domain", "value" : "", "selected" : false}]};
            var hasSelection = false;
            var selectedDomain = me.model.get("domain");
            // get the domains from the project;
            domains = new squid_api.model.DomainCollection();
            domains.parentId = {
                projectId : me.model.get("project")
            };
            domains.fetch().then( function(domains) {
                for (var i=0; i<domains.length; i++) {
                    domain = domains[i];
                    var selected = false;
                    if (domain.oid === selectedDomain) {
                        selected = true;
                        hasSelection = true;
                    }

                    var displayed = true;

                    if (displayed) {
                        var option = {"label" : domain.name, "value" : domain.oid, "selected" : selected};
                        jsonData.options.push(option);
                    }
                }
                
                if (!hasSelection) {
                    // select first option
                    jsonData.options[0].selected = true;
                }

                var html = me.template(jsonData);
                me.$el.html(html);
                me.$el.show();

                // Initialize plugin
                if (me.multiSelectView) {
                    me.$el.find("select").multiselect();
                }
            });

            return this;
        }

    });

    return View;
}));
