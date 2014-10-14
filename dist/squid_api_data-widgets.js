this["squid_api"] = this["squid_api"] || {};
this["squid_api"]["template"] = this["squid_api"]["template"] || {};

this["squid_api"]["template"]["squid_api_datatable_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.results), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n	<table class='sq-table'>\r\n	    <thead>\r\n	        <tr>\r\n	            ";
  options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}
  if (helper = helpers.cols) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.cols); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.cols) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	        </tr>\r\n	    </thead>\r\n	    <tbody>\r\n	        ";
  options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data}
  if (helper = helpers.rows) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.rows); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.rows) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	    </tbody>\r\n	</table>\r\n	";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<th>";
  if (helper = helpers.lname) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.lname); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</th>";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n	           <tr>\r\n	               ";
  options={hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data}
  if (helper = helpers.v) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.v); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.v) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	           </tr>\r\n	        ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n	                  <td>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td> \r\n	               ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.done), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "\r\n  		No Data\r\n  	";
  }

function program11(depth0,data) {
  
  
  return "\r\n  		Computing\r\n  	";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.results), {hash:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["squid_api"]["template"]["squid_api_dimension_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

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
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
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
(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        maxRowsPerPage : 10000,

        format : null,

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

        render : function() {
            var jsonData, data, rowIdx, colIdx, row, rows, v;

            jsonData = this.model.toJSON();

            // Use only the first array if multiple happen to exist

            if (jsonData.analyses && jsonData.analyses instanceof Array) {
              jsonData = jsonData.analyses[0];
            }

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
            this.$el.html(this.template(data));
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
        dimensions : [],
        dimensionIdList : null,

        initialize: function(options) {
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (options.dimensionIdList) {
                this.dimensionIdList = options.dimensionIdList;
            }
            
            var me = this;
            squid_api.model.project.on('change', function(model) {
                // get the dimensions from the api

                var domainId, domain;

                /* See if we can obtain the domain's.
                If not check for a multi analysis array */

                domains = me.model.get("domains");

                if (!domains) {
                    domains = me.model.get("analyses")[0].get("domains");
                }

                domain = squid_api.utils.find(model.get("domains"), "oid", domains[0].domainId);

                var dims = domain.dimensions;

                // filter categorical dimensions
                for (var i=0; i<dims.length; i++){
                    var dim = dims[i];
                    if (dim.type == "CATEGORICAL") {
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
                if (dim) {
                    var selected = false;
    
                    /* See if we can obtain the dimensions.
                    If not check for a multi analysis array */
    
                    var dimensions = this.model.get("dimensions");
    
                    if (!dimensions) {
                        dimensions = this.model.get("analyses")[0].get("dimensions");
                    }
    
                    if (dim.oid == dimensions[0].dimensionId) {
                        selected = true;
                    }
    
                    var option = {"label" : dim.name, "value" : dim.oid, "selected" : selected};
                    jsonData.options.push(option);
                }
            }
            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();
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
