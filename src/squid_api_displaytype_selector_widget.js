(function (root, factory) {
    root.squid_api.view.DisplayTypeSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_displaytype_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        template : null,
        renderTo : null,
        defaultWidget : null,
        currentView : null,
        currentViewName : null,
        currentSelectionName : null,
    
        initialize: function(options) {
    
            var me = this;
    
            // Store template
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
    
            // Store Widget Render to element
            if (options.renderTo) {
                this.renderTo = options.renderTo;
            }
    
            if (options.defaultWidget) {
                this.defaultWidget = options.defaultWidget;
            }
            
            if (this.model) {
                this.model.on('change', this.render, this);
            }
    
            this.render();
        },
    
        setModel: function(model) {
            this.model = model;
            this.initialize();
        },
    
        events: {
            "click li": "changeWidget"
        },
    
        changeWidget: function(item){
            this.currentSelectionName = item.currentTarget.dataset.content;
            this.render();
        },
    
        render: function() {
            if (!this.model.isDone()) {
                // running
                if (this.model.get("status") == "RUNNING") {
                    $(".sq-loading").show();
                }
            } else if (this.model.get("error")) {
                // error
                $(".sq-loading").hide();
            } else {
                this.display();
            }
        },
        
        addCompatibleView : function(list, name) {
            // check it is available
            if (squid_api.view[name]) {
                list.push(name);
            }
        },
        
        display: function() {
            var me = this;
            
            // compute the view types compatible with the analysis
            var dimensions = this.model.get("dimensions");
            var compatibleViews = [];
            
            this.addCompatibleView(compatibleViews, "DataTableView");
            if (dimensions && (dimensions.length>0)) {
                this.addCompatibleView(compatibleViews, "BarChartView");
                if (dimensions.length>1) {
                    this.addCompatibleView(compatibleViews, "FlowChartView");
                }
                var hasDateDimension = false;
                var cols = this.model.get("results").cols;
                for (var idx=0; idx < cols.length; idx++) {
                    if (cols[idx].dataType == "DATE") {
                        hasDateDimension = true;
                    }
                }
                if (hasDateDimension) {
                    this.addCompatibleView(compatibleViews, "TimeSeriesView");
                }
            }
       
            // compute the current selected view
            var viewName;
            if (!this.currentSelectionName) {
                this.currentSelectionName = this.defaultWidget;
            }
            if (compatibleViews.indexOf(this.currentSelectionName)>-1) {
                viewName = this.currentSelectionName;
            } else {
                viewName = "DataTableView";
                this.currentSelectionName = viewName;
            }
            
            // display the Widget
            if (!this.currentViewName || (viewName != this.currentViewName)) {
                // update the view
                this.currentViewName = viewName;
                if (this.currentView) {
                    // dispose previous view
                    this.currentView.remove();
                }
                // create the new view
                if (viewName == "DataTableView") {
                    this.currentView = new squid_api.view.DataTableView ({
                        el : me.renderTo,
                        model : analysis
                    });
                } else if (viewName == "TimeSeriesView") {
                    this.currentView = new squid_api.view.TimeSeriesView ({
                        el : me.renderTo,
                        model : analysis
                    });
                }
                this.currentView.render();
            }
            
            // display the view selector
            var data = {"options" : []};
            for (idx2 = 0; idx2<compatibleViews.length; idx2++) {
                var view2 = compatibleViews[idx2];
                var icon;
                if (view2 == "DataTableView") {
                    icon = "fa-table";
                } else if (view2 == "TimeSeriesView") {
                    icon = "fa-line-chart";
                }
                var isActive = false;
                if (view2 == this.currentViewName) {
                    isActive = true;
                }
                data.options.push({"view" : view2, "icon" : icon, "isActive" : isActive});
            }
            var html = this.template(data);
            this.$el.html(html);
    
            return this;
        }
    });

    return View;

}));
