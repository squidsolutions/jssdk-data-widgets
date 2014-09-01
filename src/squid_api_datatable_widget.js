(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        
        maxRowsPerPage : 10000,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change', this.render, this);
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_datatable_widget;
            }
            if (options.maxRowsPerPage) {
                this.maxRowsPerPage = options.maxRowsPerPage;
            }
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },

        render : function() {
            var jsonData, data;
            jsonData = this.model.toJSON();
            data = {};
            data.done = this.model.isDone();
            if (jsonData.results) {
                data.results = {};
                data.results.cols = jsonData.results.cols;
                if (jsonData.results.rows.length> this.maxRowsPerPage) {
                    data.results.rows = jsonData.results.rows.slice(0,this.maxRowsPerPage);
                } else {
                    data.results.rows = jsonData.results.rows;
                }
            }
            this.$el.html(this.template(data));
            return this;
        }
    });

    return View;
}));
