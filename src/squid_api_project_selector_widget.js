(function (root, factory) {
    root.squid_api.view.ProjectSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_project_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        projects : null,
        onChangeHandler: null,
        projectEditEl: null,
        dropdownClass: null,
        projectAutomaticLogin: null,

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
            if (options.projectEditEl) {
                this.projectEditEl = options.projectEditEl;
            }
            if (options.multiSelectView) {
                this.multiSelectView = options.multiSelectView;
            }
            if (options.projectAutomaticLogin) {
                this.projectAutomaticLogin = options.projectAutomaticLogin;
            }

            // init the projects
            if (options.projects) {
                this.projects = options.projects;
                this.projects.on("reset sync", this.render, this);
            }
      
            this.model.on("change:project", this.render, this);

            // if project edit element passed, render it's view
            if (this.projectEditEl) {
                this.model.on("change:project", this.editProjectViewRender, this);
                this.editProjectViewRender();
            }
        },

        events: {
            "change .sq-select": function(event) {
                if (this.onChangeHandler) {
                    this.onChangeHandler.call(this,event);
                }
            }
        },

        editProjectViewRender: function() {
            var me = this;

            if (this.projectEditView) {
                this.projectEditView.remove();
            }
            var project = api.model.project;
            this.projectEditView = new api.view.ModelManagementView({
                el : $(me.projectEditEl),
                model : project,
                successHandler: function() {
                    if (me.projectAutomaticLogin) {
                        config.set({
                            "project" : this.get("id").projectId,
                            "domain" : null
                        });
                    }
                }
            });
        },

        render: function() {
            if (this.projects) {
                // display
                 
                var project, jsonData = {"selAvailable" : true, "options" : [{"label" : "Select Project", "value" : "", "selected" : false}]};
    
                for (var i=0; i<this.projects.size(); i++) {
                    project = this.projects.at(i);
                    if (project) {
                        var selected = false;
                        if (project.get("oid") == this.model.get("project")) {
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
                if (this.multiSelectView) {
                    this.$el.find("select").multiselect();
                }
            }

            return this;
        }

    });

    return View;
}));
