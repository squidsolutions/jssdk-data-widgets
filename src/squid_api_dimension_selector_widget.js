(function (root, factory) {
    root.squid_api.view.DimensionSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        dimensions : null,
        dimensionIdList : null,
        dimensionIndex: null,

        initializeDimensions : function(me) {
            var domainId, domain;
            
            me.dimensions = [];

            /* See if we can obtain the domain's.
            If not check for a multi analysis array */

            domains = me.model.get("domains");

            if (!domains) {
                domains = me.model.get("analyses")[0].get("domains");
            }

            domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", domains[0].domainId);
            
            if (domain) {
                var dims = domain.dimensions;
                for (var i=0; i<dims.length; i++){
                    var dim = dims[i];
                    if (me.dimensionIdList) {
                        // insert and sort
                        var idx = me.dimensionIdList.indexOf(dim.oid);
                        if (idx >= 0) {
                            me.dimensions[idx] = dim;
                        }
                    } else {
                        // default unordered behavior
                        me.dimensions.push(dim);
                    }
                }
            }
            me.render();
        },

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            if (options.dimensionIdList) {
                this.dimensionIdList = options.dimensionIdList;
            }

            if (options.dimensionIndex !== null) {
                this.dimensionIndex = options.dimensionIndex;
            }

            // init the dimensions from the project
            if (squid_api.model.project.get("domains")) {
                me.initializeDimensions(me);
            } else {
                // project not loaded yet
                squid_api.model.project.on('change', function(model) {
                    me.initializeDimensions(me);
                });
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            "change": function(event) {
                var oid = this.$el.find("select option:selected");
                var selected = [];

                for (i = 0; i < oid.length; i++) {
                    selected.push($(oid[i]).val());
                }

                if (this.dimensionIndex !== null) {

                    if (selected.length === 1) {
                        selected = selected[0];
                    }

                    if (this.model.get("analyses")) {
                        // If instance of array
                        if (this.model.get("analyses")[0]) {
                            this.model.get("analyses")[0].setDimensionId(selected, this.dimensionIndex);
                        } else {
                            this.model.get("analyses").setDimensionId(selected, this.dimensionIndex);
                        }
                    } else {
                        this.model.setDimensionId(selected, this.dimensionIndex);
                    }
                } else {
                    if (this.model.get("analyses")) {
                        // If instance of array
                        if (this.model.get("analyses")[0]) {
                            this.model.get("analyses")[0].setDimensionIds(selected);
                        } else {
                            this.model.get("analyses").setDimensionIds(selected);
                        }
                    } else {
                        this.model.setDimensionIds(selected);
                    }
                }
            }
        },

        render: function() {
            // display

            var isMultiple = true;

            if (this.dimensionIndex !== null) {
                isMultiple = false;
            }

            var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};

            for (var i=0; i<this.dimensions.length; i++) {
                var dim = this.dimensions[i];
                if (dim) {
                    var selected = false;

                    /* See if we can obtain the dimensions.
                    If not check for a multi analysis array */

                    var dimensions = this.model.get("dimensions");

                    if (!dimensions & (this.model.get("analyses"))) {
                        dimensions = this.model.get("analyses")[0].get("dimensions");
                    }

                    if (dimensions) {
                        for (var j=0; j<dimensions.length; j++) {
                            if (dim.oid == dimensions[j].dimensionId) {
                                selected = true;
                            }
                        }
                    }

                    var option = {"label" : dim.name, "value" : dim.oid, "selected" : selected};
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
