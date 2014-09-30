(function (root, factory) {
    root.squid_api.view.DimensionSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        dimensions : [],

        initialize: function(options) {
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            var me = this;
            squid_api.model.project.on('change', function(model) {
                // get the dimensions from the api

                var domainId, domain;

                try {
                  domainId = me.model.get("domains")[0].domainId;
                }
                catch(err) {
                  domainId = me.model.get("analyses")[0].get("domains")[0].domainId;
                }

                domain = squid_api.utils.find(model.get("domains"), "oid", domainId);

                var dims = domain.dimensions;

                // filter categorical dimensions
                for (var i=0; i<dims.length; i++){
                    var dim = dims[i];
                    if (dim.type == "CATEGORICAL") {
                        me.dimensions.push(dim);
                    }
                }
                me.render();
            });
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            "change": function(event) {
                var oid = this.$el.find("select").val();
                this.model.get("analyses")[0].setDimensionId(oid);
            }
        },

        render: function() {
            // display

            var jsonData = {"selAvailable" : true, "options" : []};

            for (var i=0; i<this.dimensions.length; i++) {
                var dim = this.dimensions[i];
                var selected = false;

                var oid;

                try {
                  oid = this.model.get("dimensions")[0].dimensionId;
                }

                catch(err) {
                  oid = this.model.get("analyses")[0].get("dimensions")[0].dimensionId;
                }

                if (dim.oid == oid) {
                    selected = true;
                }

                var option = {"label" : dim.name, "value" : dim.oid, "selected" : selected};
                jsonData.options.push(option);
            }
            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();
            return this;
        }

    });

    return View;
}));
