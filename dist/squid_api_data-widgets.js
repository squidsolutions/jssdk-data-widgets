this["squid_api"] = this["squid_api"] || {};
this["squid_api"]["template"] = this["squid_api"]["template"] || {};

this["squid_api"]["template"]["squid_api_datatable_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class='sq-loading' style='position:absolute; width:100%; top:40%; z-index: 1;'>\r\n	<div class=\"spinner\">\r\n	<div class=\"rect5\"></div>\r\n	<div class=\"rect4\"></div>\r\n	<div class=\"rect3\"></div>\r\n	<div class=\"rect2\"></div>\r\n	<div class=\"rect1\"></div>\r\n	<div class=\"rect2\"></div>\r\n	<div class=\"rect3\"></div>\r\n	<div class=\"rect4\"></div>\r\n	<div class=\"rect5\"></div>\r\n	</div>\r\n</div>\r\n<table class=\"sq-table\">\r\n	<thead>\r\n		<tr></tr>\r\n	</thead>\r\n	<tbody></tbody>\r\n</table>\r\n";
  });

this["squid_api"]["template"]["squid_api_dimension_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <select class=\"sq-select form-control\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multiple), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </select>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "multiple";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <option value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n                ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </option>\r\n        ";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "selected";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <!-- just display filter name -->\r\n    <label>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\r\n    <span>-</span>\r\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_displaytype_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n        <li data-content=\"TimeSeriesView\"><i class=\"fa fa-line-chart fa-2x\"></i></li>\n    ";
  }

function program3(depth0,data) {
  
  
  return "\n        <li data-content=\"DataTableView\"><i class=\"fa fa-table fa-2x\"></i></li>\n    ";
  }

  buffer += "<ul class=\"widget-selector\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.TimeSeriesView), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.DataTableView), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_domain_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <select class=\"sq-select form-control\">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </select>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <option value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n                ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </option>\r\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <!-- just display filter name -->\r\n    <label>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\r\n    <span>-</span>\r\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_kpi_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class='sq-kpi'>\r\n		<span class=\"value\" style=\"font-size: large;\">";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span><span class=\"unit\">";
  if (helper = helpers.unit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n	    <span class=\"name\">\r\n	        ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n	    </span>\r\n	</div>\r\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.done), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\r\n  		No Data\r\n  	";
  }

function program6(depth0,data) {
  
  
  return "\r\n  		Computing\r\n  	";
  }

  stack1 = helpers['if'].call(depth0, depth0, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["squid_api"]["template"]["squid_api_metric_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <select class=\"sq-select form-control\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multiple), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "multiple";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <option value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n                ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n        </option>\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "selected";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <!-- just display filter name -->\r\n    <label>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\r\n    <span>-</span>\r\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_project_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <select class=\"sq-select form-control\">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </select>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <option value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n                ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </option>\r\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <!-- just display filter name -->\r\n    <label>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\r\n    <span>-</span>\r\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_timeseries_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class='sq-loading' style='position:absolute; width:100%; top:40%; z-index: 1;'>\n	<div class=\"spinner\">\n	<div class=\"rect5\"></div>\n	<div class=\"rect4\"></div>\n	<div class=\"rect3\"></div>\n	<div class=\"rect2\"></div>\n	<div class=\"rect1\"></div>\n	<div class=\"rect2\"></div>\n	<div class=\"rect3\"></div>\n	<div class=\"rect4\"></div>\n	<div class=\"rect5\"></div>\n	</div>\n</div>\n<div id=\"chart_container\">\n	<div id=\"chart\"></div>\n	<div id=\"legend_container\">\n		<div id=\"smoother\" title=\"Smoothing\"></div>\n		<div id=\"legend\"></div>\n	</div>\n	 <form id=\"offset_form\" class=\"toggler\">\n                <input type=\"radio\" name=\"offset\" id=\"lines\" value=\"lines\" checked>\n                <label class=\"lines\" for=\"lines\">lines</label>\n                <input type=\"radio\" name=\"offset\" id=\"stack\" value=\"stack\">\n                <label class=\"stack\" for=\"stack\">stack</label>\n				<input type=\"radio\" name=\"offset\" id=\"bar\" value=\"bar\">\n				<label class=\"bar\" for=\"bar\">bar</label>\n        </form>\n	<div id=\"slider\"></div>\n</div>\n";
  });
(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        maxRowsPerPage : 10000,

        format : null,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change:status', this.render, this);
                this.model.on('change:error', this.render, this);
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
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (d3) {
                    this.format = d3.format(",.f");
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },

        dataTableInsert : function(data) {

            var globalID;

            if (this.$el.attr("id")) {
                globalID = "#" + this.$el.attr('id');
            } else {
                console.log("No ID assigned to DOM element for Data Table");
            }

            d3.select(globalID + " tbody").selectAll("tr").remove();

            // header
            var th = d3.select(globalID + " thead tr").selectAll("th")
                .data(data.results.cols)
                .enter().append("th")
                .text(function(d) {
                    return d.name;
                });

            // Rows
            var tr = d3.select(globalID + " tbody").selectAll("tr")
                .data(data.results.rows)
                .enter().append("tr");

            // Cells
            var td = tr.selectAll("td")
                .data(function(d) {
                    return d.v;
                })
                .enter().append("td")
                .text(function(d) {
                    return d;
                });
        },

        render : function() {
            var jsonData, data, rowIdx, colIdx, row, rows, v, analysis;

            var me = this;

            analysis = this.model;

            // Use the first analyses array

            if (analysis.get("analyses")) {
              analysis = analysis.get("analyses")[0];
            }

            jsonData = analysis.toJSON();

            data = {};
            data.done = this.model.isDone();
            if (jsonData.results) {
                data.results = {"cols" : jsonData.results.cols, "rows" : []};
                rows = jsonData.results.rows;
                for (rowIdx = 0; (rowIdx<rows.length && rowIdx<this.maxRowsPerPage); rowIdx++) {
                    row = rows[rowIdx];
                    newRow = {v:[]};
                    for (colIdx = 0; colIdx<jsonData.results.cols.length; colIdx++) {
                        v = row.v[colIdx];
                        if (jsonData.results.cols[colIdx].dataType == "NUMBER") {
                            v = this.format(v);
                        }
                        newRow.v.push(v);
                    }
                    data.results.rows.push(newRow);
                }
            }

            this.$el.html(this.template());

            if (!this.model.isDone()) {
                // running
                if (this.model.get("status") == "RUNNING") {
                    $(".sq-loading").show();
                }
            } else if (this.model.get("error")) {
                // error
                $(".sq-loading").hide();
            } else {
                // display
                this.dataTableInsert(data);

                $(".sq-loading").hide();

                // Initiate the Data Table after render
                this.$el.find(".sq-table").DataTable();

            }

            return this;
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.DimensionSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        dimensions : null,
        dimensionIdList : null,
        dimensionIndex: null,

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

            this.model.on('change', function() {
                me.render();
            });
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
                
                var analysis = null;
                if (this.model.get("analyses")) {
                    // If instance of array
                    if (this.model.get("analyses")[0]) {
                        analysis = this.model.get("analyses")[0];
                    }
                } else {
                    analysis = this.model;
                }

                if (analysis) {
                    if (this.dimensionIndex !== null) {
                        if (selected.length > 0) {
                            analysis.setDimensionId(selected[0], this.dimensionIndex);
                        }
                    } else {
                        analysis.setDimensionIds(selected);
                    }
                }
            }
        },

        render: function() {
            var isMultiple = true;

            if (this.dimensionIndex !== null) {
                isMultiple = false;
            }

            var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};
            
            // iterate through all domains dimensions
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);
            if (domain) {
                if (domain.dimensions) {
                    var dimensions = [];
                    var dims = domain.dimensions;
                    for (var i=0; i<dims.length; i++){
                        var dim = dims[i];
                        if (this.dimensionIdList) {
                            // insert and sort
                            var idx = this.dimensionIdList.indexOf(dim.oid);
                            if (idx >= 0) {
                                dimensions[idx] = dim;
                            }
                        } else {
                            // default unordered behavior
                            dimensions.push(dim);
                        }
                    }
                    
                    for (var dimIdx=0; dimIdx<dimensions.length; dimIdx++) {
                        var dimension = dimensions[dimIdx];
                        // check if selected
                        var selected = this.isSelected(dimension);
                        
                        // add to the list
                        var option = {"label" : dimension.name, "value" : dimension.oid, "selected" : selected};
                        jsonData.options.push(option);
                    }
                }
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            // Initialize plugin
            var selector = this.$el.find("select");
            if (isMultiple) {
                selector.multiselect();
            }

            return this;
        },
        
        isSelected : function(dim) {
            var selected = false;

            var dimensions = this.model.get("dimensions");
            if (!dimensions && (this.model.get("analyses"))) {
                // multi-analysis case
                dimensions = this.model.get("analyses")[0].get("dimensions");
            }

            if (dimensions) {
                if (this.dimensionIndex !== null) {
                    if (dim.oid == dimensions[this.dimensionIndex].dimensionId) {
                        selected = true;
                    }
                } else {
                    for (var j=0; j<dimensions.length; j++) {
                        if (dim.oid == dimensions[j].dimensionId) {
                            selected = true;
                        }
                    }
                }
            }
            return selected;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.DisplayTypeSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_displaytype_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

    template : null,
    renderTo : null,
    baseWidget : null,
    squidApiPrefix : "squid_api.view.",
    views: {},

    initialize: function(options) {

        var me = this;

        if (squid_api.view.TimeSeriesView) {
            this.views.TimeSeriesView = true;
        }

        if (squid_api.view.DataTableView) {
            this.views.DataTableView = true;
        }

        if (squid_api.view.FlowChartView) {
            this.views.FlowChartView = true;
        }

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

        if (options.baseWidget) {
            this.baseWidget = options.baseWidget;
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
        var me = this;
        var view, widget;

        // Check if a click event has been triggered
        if (item.type === "click") {
            view = this.squidApiPrefix + item.currentTarget.dataset.content;
        } else {
            view = this.squidApiPrefix + item;
        }

        this.$el.find(item.currentTarget).addClass("active");
        this.$el.find(item.currentTarget).siblings().removeClass("active");

        // Select Widget
        if (view === this.squidApiPrefix + "DataTableView") {
            widget = new squid_api.view.DataTableView ({
                el : me.renderTo,
                model : analysis
            });
        } else if (view === this.squidApiPrefix + "TimeSeriesView") {
            widget = new squid_api.view.TimeSeriesView ({
                el : me.renderTo,
                model : analysis
            });
        }

        // Render the widget
        widget.render();
    },

    render: function() {
        var me = this;

        var availableViews = [];

        // Display template
        var html = this.template(this.views);
        this.$el.html(html);

        var baseElement = this.$el.find("li");

        $.each(baseElement, function() {
            $(this).removeClass("active");

            if ($(this).attr("data-content") === me.baseWidget) {
                $(this).addClass("active");
            }
        });

        if (this.baseWidget) {
            this.changeWidget(this.baseWidget);
        }

        return this;
    }
});

return View;

}));

(function (root, factory) {
    root.squid_api.view.DomainSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_domain_selector_widget);

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
            var domain, domains, jsonData = {"selAvailable" : true, "options" : [{"label" : "", "value" : "", "selected" : false}]};
            
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
                    // do not display domains with no dimensions
                    if (!domain.dimensions) {
                        displayed = false;
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

(function (root, factory) {
    root.squid_api.view.KPIView = factory(root.Backbone, root.squid_api);
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
                this.template = squid_api.template.squid_api_kpi_widget;
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

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },

        render : function() {
            var jsonData, results, values;
            if (this.model.isDone()) {
                jsonData = {};
                jsonData.done = true;
                results = this.model.get("results");
                if (results) {
                    if (results.rows.length == 1) {
                        values = results.rows[0].v;
                        if (values.length == 2) {
                            jsonData.value = this.format((values[1] / values[0]) * 100);
                            jsonData.unit = "%";
                            jsonData.name = results.cols[1].lname;
                        }
                    } 
                }
            }
            var tableContent = this.$el;
            var tableHTML = this.template(jsonData);
            tableContent.html(tableHTML);
            return this;
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.MetricSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        metrics : null,
        metricIdList : null,
        metricIndex: null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            if (options.metricIdList) {
                this.metricIdList = options.metricIdList;
            }

            if (options.metricIndex !== null) {
                this.metricIndex = options.metricIndex;
            }

            this.model.on('change', function() {
                me.render();
            });
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

                var analysis = null;
                if (this.model.get("analyses")) {
                    // If instance of array
                    if (this.model.get("analyses")[0]) {
                        analysis = this.model.get("analyses")[0];
                    }
                } else {
                    analysis = this.model;
                }

                if (analysis) {
                    if (this.metricIndex) {
                        if (selected.length > 0) {
                            analysis.setMetricId(selected[0], this.metricIndex);
                        }
                    } else {
                        analysis.setMetricIds(selected);
                    }
                }
            }
        },

        render: function() {
            var isMultiple = true;

            if (this.metricIndex !== null) {
                isMultiple = false;
            }

            var jsonData = {"selAvailable" : true, "options" : [{"label" : "", "value" : "", "selected" : false}], "multiple" : isMultiple};
            
            // iterate through all domains metrics
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);
            if (domain) {
                var metrics = domain.metrics;
                if (metrics) {
                    for (var idx=0; idx<metrics.length; idx++) {
                        var metric = metrics[idx];
                        // check if selected
                        var selected = this.isSelected(metric);
                        
                        // add to the list
                        var option = {"label" : metric.name, "value" : metric.oid, "selected" : selected};
                        jsonData.options.push(option);
                    }
                }
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            // Initialize plugin
            var selector = this.$el.find("select");
            if (isMultiple) {
                selector.multiselect();
            }

            return this;
        },
        
        isSelected : function(item) {
            var selected = false;

            /* See if we can obtain the metrics.
            If not check for a multi analysis array */

            var metrics = this.model.get("metrics");

            if (!metrics && (this.model.get("analyses"))) {
                metrics = this.model.get("analyses")[0].get("metrics");
            }

            if (metrics) {
                for (var j=0; j<metrics.length; j++) {
                    if (item.oid == metrics[j].metricId) {
                        selected = true;
                    }
                }
            }
            return selected;
        }

    });

    return View;
}));

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
            }
        },

        render: function() {
            // display

            var project, jsonData = {"selAvailable" : true, "options" : [{"label" : "", "value" : "", "selected" : false}]};

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

(function (root, factory) {
    root.squid_api.view.TimeSeriesView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_timeseries_widget);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend({

        template : null,
        metrics : null,
        dataToDisplay : 10000,
        invalidData: false,
        format : null,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change:status', this.update, this);
                this.model.on('change:error', this.render, this);
            }

            if (options.dataToDisplay) {
                this.dataToDisplay = options.dataToDisplay;
            }

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_timeseries_widget;
            }

            if (options.format) {
                this.format = options.format;
            }

            // Store the current metrics
            this.metrics = this.model.get("metrics");

            this.render();

            // Resize
            $(window).on("resize", _.bind(this.resize(),this));
        },

        resize : function() {
            var resizing = true;
            return function() {
                if (this.resizing) {
                    window.clearTimeout(resizing);
                }
                this.resizing = window.setTimeout(_.bind(this.render,this), 100);
            };
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },

        update : function() {

            if (!this.model.isDone()) {
                // running
                if (this.model.get("status") == "RUNNING") {
                    $(".sq-loading").show();
                }
            } else if (this.model.get("error")) {
                // error
                $(".sq-loading").hide();
            }

            // Store the current metrics
            this.metrics = this.model.get("metrics");

            this.render();
        },

        seriesColorAssignment : function(serie) {
            // Default
            var color = "#666666";

            // Specify a colour return value for each metric
            switch (serie) {

                case "count" :
                    color = "#fe6e70";
                break;
                case "withFTA" :
                    color = "#67e363";
                break;
                case "max_date" :
                    color = "#b563e2";
                break;
                case "sum_fta" :
                    color = "#ffc46f";
                break;
                case "unique_ftas" :
                    color = "#67e363";
                break;
            }

            return color;
        },

        seriesDataValues : function(serie, index, modelData) {
            var currentIndex = index;

            var seriesData = [];

            $.each(modelData, function(index, value) {
                var object = {};

                // Convert date value into unix
                object.x = moment(value[0]).unix();
                object.y = parseFloat(value[currentIndex + 1]);
                seriesData.push(object);
            });

            return seriesData;
        },

        getData: function() {

                var jsonData, data, rowIdx, colIdx, row, rows, v, analysis;

                analysis = this.model;

                // Use the first analyses array

                if (analysis.get("analyses")) {
                  analysis = analysis.get("analyses")[0];
                }

                jsonData = analysis.toJSON();

                data = {};
                data.done = this.model.isDone();
                if (jsonData.results) {
                    data.results = {"cols" : jsonData.results.cols, "rows" : []};
                    rows = jsonData.results.rows;
                    for (rowIdx = 0; (rowIdx<rows.length && rowIdx<this.dataToDisplay); rowIdx++) {
                        row = rows[rowIdx];
                        newRow = {v:[]};
                        for (colIdx = 0; colIdx<jsonData.results.cols.length; colIdx++) {
                            v = row.v[colIdx];
                            if (jsonData.results.cols[colIdx].dataType == "NUMBER") {
                                v = v;
                            }
                            newRow.v.push(v);
                        }
                        data.results.rows.push(newRow);
                    }
                }

                return data;
        },

        sortDateValues : function(dates) {
            var data = [];

            $.each(dates, function(index, value) {
                var object = {};

                $.each(value.v, function(index, value) {
                    object[index] = value;
                });

                data.push(object);
            });

            // Make sure that dates are sorted from lowest to highest
            var sortedDates = _.sortBy(data, function(o) { return o[0]; });

            return sortedDates;
        },

        render : function() {

            var me = this;

            var data = this.getData();

            if (data.done) {

                // Metric Data Manipulation
                var metricObject = this.metrics;
                var metricNames = [];

                for (i=0; i<metricObject.length; i++) {
                    metricNames.push(metricObject[i].metricId);
                }

                // Print Template
                this.$el.html(this.template());

                // Time Series [Series Data]
                var series = [];

                for (i=0; i<metricNames.length; i++) {
                    var object = {};
                    var metricName;

                    $(".sq-loading").hide();

                    // Check ID with column data to get a human readable name
                    for (a=0; a<data.results.cols.length; a++) {
                        if (data.results.cols[a].id === metricNames[i]) {
                            metricName = data.results.cols[a].name;
                        }
                    }

                    object.color = me.seriesColorAssignment(metricNames[i]);
                    object.name = metricName;
                    object.data = me.seriesDataValues(metricNames[i], i, me.sortDateValues(data.results.rows));

                    // Detect if data returned has been processed properly
                    if (isNaN(object.data[0].x)) {
                        me.invalidData = true;
                        break;

                    } else {
                        me.invalidData = false;
                    }

                    series.push(object);
                }

                if (!me.invalidData) {
                    var tempWidth = $(window).width() - 50;

                    // Time Series Chart
                    var graph = new Rickshaw.Graph({
                           element: document.getElementById("chart"),
                           width: tempWidth,
                           height: 400,
                           renderer: 'line',
                              series: series
                         });

                         graph.render();

                         var hoverDetail = new Rickshaw.Graph.HoverDetail( {
                             graph: graph,
                             xFormatter: function(x) { return "Date: " + moment.utc(x, 'X').format('YYYY-MM-DD');},
                             yFormatter: function(y) { return Math.floor(y); }
                         });

                         var legend = new Rickshaw.Graph.Legend( {
                            graph: graph,
                            element: document.getElementById('legend')
                         });

                         var xAxis = new Rickshaw.Graph.Axis.Time( {
                             graph: graph
                         });

                         var yAxis = new Rickshaw.Graph.Axis.Y( {
                             graph: graph
                         });

                         var slider = new Rickshaw.Graph.RangeSlider({
                             graph: graph,
                             element: document.querySelector('#slider')
                        });

                        var offsetForm = document.getElementById('offset_form');

                        // Change chart type on button change
                        offsetForm.addEventListener('change', function(e) {
                            var offsetMode = e.target.value;

                            if (offsetMode == 'lines') {
                                graph.setRenderer('line');
                                graph.offset = 'zero';
                            } else if (offsetMode == 'stack') {
                                graph.setRenderer('stack');
                                graph.offset = offsetMode;
                            } else if (offsetMode == 'bar') {
                                graph.setRenderer('bar');
                                graph.offset = offsetMode;
                            }

                            graph.render();

                        }, false);

                         yAxis.render();
                         xAxis.render();


                     } else {
                         this.$el.html("<div class='bad-data'>Time Series incompatible, please choose another</span>");
                     }

                     return this;
            }
        }
    });

    return View;
}));
