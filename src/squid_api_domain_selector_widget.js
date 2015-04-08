(function (root, factory) {
    root.squid_api.view.DomainSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_domain_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        displayAllDomains : false,
        onChangeHandler: null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (options.onChangeHandler) {
                this.onChangeHandler = options.onChangeHandler;
            }
            
            if (typeof options.displayAllDomains !== 'undefined') {
                this.displayAllDomains = options.displayAllDomains;
            }

            squid_api.model.project.on("change:domains", this.process, this);
            this.model.on("change:domain", this.render, this);
        },

        events: {
            "change .sq-select": function(event) {
                if (this.onChangeHandler) {
                    this.onChangeHandler.call(this,event);
                }
            }
        },
        
        process : function() {
            this.render();
        },

        render: function() {
            var domain, domains, jsonData = {"selAvailable" : true, "options" : [{"label" : "Select Domain", "value" : "", "selected" : false}]};
            var hasSelection = false;
            var selectedDomain = squid_api.model.config.get("domain");
            // get the domains from the project;
            domains = squid_api.model.project.get("domains");
            if (domains) {
                for (var i=0; i<domains.length; i++) {
                    domain = domains[i];
                    var selected = false;
                    if (domain.oid == selectedDomain) {
                        selected = true;
                        hasSelection = true;
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
            
            if (!hasSelection) {
                // select first option
                jsonData.options[0].selected = true;
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
