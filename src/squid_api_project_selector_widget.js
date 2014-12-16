(function (root, factory) {
    root.squid_api.view.ProjectSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_project_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            // init the projects
            this.model.on("reset sync", this.process, this);
        },

        events: {
            "change .sq-select": function(event) {
                var selectedOid = event.target.value;
                // update the current project
                squid_api.setProjectId(selectedOid);
            }
        },
        
        process : function() {
            if (!squid_api.projectId) {
                squid_api.model.status.on("change:project", this.render, this);
                if ((this.model.size() == 1)) {
                    // auto-select the single project
                    squid_api.setProjectId(this.model.at(0).get("oid"));
                } 
            } else {
                this.render();
            }
        },

        render: function() {
            // display

            var project, jsonData = {"selAvailable" : true, "options" : [{"label" : "Select Project", "value" : "", "selected" : false}]};

            for (var i=0; i<this.model.size(); i++) {
                project = this.model.at(i);
                if (project) {
                    var selected = false;
                    if (project.get("oid") == squid_api.projectId) {
                        selected = true;
                    }

                    var displayed = true;

                    // do not display projects with no domains
                    if (!project.get("domains")) {
                        displayed = false;
                    }

                    if (displayed) {
                        var option = {"label" : project.get("name"), "value" : project.get("oid"), "selected" : selected};
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
