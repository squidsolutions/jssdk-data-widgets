(function (root, factory) {
    root.squid_api.view.DomainSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_domain_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        displayAllDomains : false,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (typeof options.displayAllDomains !== 'undefined') {
                this.displayAllDomains = options.displayAllDomains;
            }

            // init the domains
            this.model = squid_api.model.project;
            this.model.on("change", this.render, this);
        },

        events: {
            "change .sq-select": function(event) {
                var selectedOid = event.target.value;
                // update the current domain
                squid_api.setDomainId(selectedOid);
            }
        },

        render: function() {
            var domain, domains, jsonData = {"selAvailable" : true, "options" : [{"label" : "Select Domain", "value" : "", "selected" : false}]};

            // get the domains from the project;
            domains = this.model.get("domains");
            if (domains) {
                for (var i=0; i<domains.length; i++) {
                    domain = domains[i];
                    var selected = false;
                    if (domain.oid == squid_api.domainId) {
                        selected = true;
                    }

                    var displayed = true;
                    
                    if (!this.displayAllDomains) {
                        // do not display domains with no dimensions nor metrics
                        if ((!domain.dimensions) || (domain.dimensions.length === 0)) {
                            displayed = false;
                        }
                        if ((!domain.metrics) || (domain.metrics.length === 0)) {
                            displayed = false;
                        }
                    }

                    if (displayed) {
                        var option = {"label" : domain.name, "value" : domain.oid, "selected" : selected};
                        jsonData.options.push(option);
                    }
                }
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            // Initialize plugin
            this.$el.find("select");

            return this;
        }

    });

    return View;
}));
