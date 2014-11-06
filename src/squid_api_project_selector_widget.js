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
            this.model.on("reset sync", this.render, this);
        },

        events: {
            "change .sq-select": function(event) {
                var selectedOid = event.target.value;
                // update the current project
                squid_api.setProjectId(selectedOid);
                squid_api.fetchProject();
            }
        },

        render: function() {
            // display

            var project, jsonData = {"selAvailable" : true, "options" : []};

            for (var i=0; i<this.model.size(); i++) {
                project = this.model.at(i);
                if (project) {
                    var selected = false;
                    if (project.get("oid") == squid_api.projectId) {
                        selected = true;
                    }

                    var option = {"label" : project.get("name"), "value" : project.get("oid"), "selected" : selected};
                    jsonData.options.push(option);
                }
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            // Initialize plugin
            this.$el.find("select").multiselect();

            return this;
        }

    });

    return View;
}));
