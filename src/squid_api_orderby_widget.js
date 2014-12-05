(function (root, factory) {
    root.squid_api.view.OrderByView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        
        format : null,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change', this.render, this);
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_orderby_widget;
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (d3) {
                    this.format = d3.format(",.1f");
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            "change": function(event) {


                if (event.target.checked !== undefined) {
                    if (event.target.checked) {
                        this.model.set({"orderByDirection" : "DESC"});
                    } else {
                        this.model.set({"orderByDirection" : "ASC"});
                    }
                } else {
                    var limit = parseInt($(event.target).val());
                    this.model.set({"limit" : limit});
                }
            }
        },

        render : function() {
            var checked;

            if (this.model.get("orderByDirection") === "DESC") {
                checked = "checked";
            } else {
                checked = "";
            }

            var jsonData = {direction : checked, limit : this.model.get("limit")};

            var html = this.template(jsonData);
            this.$el.html(html);
             
            // Set Limit Value
            this.$el.find(".sq-select").val(jsonData.limit);  

            return this;
        }
    });

    return View;
}));
