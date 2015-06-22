this["squid_api"] = this["squid_api"] || {};
this["squid_api"]["template"] = this["squid_api"]["template"] || {};

this["squid_api"]["template"]["squid_api_barchart_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"bar_chart\" class=\"squid-api-data-widgets-bar-chart\" />";
  });

this["squid_api"]["template"]["squid_api_datatable_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class='sq-loading' style='display: none; position:absolute; width:100%; top:40%; z-index: 1;'>\r\n	<div class=\"spinner\">\r\n	<div class=\"rect5\"></div>\r\n	<div class=\"rect4\"></div>\r\n	<div class=\"rect3\"></div>\r\n	<div class=\"rect2\"></div>\r\n	<div class=\"rect1\"></div>\r\n	<div class=\"rect2\"></div>\r\n	<div class=\"rect3\"></div>\r\n	<div class=\"rect4\"></div>\r\n	<div class=\"rect5\"></div>\r\n	</div>\r\n</div>\r\n<div id=\"squid-api-data-widgets-data-table\">\r\n	<table class=\"sq-table\">\r\n		<thead>\r\n			<tr></tr>\r\n		</thead>\r\n		<tbody></tbody>\r\n	</table>\r\n	<div id=\"stale\">\r\n		<div class=\"reactiveMessage\"><span><i class=\"fa fa-table\"></i><br>Click refresh to update</span></div>\r\n	</div>\r\n	<div class=\"footer\">\r\n		<div id=\"total\">\r\n			Showing <span id=\"count-entries\"></span> of <span id=\"total-entries\"></span> entries\r\n		</div>\r\n		<div id=\"pagination\"></div>\r\n	</div>\r\n</div>\r\n\r\n\r\n";
  });

this["squid_api"]["template"]["squid_api_dimension_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <select class=\"sq-select form-control squid-api-data-widgets-dimension-selector\" ";
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
  buffer += "\r\n    <!-- just display filter name -->\r\n    <label class=\"squid-api-data-widgets-dimension-selector\">";
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

this["squid_api"]["template"]["squid_api_dimension_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n	<div class=\"information\">No Dimensions have been chosen</div>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<ul class=\"sortable\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.chosenDimensions), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"item\" data-content=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><i class=\"fa fa-ellipsis-v\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n    ";
  return buffer;
  }

  buffer += "<div class=\"squid-api-data-widgets-dimension-widget\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noChosenDimensions), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n\n\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_displaytype_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    	<li data-content=\"";
  if (helper = helpers.view) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.view); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isActive), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><i class=\"fa ";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " fa-2x\"></i></li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"active\"";
  }

  buffer += "<ul class=\"squid-api-data-widgets-displaytype-selector\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
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

  buffer += "<div class=\"squid-api-data-widgets-domain-selector\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_export_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class=\"panel panel-default filter-panel\">\r\n		<div class=\"panel-heading\">\r\n			<button type=\"button\" class=\"close\" data-toggle=\"collapse\"\r\n				data-target=\"";
  if (helper = helpers['data-target']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['data-target']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-clavier=\"true\" aria-hidden=\"true\">\r\n				<i class=\"glyphicon glyphicon-chevron-up\"></i>\r\n			</button>\r\n			<h4 class=\"panel-title\" id=\"myModalLabel\">Export</h4>\r\n		</div>\r\n		<div class=\"panel-body\">\r\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n				<input type=\"radio\" name=\"format\" value=\"";
  if (helper = helpers.format) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.format); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "> ";
  if (helper = helpers.format) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.format); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " \r\n				";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "checked";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n				<div style=\"display: inline-block;\">\r\n					<label>Compression: </label> <input type=\"checkbox\" name=\"compression\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.compression), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "> gzip\r\n				</div>\r\n				";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n			<hr>\r\n			<div>\r\n				Need to automate exports? Use the <a id=\"curlbtn\">shell commands</a>.\r\n				<div id=\"curl\">\r\n					<p>Sample code to download the analysis results using curl shell command.</p>\r\n					<b>1 - get an authentication token</b>\r\n					<p>replace the 'login' and 'password' fields in the following snippet</p>\r\n					<pre class=\"curl\">curl '";
  if (helper = helpers.apiURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.apiURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/auth-token' -H 'Origin: ";
  if (helper = helpers.origin) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.origin); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' -H 'Accept-Encoding: gzip,deflate' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: */*' -H 'Cache-Control: no-cache' --data 'customerId=";
  if (helper = helpers.customerId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.customerId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&client_id=";
  if (helper = helpers.clientId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.clientId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&redirect_uri=";
  if (helper = helpers.redirectURI) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectURI); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&login=<b>[login]</b>&password=<b>[password]</b>'</pre>\r\n					<b>2 - download the export</b>\r\n					<p>replace the 'access_token' field in the following snippet by the value of the 'tokenId' field returned by the previous script</p>\r\n					<pre class=\"curl\">curl '";
  if (helper = helpers.curl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.curl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' -H 'Origin: ";
  if (helper = helpers.origin) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.origin); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' -H 'Accept-Encoding: gzip,deflate' -H 'Content-Type: application/json' -H 'Accept: application/json, text/javascript, */*; q=0.01' --data-binary $'";
  if (helper = helpers.data) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.data); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' --compressed -o ";
  if (helper = helpers.curlFileName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.curlFileName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</pre>\r\n					<b>3 - view the export</b>\r\n					<p>your analysis results should now be downloaded as</p>\r\n					<pre class=\"curl\">ls ";
  if (helper = helpers.curlFileName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.curlFileName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</pre>\r\n				</div>\r\n			</div>\r\n			";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "\r\n		</div>\r\n	</div>\r\n";
  }

  buffer += "<div class=\"squid-api-data-widgets-export-widget\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.displayInAccordion), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			<button type=\"button\" class=\"close\" data-toggle=\"collapse\"\r\n				data-target=\"";
  if (helper = helpers['data-target']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['data-target']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-clavier=\"true\" aria-hidden=\"true\">\r\n			</button>\r\n			<div class=\"download-formats\">\r\n				<label>Format: </label> \r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.formats), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.displayCompression), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</div>\r\n			<div>&nbsp;</div>\r\n			<div>\r\n				<a id=\"download\" class=\"btn btn-default\" target=\"_blank\">Download your data</a>\r\n			</div>\r\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.displayInAccordion), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_kpi_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class='sq-kpi squid-api-data-widgets-kpi-widget'>\r\n		<span class=\"value\" style=\"font-size: large;\">";
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
  buffer += "\r\n    <select class=\"sq-select form-control squid-api-data-widgets-metric-selector\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multiple), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</select>\r\n";
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
    + "\r\n        </option>\r\n    ";
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

this["squid_api"]["template"]["squid_api_metric_total_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " squid-api-data-widgets-metrictotal-widget\" style=\"padding: 3px; display: inline-block;\" id=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" >\r\n		<table style=\"border:1px solid #DDD; border-collapse: separate; border-spacing: 3px;\">\r\n			<tr>\r\n				<td><span class=\"name\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td><span class=\"value\" style=\"color:#999;\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.total)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\r\n			</tr>\r\n		</table>\r\n	</div>\r\n	";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return " selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <label>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\r\n    <span>-</span>\r\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_metric_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n	<div class=\"information\">No Metrics have been chosen</div>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.chosenMetrics), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectMetric), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        	<div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.displayMetricValue), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </li>\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    		<li class=\"item "
    + escapeExpression(((stack1 = (depth0 && depth0.selected)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-selected=\""
    + escapeExpression(((stack1 = (depth0 && depth0.attrSelected)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-content=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    		";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    		<li class=\"item\" data-selected=\""
    + escapeExpression(((stack1 = (depth0 && depth0.attrSelected)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-content=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    	";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        		<div class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.total)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        	";
  return buffer;
  }

  buffer += "<ul class=\"squid-api-data-widgets-metric-widget\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noChosenMetrics), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_orderby_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n		<div class=\"pull-left\">\n			<table>\n				<tr>\n					<td>\n						<span class=\"preview\" style=\"font-size : 14px; padding-right: 5px; position: relative; top: 3px;\">Preview</span>\n					</td>\n					<td>\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.removeOrderDirection), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</td>\n					<td>\n						&nbsp;\n						<span style=\"font-size : 14px; font-weight: bold; padding-right: 5px; position: relative; top: 4px;\">";
  if (helper = helpers.limit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.limit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> <label style=\"position: relative; top: 4px; font-weight: normal;\">by</label> <select class=\"sq-select form-control\" style=\"display: inline-block; position: relative; bottom: 5px; max-width: 100px;\">\n						";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.chosenMetrics), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</select>\n					</td>\n				</tr>\n			</table>\n		</div>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n							<span class=\"orderby-direction\" style=\"top: 3px; position: relative; font-weight: bold; font-size: 14px;\">";
  if (helper = helpers.orderByDirectionDisplay) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orderByDirectionDisplay); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "<span>\n						\n						";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n							<div class=\"onoffswitch\">\n			    				<input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"myonoffswitch\" ";
  if (helper = helpers.direction) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.direction); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ">\n			    				<label class=\"onoffswitch-label\" for=\"myonoffswitch\">\n			        				<span class=\"onoffswitch-inner\"></span>\n			       				 	<span class=\"onoffswitch-switch\"></span>\n			    				</label>\n							</div>\n						";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n						<option value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\n						";
  return buffer;
  }

  buffer += "<div class=\"orderby-container squid-api-data-widgets-orderby-widget\">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.limit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_project_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <select class=\"sq-select form-control squid-api-data-widgets-project-selector\">\r\n        ";
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
  


  return "<div class='sq-loading' style='position:absolute; width:100%; top:40%; z-index: 2;'>\n	<div class=\"spinner\">\n	<div class=\"rect5\"></div>\n	<div class=\"rect4\"></div>\n	<div class=\"rect3\"></div>\n	<div class=\"rect2\"></div>\n	<div class=\"rect1\"></div>\n	<div class=\"rect2\"></div>\n	<div class=\"rect3\"></div>\n	<div class=\"rect4\"></div>\n	<div class=\"rect5\"></div>\n	</div>\n</div>\n<div id=\"chart_container\" class=\"squid-api-data-widgets-timeseries-widget\">\n	<div id=\"yearswitcher\"></div>\n	<div id=\"metricselector\"></div>\n	<div id=\"stale\">\n		<div class=\"reactiveMessage\"><span><i class=\"fa fa-line-chart\"></i><br>Click refresh to update</span></div>\n	</div>\n	<div id=\"chart\"></div>\n	<div id=\"legend_container\">\n		<div id=\"smoother\" title=\"Smoothing\"></div>\n		<div id=\"legend\"></div>\n	</div>\n	<div id=\"slider\"></div>\n</div>\n";
  });
(function (root, factory) {
    root.squid_api.controller.AnalysisContoller = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        analysis : null,
        config : null,
        onChangeHandler : null,
        
        initialize: function(options) {
            
            var me = this;
            
            if (this.model) {
                this.analysis = this.model;
            } else {
                this.analysis = new squid_api.model.AnalysisJob();
                this.model = this.analysis;
            }
            
            if (options) {
                // setup options
                if (options.config) {
                    this.config = options.config;
                }
                this.onChangeHandler = options.onChangeHandler;
            }
            
            if (!this.config) {
                this.config = squid_api.model.config;
            } 

            // controller
            
            this.config.on('change:project', function() {
                me.refreshAnalysis();
            });
            
            this.config.on('change:domain', function() {
                me.refreshAnalysis();
            });
            
            this.config.on('change:chosenDimensions', function() {
                me.refreshAnalysis();
            });
            
            this.config.on('change:chosenMetrics', function() {
                me.refreshAnalysis();
            });
            
            this.config.on('change:limit', function() {
                me.refreshAnalysis();
            });
            
            this.config.on('change:rollups', function() {
                me.refreshAnalysis();
            });
            
            this.config.on('change:orderBy', function() {
                me.refreshAnalysis();
            });
        },
        
       refreshAnalysis : function(silent) {
            var changed = false;
            var a = this.analysis;
            var config = this.config;
            if (silent !== false) {
                silent = true;
            }
            
            a.set({"id": {
                "projectId" : config.get("project"),
                "analysisJobId" : a.get("id").analysisJobId
            }}, {
                    "silent" : silent
                });
            changed = changed || a.hasChanged();
            a.set({"domains": [{
                "projectId": config.get("project"),
                "domainId": config.get("domain")
            }]}, {
                    "silent" : silent
                });
            changed = changed || a.hasChanged();
            a.setFacets(config.get("chosenDimensions"), silent);
            changed = changed || a.hasChanged();
            a.setMetrics(config.get("chosenMetrics"), silent);
            changed = changed || a.hasChanged();
            a.setSelection(config.get("selection"), silent);
            changed = changed || a.hasChanged();
            a.set({"limit": config.get("limit")}, {"silent" : silent});
            changed = changed || a.hasChanged();
            a.set({"rollups": config.get("rollups")}, {"silent" : silent});
            changed = changed || a.hasChanged();
            a.set({"orderBy" : config.get("orderBy")}, {"silent" : silent});
            changed = changed || a.hasChanged();
            
            if (changed === true) {
                if (this.onChangeHandler) {
                    this.onChangeHandler.call(this.analysis);
                } else {
                    squid_api.compute(this.analysis);
                }
            }
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.BarChartView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_barchart_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        
        format : null,
        
        d3Formatter : null,

        initialize: function(options) {
            var me = this;

            if (this.model) {
                this.listenTo(this.model, 'change:status', this.update);
                this.listenTo(this.model, 'change:error', this.render);
            }

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (d3) {
                this.d3Formatter = d3.format(",.f");
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (this.d3Formatter) {
                    this.format = function(f){
                        if (isNaN(f)) {
                            return f;
                        } else {
                            return me.d3Formatter(f);
                        }
                    };
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

        barDataValues: function(data) {
            // Set up base object + arrays
            var barData = {};
            barData.values = [];
            barData.xValues = [];
            barData.yValues = [];

            // Store these values
            for (i=0; i<data.length; i++) {
                barData.values.push(data[i].v);
                barData.xValues.push(data[i].v[1]);
                barData.yValues.push(data[i].v[0]);
            }

            return barData;
        },

        getData: function() {
            var data, analysis;

            analysis = this.model;

            // Use the first analyses array
            if (analysis.get("analyses")) {
                analysis = analysis.get("analyses")[0];
            }

            data = analysis.toJSON();
            data.done = this.model.isDone();

            return data;
        },

        remove: function() {
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();
            return this;
        },

        update: function() {
          if (this.model.get("dimensions").length < 2) {
              this.render();
          }
        },

        render: function() {
            var me = this;
            var data = this.getData();

            if (data.done) {

                // Print Template
                this.$el.html(this.template());

                // Obtain Bar Chart Data
                var barData = this.barDataValues(data.results.rows);

                //Calculate largest value / width of screen
                var maxValue = Math.max.apply(Math, barData.xValues);
                var screenWidth = this.$el.find("#bar_chart").width();

                //ToolTip Declaration
                var tooltip = d3.select('body').append('div')
                    .style('position', 'absolute')
                    .style('padding', '0 10px')
                    .style('background', 'white')
                    .style('opacity', 0);

                // Pre definitions for the bar chart
                var width = screenWidth,
                    barHeight = 30;
                    ySpacing = 45;

                // Set A max / min height
                var height;

                if (barData.values.length < 5) {
                    height = 200;
                } else {
                    height = 500;
                }

                // To make the chart fit (Width)
                xScale = d3.scale.linear()
                    .domain([0, maxValue])
                    .range([0, width - 205]);

                xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('top');

                // To make the chart fit (Height)
                var yScale = d3.scale.ordinal()
                    .domain(barData.yValues)
                    .rangePoints([0, height]);

                //Define Y axis
                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(10);

                // Bar Chart
                var chart = d3.select("#bar_chart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("class", "chart");

                // Append data container
                var bar = chart.selectAll("div")
                    .data(barData.values)
                    .enter().append("g")
                    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

                // Bar Rectangles with Tooltips / Transition on load
                var barItem = bar.append("rect")
                    .attr("y", function(d, i) {
                        return i*15;
                    })
                    .attr("x", function(d, i) {
                        return i + 200;
                    })
                    .attr("width", function(d) {
                        return 0;
                    })
                    .attr('fill', '#026E87')
                    .attr("height", barHeight)
                    .on('mouseover', function(d) {
                        tooltip.transition()
                            .style('opacity', 1);
                        tooltip.html(d[0] + " - " + me.format(d[1]))
                            .style('left', (d3.event.pageX - 35) + 'px')
                            .style('top',  (d3.event.pageY - 30) + 'px');
                        tempColor = this.style.fill;
                        d3.select(this)
                            .style('opacity', 1)
                            .style('fill', '#1aadcf');
                        })
                    .on('mouseout', function(d) {
                        tooltip.html("");
                        d3.select(this)
                            .style('opacity', 1)
                            .style('fill', tempColor);
                    })
                    .transition()
                        .attr('width', function(d) {
                            return xScale(d[1]);
                        })
                        .delay(function(d, i) {
                            return i * 20;
                        })
                        .duration(1000)
                        .ease('bounce');

                    // xAxis (Starting 200px from left)
                    var xAxis = d3.select("#bar_chart svg")
                        .append("g")
                        .attr('class', 'axis')
                        .attr('width', width)
                        .attr('x', 400)
                        .attr('transform', 'translate(200,' + (height - 1) + ')')
                        .call(xAxis);

                    // yAxis (Starting 200px from right)
                    var yAxisAppend = d3.select("#bar_chart svg")
                        .append("g")
                        .attr('class', 'axis')
                        .attr('height', height)
                        .attr('transform', 'translate(200,0)')
                        .call(yAxis)
                        .selectAll(".tick");

                    // Y aXis label spacing
                    var texts = yAxisAppend.attr("transform", function(d, i) {
                        return "translate(0," + (15 + (i * ySpacing)) + ")";
                    });
                }

            return this;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.DataTableView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,

        maxRowsPerPage : 10000,

        format : null,
        
        d3Formatter : null,
        
        config : null,

        paging : false,

        ordering : false,

        noDataMessage : "No data available in table",

        headerBadges : false,
        
        paginationView : null,
        
        rollupSummaryColumn : null,

        rollups : null,

        initialize : function(options) {
            var me = this;
            
            // config is used for orderBy
            if (options.config) {
                this.config = options.config;
            } else {
                this.config = squid_api.model.config;
            }

            if (this.model) {
                this.listenTo(this.model, 'change:status', this.render);
                this.listenTo(this.model, 'change:facets', this.render);
                this.listenTo(this.model, 'change:metricList', this.render);
                this.listenTo(this.model, 'change:orderBy', this.render);
            }

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_datatable_widget;
            }
            
            // filters are used to get the Dimensions and Metrics names
            if (options.filters) {
                this.filters = options.filters;
            } else {
                this.filters = squid_api.model.filters;
            }
            
            if (options.maxRowsPerPage) {
                this.maxRowsPerPage = options.maxRowsPerPage;
            }
            if (options.paging) {
                this.paging = options.paging;
            }
            if (options.ordering) {
                this.ordering = options.ordering;
            }
            if (options.noDataMessage) {
                this.noDataMessage = options.noDataMessage;
            }
            if (options.headerBadges) {
                this.headerBadges = options.headerBadges;
            }
            this.rollupSummaryColumn = options.rollupSummaryColumn;

            if (d3) {
                this.d3Formatter = d3.format(",.f");
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (this.d3Formatter) {
                    this.format = function(f){
                        if (isNaN(f)) {
                            return f;
                        } else {
                            return me.d3Formatter(f);
                        }
                    };
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }

            this.renderBaseViewPort();
        },

        events : ({
            "click thead th" : function(item) {
                if (this.ordering) {
                    var orderId = parseInt($(item.currentTarget).attr("data-id"));
                    var orderByDirection;
                    if (this.rollups) {
                        orderId = orderId - 1;
                    } 
                    if ($(item.currentTarget).hasClass("ASC")) {
                        orderByDirection = "DESC";
                    } else {
                        orderByDirection = "ASC";
                    }
                    this.config.set("orderBy", [{"col" : orderId, "direction" : orderByDirection}]);
                }
            }
        }),

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },
        
        /**
         * see : http://stackoverflow.com/questions/10966440/recreating-a-removed-view-in-backbone-js
         */
        remove: function() {
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();
            return this;
        },

        displayTableHeader : function(selector) {
            var me = this;
            var columns;
            var invalidSelection = false;
            
            var analysis = this.model;
            // in case of a multi-analysis model
            if (analysis.get("analyses")) {
              analysis = analysis.get("analyses")[0];
            }
            var results = analysis.get("results");
            var rollups;
            if (results) {         
                // use results columns
                columns = results.cols;
             
                // init rollups
                rollups = analysis.get("rollups");
                if (rollups && (rollups.length ===0)) {
                    rollups = this.rollups = null;
                } else {
                    this.rollups = true;
                }
            } else {
                // use analysis columns
                columns = [];
                var i;
                var obj;
                var facets = this.model.get("facets");
                if (facets) {
                    for (i=0; i<facets.length; i++) {
                        obj = squid_api.utils.find(this.filters.get("selection").facets, "id", facets[i].value);
                        if (obj) {
                            obj.dataType = "STRING";
                            columns.push(obj);
                        } else {
                            // impossible to get column data from selection
                            invalidSelection = true;
                        }
                        
                    }
                }
                var metrics = this.model.get("metricList");
                if (metrics) {
                    var metric;
                    for (i=0; i<metrics.length; i++) {
                        metric = metrics[i];
                        if (metrics[i].id) {
                            obj = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", metrics[i].id.metricId, "Metric");
                            if (obj) {
                                obj.dataType = "NUMBER";
                            } else {
                                // impossible to get column data from selection
                                invalidSelection = true;
                            }
                        } else {
                            obj = {
                                    "id" : null,
                                    "name" : metrics[i].name,
                                    "dataType" : "NUMBER"
                            };
                        }
                        columns.push(obj);
                    }
                }
            }

            // Add OrderBy Attribute
            var orderBy = this.model.get("orderBy");
            if (orderBy) {
                for (col=0; col<columns.length; col++) {
                    for (ix=0; ix<orderBy.length; ix++) {
                        if (this.ordering && this.rollups && col == orderBy[ix].col) {
                            columns[col + 1].orderDirection = orderBy[ix].direction;
                        } else if (this.ordering && col == orderBy[ix].col) {
                            columns[col].orderDirection = orderBy[ix].direction;
                        }
                        break;
                    }
                }
            }
            
            var rollupColIndex = null;
            var rollupSummaryIndex = null;
            if (rollups) {
                if ((rollups.length>0)) {
                    rollupColIndex = rollups[0].col + 1;
                }
                if (this.rollupSummaryColumn >= 0) {
                    rollupSummaryIndex = this.rollupSummaryColumn + 1;
                }
            }
            me = this;
            // header
            d3.select(selector).select("thead tr").selectAll("th").remove();
            
            if (!invalidSelection) {
                var th = d3.select(selector).select("thead tr").selectAll("th")
                    .data(columns)
                    .enter().append("th")
                    .attr("class", function(d, i) {
                        var str = "";
                        if (rollups) {
                            if (i === 0) {
                                // hide grouping column
                                str = str + "hide " + d.dataType;
                            } else if (( rollupSummaryIndex !== null) && (i === rollupColIndex)) {
                                // hide rollup column
                                str = str + "hide " + d.dataType;
                            } else {
                                str = str + d.dataType;
                            }
                        }
                        if (d.orderDirection) {
                            str = str + " " + d.orderDirection;
                        }
                        return str;
                    })
                    .html(function(d, i) {
                        var str = d.name;
                        if (d.orderDirection === "ASC") {
                            str = str + " " + "<span class='sort-direction'>&#xffea;</span>";
                        } else if (d.orderDirection === "DESC") {
                            str = str + " " + "<span class='sort-direction'>&#xffec;</span>";
                        }
                        return str;
                    })
                    .attr("data-content", function(d) {
                        if (d.oid) {
                            return d.oid;
                        } else {
                            return d.id;
                        }
                    })
                    .attr("data-id", function(d, i) {
                        return i;
                    });
                
                // add class if more than 10 columns
                if (this.$el.find("thead th").length > 10) {
                    this.$el.find("table").addClass("many-columns");
                } else {
                    this.$el.find("table").removeClass("many-columns");
                }
            }
            
        },
        
        displayTableContent : function(selector) {
            var me = this;
            
            var analysis = this.model;
            // in case of a multi-analysis model
            if (analysis.get("analyses")) {
              analysis = analysis.get("analyses")[0];
            }
            var results = analysis.get("results");
            var rollups;
                
            if (results) {
                rollups = analysis.get("rollups");
                if (rollups && (rollups.length ===0)) {
                    rollups = this.rollups = null;
                } else {
                    this.rollups = true;
                }
                
                var rollupColIndex = null;
                var rollupSummaryIndex = null;
                if (rollups) {
                    if ((rollups.length>0)) {
                        rollupColIndex = rollups[0].col + 1;
                    }
                    if (this.rollupSummaryColumn >= 0) {
                        rollupSummaryIndex = this.rollupSummaryColumn + 1;
                    }
                }
                // apply paging and number formatting
                var data = {};
                data.results = {"cols" : results.cols, "rows" : []};
                rows = results.rows;
                for (rowIdx = 0; (rowIdx<rows.length && rowIdx<this.maxRowsPerPage); rowIdx++) {
                    row = rows[rowIdx];
                    newRow = {v:[]};
                    for (colIdx = 0; colIdx<results.cols.length; colIdx++) {
                        v = row.v[colIdx];
                        if (results.cols[colIdx].dataType == "NUMBER") {
                            v = this.format(v);
                        }
                        newRow.v.push(v);
                    }
                    data.results.rows.push(newRow);
                }
                
                // Rows
                d3.select(selector).select("tbody").selectAll("tr").remove();
                var tr = d3.select(selector).select("tbody").selectAll("tr")
                    .data(data.results.rows)
                    .enter()
                    .append("tr");

                // Cells
                var td = tr.selectAll("td")
                    .data(function(d) {
                        return d.v;
                    })
                    .enter()
                    .append("td")
                    .attr("class", function(d, i) {
                        if (rollups) {
                            if (i === 0) {
                                // hide grouping column
                                return "hide";
                            } else if ((rollupSummaryIndex !== null) && (i === rollupColIndex)) {
                                // hide rollup column
                                return "hide";
                            } else if ((rollupSummaryIndex !== null) && (i === rollupSummaryIndex)) {
                                if (parseInt(this.parentNode.__data__.v[0]) === 1) {
                                    // this is a total (grouped) line
                                    this.parentNode.className = "group";
                                    return "new-category";
                                }
                            } else if ((i === 1 && parseInt(this.parentNode.__data__.v[0]) === 1)) {
                                // this is a total line
                                this.parentNode.className = "group";
                                return "new-category";
                            }
                            // Detect Group & Empty Value
                            if (this.parentNode.className === "group" && d.length === 0) {
                                me.categoryColSpan(this);
                            }
                        }
                    })
                    .text(function(d, i) {
                        var text = d;
                        if (rollups) {
                            if ((rollupSummaryIndex !== null) && (i === rollupSummaryIndex)) {
                                if (parseInt(this.parentNode.__data__.v[0]) === 1) {
                                    // this is a total (grouped) line
                                    text = this.parentNode.__data__.v[rollupColIndex];
                                }
                            } else if (i === 1){
                                if (parseInt(this.parentNode.__data__.v[0]) === 1) {
                                    // this is a total line
                                    text = "Total for "+data.results.cols[rollupColIndex].name;
                                }
                            }
                        }
                        return text;
                    });
                
                // display total
                this.$el.find("#count-entries").html(""+ results.startIndex + " - " + (results.startIndex + data.results.rows.length));
                this.$el.find("#total-entries").html(""+results.totalSize);
            }
        },

        categoryColSpan : function(node) {
            var siblings = node.parentNode.childNodes;
            var colSpan = 1;

            for (i=0; i<siblings.length; i++) {
                // Obtain Sibling With Matching Class
                if (d3.select(siblings[i]).classed("new-category")) {
                    if (d3.select(siblings[i]).attr("colspan")) {
                        colSpan = parseInt(d3.select(siblings[i]).attr("colspan"));
                    }
                    // Increment ColSpan Value 
                    d3.select(siblings[i]).attr("colspan", colSpan + 1);
                }
            }

            // Remove Node
            node.remove();
        },
        
        renderBaseViewPort : function() {
            this.$el.html(this.template());
            if (this.paging) {
                this.paginationView = new squid_api.view.PaginationView( {
                    model : this.model,
                    config : this.config,
                    el : this.$el.find("#pagination")
                });
                this.paginationView.render();
            }
        },

        render : function() {
            var me = this;
            var selector = "#"+this.el.id+" .sq-table";
            if (this.model.get("facets") && this.filters.get("selection")) {
                // display table header
                this.displayTableHeader(selector);
            }
            
            if (this.model.get("status") === "DONE") {
                // display results
                this.displayTableContent(selector);
                if (this.paging) {
                    this.paginationView.render();
                    this.$el.find("#pagination").show();
                }
                this.$el.find("#total").show();
                this.$el.find(".sq-loading").hide();
                this.$el.find("#stale").hide();
                this.$el.find(".sort-direction").show();
            }
    
            if (this.model.get("status") === "RUNNING") {
                // computing in progress
                this.$el.find(".sq-loading").show();
                this.$el.find("#stale").hide();
                this.$el.find(".sort-direction").show();
            }
            
            if (this.model.get("status") === "PENDING") {
                // refresh needed
                d3.select(selector).select("tbody").selectAll("tr").remove();
                this.$el.find("#pagination").hide();
                this.$el.find("#total").hide();
                this.$el.find(".sq-loading").hide();
                this.$el.find("#stale").show();
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
        dimensionIdList : null,
        dimensionIndex: null,
        filters: null,

        initialize: function(options) {
            var me = this;
            
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (options.filters) {
                this.filters = options.filters;
            } else {
                this.filters = squid_api.model.filters;
            }

            if (options.dimensionIdList) {
                this.dimensionIdList = options.dimensionIdList;
            }
            if (options.dimensionIndex !== null) {
                this.dimensionIndex = options.dimensionIndex;
            }

            // listen for selection change as we use it to get dimensions
            this.filters.on("change:selection", function() {
                me.render();
            });
            
            if (!this.model) {
                this.model = squid_api.model.config;
            }
            
            // listen for global status change
            squid_api.model.status.on('change:status', this.enable, this);

        },
        
        enable: function() {
            var select = this.$el.find("select");
            var multiSelectDropdown = this.$el.find(".multiselect-container");
            if (select) {
                var isMultiple = true;
                if (this.dimensionIndex !== null) {
                    isMultiple = false;
                }
                var running = (squid_api.model.status.get("status") != squid_api.model.status.STATUS_DONE);
                if (running) {
                    // computation is running : disable input
                    select.attr("disabled","disabled");
                    if (isMultiple) {
                        select.multiselect('disable');
                        multiSelectDropdown.append("<div class='dropdownDisabled'></div>");
                    }
                } else {
                    // computation is done : enable input
                    select.removeAttr("disabled");
                    if (isMultiple) {
                        select.multiselect('enable');
                        multiSelectDropdown.find(".dropdownDisabled").remove();
                    }
                }
            }
        },

        render: function() {
            var isMultiple = true;
            var me = this;

            if (this.dimensionIndex !== null) {
                isMultiple = false;
            }
            
            var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};
            
            // iterate through all filter facets
            var selection = this.filters.get("selection");
            if (selection) {
                var facets = selection.facets;
                if (facets) {
                    var dimensions = [];
                    var dims = facets;
                    for (var i=0; i<facets.length; i++){
                        var facet = facets[i];
                        var isBoolean = false;
                        if ((facet.dimension.type == "SEGMENTS") || (facet.items.length == 1) && (facet.items[0].value == "true")) {
                            isBoolean = true; 
                        }
                        // do not display boolean dimensions
                        if (!isBoolean) {
                            if (this.dimensionIdList) {
                                // insert and sort
                                var idx = this.dimensionIdList.indexOf(facet.dimension.oid);
                                if (idx >= 0) {
                                    dimensions[idx] = facet;
                                }
                            } else {
                                // default unordered behavior
                                dimensions.push(facet);
                            }
                        }
                        // avoid holes
                        if (!dimensions[i]) {
                            dimensions[i] = null;
                        }
                    }
                    
                    for (var dimIdx=0; dimIdx<dimensions.length; dimIdx++) {
                        var facet1 = dimensions[dimIdx];
                        if (facet1) {
                            // check if selected
                            var selected = this.isChosen(facet1);
                            // add to the list
                            var name;
                            if (facet1.name) {
                                name = facet1.name;
                            } else {
                                name = facet1.dimension.name;
                            }
                            var option = {"label" : name, "value" : facet1.id, "selected" : selected};
                            jsonData.options.push(option);
                        }
                    }
                }
            }

            // Alphabetical Sorting
            jsonData.options.sort(function(a, b) {
                var labelA=a.label.toLowerCase(), labelB=b.label.toLowerCase();
                if (labelA < labelB)
                    return -1;
                if (labelA > labelB)
                    return 1;
                return 0; // no sorting
            });

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            // Initialize plugin
            var selector = this.$el.find("select");
            if (isMultiple) {
                 selector.multiselect({
                    buttonText: function(options, select) {
                        return 'Dimensions';
                    },
                    onChange: function(option, selected, index) {
                        var chosenModel = _.clone(me.model.get("chosenDimensions"));
                        if (!chosenModel) {
                            chosenModel = [];
                        }
                        var currentItem = option.attr("value");

                        if (selected) {
                            chosenModel.push(option.attr("value"));
                        } else {
                            // If deselected remove item from array
                            for (var i = chosenModel.length; i--;) {
                                if (chosenModel[i] === currentItem) {
                                    chosenModel.splice(i, 1);
                                }
                            }
                        }
                        me.model.set("chosenDimensions", chosenModel);
                    }
                });
            } else {
                var selectedDimension = this.model.get("selectedDimension");
                
                this.$el.find("select").on("change", function() {
                    var dimension = $(this).val();
                    me.model.set("chosenDimensions", [dimension]);
                });

                if (selectedDimension) {
                    this.$el.find("select").val(selectedDimension);
                }
            }

            // Remove Button Title Tag
            this.$el.find("button").removeAttr('title');

            return this;
        },
        
        isChosen : function(facet) {
            var selected = false;

            var dimensions = this.model.get("chosenDimensions");

            if (dimensions) {
                if (this.dimensionIndex !== null) {
                    if (facet.id == dimensions[this.dimensionIndex]) {
                        selected = true;
                    }
                } else {
                    for (var j=0; j<dimensions.length; j++) {
                        if (facet.id == dimensions[j]) {
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
    root.squid_api.view.DimensionView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        selectDimension: false,
        filters : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (options.filters) {
                this.filters = options.filters;
            } else {
                this.filters = squid_api.model.filters;
            }

            if (options.selectDimension) {
                this.selectDimension = options.selectDimension;
            }
            
            // listen for selection change as we use it
            this.filters.on("change:selection", function() {
                me.render();
            });

            this.model.on("change:chosenDimensions", function() {
                me.render();
            });

            this.model.on("change:selectedDimension", function() {
                me.render();
            });

            this.render();
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            // Dimension Sorting
            "change": function(event) {
                var dimensions = this.$el.find(".sortable li");
                var selected = [];

                for (i = 0; i < dimensions.length; i++) {
                    selected.push($(dimensions[i]).attr("data-content"));
                }

                // Update
                this.model.set({"chosenDimensions" : selected});

            },
            // Dimension Selection
            "click li": function(item) {
                if (this.selectDimension) {
                    var itemClicked = $(item.currentTarget);

                    if (itemClicked.attr("data-selected")) {
                        itemClicked.removeAttr("data-selected");
                        itemClicked.removeClass("ui-selected");
                        this.model.set({"selectedDimension" : null});
                    } else {
                        itemClicked.attr("data-selected", "true");
                        itemClicked.siblings().removeAttr("data-selected").removeClass("ui-selected");
                        this.model.set({"selectedDimension" : itemClicked.attr("data-content")});
                    } 
                } 
            }
        },

        render: function() {
            var chosenDimensions = this.model.get("chosenDimensions");
            var jsonData = {"chosenDimensions" : []};
            var html;
            
            // iterate through all filter facets
            var selection = this.filters.get("selection");
            if (chosenDimensions && selection) {
                var facets = selection.facets;
                if (facets) {
                    var chosenFacets = [];
                    for (var dc=0; dc<chosenDimensions.length; dc++) {
                        for (var d=0; d<facets.length; d++){
                            var facet = facets[d];
                            if (chosenDimensions[dc] == facet.id) {
                                var item = {};
                                item.id = facet.id;
                                if (facet.name) {
                                    item.value = facet.name;
                                } else {
                                    item.value = facet.dimension.name;
                                }
                                chosenFacets.push(item);
                            }
                        } 
                    }
                    jsonData.chosenDimensions = chosenFacets;
                }
            } else {
                html = this.template({"noChosenDimensions" : true});
            }
                
            if (jsonData.chosenDimensions.length === 0) {
                html = this.template({"noChosenDimensions" : true});
            } else {
                html = this.template(jsonData);
            }
            
            this.$el.html(html);

            this.$el.show();

            // Make dimesions sortable & selectable
            this.dimensionSort();

            // Select selected dimension
            this.selectItem();

            return this;
        },

        selectItem: function() {
            var me = this;
            var dimensions = this.$el.find(".sortable li");
            if (this.selectDimension) {
                for (i = 0; i < dimensions.length; i++) {
                    if ($(dimensions[i]).attr("data-content") === me.model.get("selectedDimension")) {
                        $(dimensions[i]).attr("data-selected", "true");
                        $(dimensions[i]).addClass("ui-selected");
                    }
                }
            }
        },

        dimensionSort : function() {
            this.$el.find(".sortable").sortable({
                revert: true,
                stop: function(event, ui) { ui.item.trigger("change"); }
            });
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.DisplayTypeSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_displaytype_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        template : null,

        tableView : null,
        barView : null,
        timeView : null,

        initialize: function(options) {

            var me = this;

            // Store template
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            this.tableView = options.tableView;
            this.barView = options.barView;
            this.timeView = options.timeView;
            
            if (this.model) {
                this.model.on("change", this.render, this);
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
            var viewName = item.currentTarget.dataset.content;
            var analysis;
            
            // create the new view
            if (viewName == "tableView") {
                analysis = tableView.model;
            } else if (viewName == "timeView") {
                analysis = timeView.model;
            } else if (viewName == "barView") {
                analysis = barView.model;
            }
            this.model.set("currentAnalysis", analysis);
        },

        addCompatibleView : function(list, name) {
            // check it is available
            if (this[name]) {
                list.push(name);
            }
        },

        render: function() {
            var me = this;

            // compute the view types compatible with the model
            var selectedDimension = this.model.get("selectedDimension");
            var compatibleViews = [];
            this.addCompatibleView(compatibleViews, "tableView");
            
            if (selectedDimension && (selectedDimension.length>0)) {
                this.addCompatibleView(compatibleViews, "barView");
                
            }
            if (this.model.get("timeDimension")) {
                this.addCompatibleView(compatibleViews, "timeView");
            }
            
            // compute the current selected view
            var analysis = this.model.get("currentAnalysis");
            var currentViewName;

            if (this.tableView) {
                if (analysis == this.tableView.model) {
                    currentViewName = "tableView";
                }
            }
            if (this.barView) {
                if (analysis == this.barView.model) {
                    currentViewName = "barView";
                }
            }
            if (this.timeView) {
                if (analysis == this.timeView.model) {
                    currentViewName = "timeView";
                }
            }

            // display the view selector
            var data = {"options" : []};
            for (idx2 = 0; idx2<compatibleViews.length; idx2++) {
                var view2 = compatibleViews[idx2];
                var icon;
                if (view2 == "tableView") {
                    icon = "fa-table";
                } else if (view2 == "timeView") {
                    icon = "fa-line-chart";
                } else if (view2 == "barView") {
                    icon = "fa-bar-chart";
                }
                var isActive = false;
                if (view2 == currentViewName) {
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

(function (root, factory) {
    root.squid_api.view.DomainSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_domain_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        displayAllDomains : false,
        onChangeHandler: null,

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
            if (options.multiSelectView) {
                this.multiSelectView = options.multiSelectView;
            }
            
            if (typeof options.displayAllDomains !== 'undefined') {
                this.displayAllDomains = options.displayAllDomains;
            }

            if (!this.model) {
                this.model = squid_api.model.config;
            }
            this.model.on("change:domain", this.render, this);
            
            // TODO fetch the domains instead of relying on squid_api
            squid_api.model.project.on("change:domains", this.process, this);
            
        },

        events: {
            "change .sq-select": function(event) {
                if (this.onChangeHandler) {
                    this.onChangeHandler.call(this,event);
                } else {
                    // default behavior
                    var selectedOid = event.target.value || null;
                    this.model.set({
                        "domain" : selectedOid,
                        "chosenDimensions" : null,
                        "selectedDimension" : null,
                        "chosenMetrics" : null,
                        "selectedMetric" : null
                    });
                }
            }
        },
        
        process : function() {
            this.render();
        },

        render: function() {
            var domain, domains, jsonData = {"selAvailable" : true, "options" : [{"label" : "Select Domain", "value" : "", "selected" : false}]};
            var hasSelection = false;
            var selectedDomain = squid_api.model.config.get("domain");
            // get the domains from the project;
            domains = squid_api.model.project.get("domains");
            if (domains) {
                for (var i=0; i<domains.length; i++) {
                    domain = domains[i];
                    var selected = false;
                    if (domain.oid == selectedDomain) {
                        selected = true;
                        hasSelection = true;
                    }

                    var displayed = true;

                    if (displayed) {
                        var option = {"label" : domain.name, "value" : domain.oid, "selected" : selected};
                        jsonData.options.push(option);
                    }
                }
            }
            
            if (!hasSelection) {
                // select first option
                jsonData.options[0].selected = true;
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            // Initialize plugin
            if (this.multiSelectView) {
                this.$el.find("select").multiselect();
            }

            return this;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.DataExport = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        renderTo: null,
        compression : true,
        downloadStatus : 0,
        curlCollapsed : true,
        currentJobId : null,
        displayInAccordion : false,
        viewPort : null,
        formats : [{"format" : "csv", "mime-type" : "text/csv", "template" : null}],
        selectedFormatIndex : 0,
        templateData : null,
        displayScripting : true,
        displayCompression : true,
        
        initialize : function(options) {
            if (this.model.get("analysis")) {
                this.listenTo(this.model.get("analysis"), 'change', this.render);
                this.listenTo(this.model, 'change:templateData', this.refreshDownloadUrl);
            } else {
                this.listenTo(this.model, 'change', this.render);
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_export_widget;
            }
            if (options.formats) {
                this.formats = options.formats;
            }
            if (options.renderTo) {
                this.renderTo = options.renderTo;
            }
            if (options.displayInAccordion !== false) {
                this.displayInAccordion = true;
                this.viewPort = this.renderTo;
            } else {
                this.viewPort = this.$el;
            }
            if (options.displayScripting === false) {
                this.displayScripting = false;
            }
            if (options.displayCompression === false) {
                this.displayCompression = false;
            }
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },
        
        clickedFormat : function (event) {
            var t = event.target;
            this.selectedFormatIndex = null;
            for (var i=0; i<this.formats.length;i++) {
                if (this.formats[i].format === t.value) {
                    this.selectedFormatIndex = i;
                }
            }
            this.refreshDownloadUrl();
        },
        
        clickedCompression : function (event) {
            var t = event.target;
            this.compression = (t.checked);
            this.refreshDownloadUrl();
        },

        refreshDownloadUrl : function() {
            var me = this;
            if (me.currentJobId) {
                // create download link
                var analysisJobResults;
                var selectedFormat = this.formats[this.selectedFormatIndex];
                if (!selectedFormat.template) {
                    // use getResults method
                    analysisJobResults = new squid_api.model.ProjectAnalysisJobResult();
                    analysisJobResults.addParameter("format",selectedFormat.format);
                } else {
                    // use render method
                    analysisJobResults = new squid_api.model.ProjectAnalysisJobRender({"format" : selectedFormat.format});
                    analysisJobResults.setParameter("type", selectedFormat.type);
                    analysisJobResults.setParameter("timeout", null);
                    // build the template
                    var velocityTemplate = selectedFormat.template(me.model.get("templateData"));
                    analysisJobResults.setParameter("template", base64.encode(velocityTemplate));
                }
                if (me.compression) {
                    analysisJobResults.addParameter("compression","gzip");
                }
                analysisJobResults.set({
                    "id": me.currentJobId,
                    "oid": me.currentJobId.oid
                });
                var downloadBtn = $(me.viewPort).find("#download");
                downloadBtn.attr("href",analysisJobResults.url());
                downloadBtn.removeClass("disabled");
            }
        },
        
        render : function() {
            var me = this;
            var analysis = this.model.get("analysis");
            if (!analysis) {
                analysis = this.model;
            }
            
            var selectedFormat = this.formats[this.selectedFormatIndex];
            var formatsDisplay = [];
            for (var i=0; i<this.formats.length;i++) {
                formatsDisplay[i] = this.formats[i];
                if (i === this.selectedFormatIndex) {
                    formatsDisplay[i].selected = true;
                }
            }
            
            if (this.displayInAccordion) {
                this.$el.html("<button type='button' class='btn btn-open-export-panel' data-toggle='collapse' data-target=" + this.renderTo + ">Export<span class='glyphicon glyphicon-download-alt'></span></button>");
                var facets = analysis.get("facets");
                var metrics = analysis.get("metrics");
                if ((!facets || facets.length === 0) && (!metrics || metrics.length === 0)) {
                    $("button.btn-open-export-panel").prop('disabled', true);
                } else {
                    $("button.btn-open-export-panel").prop('disabled', false);
                }
            }

            var data, curl, curlFileName;
            if (me.displayScripting !== false) {
                // render the curl snippet
                var exportAnalysis = new squid_api.model.ProjectAnalysisJob();
                exportAnalysis.addParameter("format", this.formats[this.selectedFormatIndex].format);
                if (this.compression) {
                    exportAnalysis.addParameter("compression","gzip");
                }
                exportAnalysis.addParameter("access_token","[access_token]");
                exportAnalysis.set(analysis.attributes);
                exportAnalysis.set(
                   "id", {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    });
    
                // escape all spaces in the json injected into cURL
                data = JSON.stringify(exportAnalysis).replace(/\'/g, '\\\'');
                curlFileName = "analysis";
                if (selectedFormat.format) {
                    curlFileName += "."+selectedFormat.format;
                }
                if (this.compression) {
                    curlFileName += ".gz";
                }
                curl = exportAnalysis.url().replace(/\[access_token\]/g, '<b>[access_token]</b>');
            }
            
            $(this.viewPort).html(this.template({
                "displayInAccordion" : this.displayInAccordion,
                "data-target" : this.renderTo,
                "formats": formatsDisplay,
                "displayCompression" : this.displayCompression,
                "compression": (this.compression),
                "curl": curl,
                "curlFileName" : curlFileName,
                "origin": "https://api.squidsolutions.com",
                "data": data,
                "customerId" : squid_api.customerId,
                "clientId" : squid_api.clientId,
                "redirectURI":"https://api.squidsolutions.com",
                "apiURL":squid_api.apiURL
                })
            );
            
            // prepare download link
            this.downloadStatus = 1;
            var downloadBtn = $(me.viewPort).find("#download");
            downloadBtn.addClass("disabled");

            if (analysis.get("id").projectId) {
                var downloadAnalysis = new squid_api.model.ProjectAnalysisJob();
                downloadAnalysis.set(analysis.attributes);
                downloadAnalysis.set({
                    "id": {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    },
                    "autoRun": false});
                squid_api.controller.analysisjob.createAnalysisJob(downloadAnalysis, analysis.get("selection"))
                .done(function(model, response) {
                    me.downloadStatus = 2;
                    me.currentJobId = downloadAnalysis.get("id");
                    me.refreshDownloadUrl();
                })
                .fail(function(model, response) {
                    console.error("createAnalysisJob failed");
                });
            }
            
            // apply cURL panel state
            if (me.curlCollapsed) {
                $(this.viewPort).find('#curl').hide();
            } else {
                $(this.viewPort).find('#curl').show();
            }
            
            // Click Handlers
            $(this.viewPort).find("#curlbtn").click(function() {
                me.curlCollapsed = !me.curlCollapsed;
                if (me.curlCollapsed) {
                    $(me.viewPort).find('#curl').fadeOut();      
                } else {
                    $(me.viewPort).find('#curl').fadeIn();
                }
            });

            // register click handlers    
            $(this.viewPort).find('[name="format"]').click(
                    function(event) {
                        me.clickedFormat(event);
                    });
            $(this.viewPort).find('[name="compression"]')
            .click(function(event) {
                me.clickedCompression(event);
            });

            return this;
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.controller.FiltersContoller = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        filters : null,
        config : null,
        onChangeHandler : null,
        
        initialize: function(options) {
            
            var me = this;

            // setup options
            
            if (this.model) {
                this.filters = this.model;
            } else {
                this.filters = squid_api.model.filters;
            }
      
            if (options) {
                // setup options
                if (options.config) {
                    this.config = options.config;
                }
                this.onChangeHandler = options.onChangeHandler;
            }
            
            if (!this.config) {
                this.config = squid_api.model.config;
            }
            
            // controller
            
            var filters = this.filters;
            
            // check for new filter selection made by user
            this.listenTo(filters, 'change:userSelection', function() {
                console.log("compute (change:userSelection)");
                squid_api.controller.facetjob.compute(filters, filters.get("userSelection"));
            });
            
            // update config if filters have changed
            this.listenTo(filters, 'change:selection', function(filters) {
                me.config.set("selection", squid_api.utils.buildCleanSelection(filters.get("selection")));  
            });
            
            // check for domain change performed
            this.listenTo(this.config, 'change:domain', function(config) {
                var id = filters.get("id");
                if (id) {
                    filters.set("id" , {
                        "projectId" : id.projectId,
                        "facetjobId" : null
                        });
                    filters.setDomainIds([{
                        "projectId" : id.projectId,
                        "domainId" : config.get("domain")
                    }]);
                }
                me.initFilters(config);
            });
            
            // check for project change performed
            this.listenTo(this.config, 'change:project', function(config) {
                var id = filters.get("id");
                if (id) {
                    filters.set("id" , {
                        "projectId" : config.get("project"),
                        "facetjobId" : null
                        });
                    filters.setDomainIds(null);
                }
            });
        },
        
       initFilters : function(config) {
           var me = this;
           var domainId = config.get("domain");
           var projectId = config.get("project");
           
           if (projectId && domainId) {
               var domainPk = {
                       "projectId" : projectId,
                       "domainId" : domainId
               };
              
               // launch the default filters computation
               var filters = new squid_api.model.FiltersJob();
               filters.set("id", {
                   "projectId": projectId
               });
               filters.set("engineVersion", "2");
               filters.setDomainIds([domainPk]);

               $.when(squid_api.controller.facetjob.compute(filters, config.get("selection")))
               .then(function() {
                   // search for a time facet
                   var timeFacet;
                   var sel = filters.get("selection");
                   if (sel && sel.facets) {
                       var facets = sel.facets;
                       for (var i = 0; i < facets.length; i++) {
                           var facet = facets[i];
                           if (facet.dimension.type == "CONTINUOUS") {
                               timeFacet = facet;
                           }
                       }
                   }
                   if (timeFacet) {
                       if (timeFacet.done === false) {
                           console.log("retrieving time facet's members");
                           $.when(squid_api.controller.facetjob.getFacetMembers(filters, timeFacet.id))
                           .always(function() {
                                   console.log("time facet dimension = "+timeFacet.dimension.name);
                                   me.changed(filters.get("selection"), timeFacet);
                               });
                       } else {
                           me.changed(filters.get("selection"), timeFacet);
                       }
                   } else {
                       console.log("WARN: cannot use any time dimension to use for datepicker");
                       me.changed(filters.get("selection"), null);
                   }
               });
           }
       },
        
       refreshFilters : function(selection) {
           var changed = false;
           var f = this.filters;

           var domainOid = this.config.get("domain");
           if (domainOid) {
               f.set({"id": {
                   "projectId": this.config.get("project")
               }}, {
                   "silent" : true
               });
               f.setDomainIds([domainOid], true);
               changed = changed || f.hasChanged();
           } else {
               // reset the domains
               f.setDomainIds(null, true);
               changed = changed || f.hasChanged();
           }

           f.set({"selection": selection}, {
               "silent" : true
           });
           changed = changed || f.hasChanged();

           if (changed === true) {
               this.changed(selection);
           }
       },
       
       changed : function(selection, timeFacet) {
           if (this.onChangeHandler) {
               this.onChangeHandler(selection, timeFacet);
           } else {
               console.log("compute (facetjob changed)");
               squid_api.controller.facetjob.compute(this.filters, selection);
           }
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

            // To populate metrics
            squid_api.model.project.on("change:domains", function() {
                me.render();
            });
            
            if (!this.model) {
                this.model = squid_api.model.config;
            }
            this.model.on("change:domain", function() {
                me.render();
            });

            // listen for global status change
            squid_api.model.status.on("change:status", this.enable, this);
        },

        enable: function() {
            var select = this.$el.find("select");
            var multiSelectDropdown = this.$el.find(".multiselect-container");
            if (select) {
                var isMultiple = true;
                if (this.metricIndex !== null) {
                    isMultiple = false;
                }
                var running = (squid_api.model.status.get("status") != squid_api.model.status.STATUS_DONE);
                if (running) {
                    // computation is running : disable input
                    select.attr("disabled","disabled");
                    if (isMultiple) {
                        select.multiselect('disable');
                        multiSelectDropdown.append("<div class='dropdownDisabled'></div>");
                    }
                } else {
                    // computation is done : enable input
                    select.removeAttr("disabled");
                    if (isMultiple) {
                        select.multiselect('enable');
                        multiSelectDropdown.find(".dropdownDisabled").remove();
                    }
                }
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

                // Remove Button Title Tag
                this.$el.find("button").removeAttr('title');

                // Update
                this.model.set({"chosenMetrics" : selected});
            }
        },

        render: function() {
            var isMultiple = true;

            if (this.metricIndex !== null) {
                isMultiple = false;
            }

            var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};
            
            // iterate through all domains metrics
            var metrics = this.getDomainMetrics();
            if (metrics) {
                for (var idx=0; idx<metrics.length; idx++) {
                    var metric = metrics[idx];
                    // check if selected
                    var selected = this.isChosen(metric);
                    
                    // add to the list
                    var option = {"label" : metric.name, "value" : metric.oid, "selected" : selected};
                    jsonData.options.push(option);
                }
            }

            // Alphabetical Sorting
            jsonData.options.sort(function(a, b) {
                var labelA=a.label.toLowerCase(), labelB=b.label.toLowerCase();
                if (labelA < labelB)
                    return -1;
                if (labelA > labelB)
                    return 1;
                return 0; // no sorting
            });

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            // Initialize plugin
            var selector = this.$el.find("select");
            if (isMultiple) {
                selector.multiselect({
                    buttonText: function(options, select) {
                        return 'Metrics';
                    },
                });
            }

            // Remove Button Title Tag
            this.$el.find("button").removeAttr('title');

            return this;
        },
        
        getDomainMetrics : function() {
            var metrics = [];
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", this.model.get("domain"), "Domain");
            if (domain) {
                metrics = domain.metrics;
            }
            return metrics;
        },
        
        isChosen : function(item) {
            var selected = false;
            var metrics = this.model.get("chosenMetrics");

            if (metrics) {
                for (var j=0; j<metrics.length; j++) {
                    if (item.oid == metrics[j]) {
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
    root.squid_api.view.MetricTotalView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_total_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        selectionModel: null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (options.selectionModel) {
                this.selectionModel = options.selectionModel;
                this.selectionModel.on('change', function() {
                    me.render();
                });
            }

            this.model.on('change', function() {
                me.render();
            });
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        render: function() {
            var isMultiple = true;

            var jsonData = {
                "selAvailable" : true,
                "options" : [],
                "multiple" : isMultiple
            };
            
            // iterate through all model metrics
            var results = this.model.get("results");
            if (!results && (this.model.get("analyses"))) {
                results = this.model.get("analyses")[0].get("results");
            }
            
            if (results) {
                for (var idx = 0; idx < results.cols.length; idx++) {
                    var col = results.cols[idx];
                    // get the total for the metric
                    totalValue = results.rows[0].v[idx];
                    var selected = this.isSelected(col.id);

                    // add to the list
                    var option = {
                        "name" : col.name,
                        "value" : col.id,
                        "total" : {
                            "value" : totalValue,
                            "unit" : null
                        },
                        "selected" : selected
                    };
                    jsonData.options.push(option);
                }
            }


            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            return this;
        },
        
        isSelected : function(id) {
            var selected = false;
            var model = this.selectionModel;
            if (model) {
                var metrics = model.get("metrics");
                if (!metrics && (model.get("analyses"))) {
                    metrics = model.get("analyses")[0].get("metrics");
                }
                if (metrics) {
                    for (var j=0; j<metrics.length; j++) {
                        if (id == metrics[j].metricId) {
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
    root.squid_api.view.MetricView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        
        format : null,
        
        d3Formatter : null,

        selectMetric : false,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.selectMetric) {
                this.selectMetric = options.selectMetric;
            }

            if (d3) {
                this.d3Formatter = d3.format(",.f");
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (this.d3Formatter) {
                    this.format = function(f){
                        if (isNaN(f)) {
                            return f;
                        } else {
                            return me.d3Formatter(f);
                        }
                    };
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }
            
            squid_api.model.project.on("change:domains", function() {
                me.render();
            });
            
            this.model.on("change:domain", function() {
                me.render();
            });
            
            this.model.on("change:chosenMetrics", function() {
                me.render();
            });

            this.model.on("change:selectedMetric", function() {
                me.render();
            });
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            // Dimension Sorting
            "click li": function(item) {
                if (this.selectMetric) {
                    var metrics = this.$el.find(".chosen-metrics li");

                    for (i = 0; i < metrics.length; i++) {
                        $(metrics[i]).removeAttr("data-selected");
                        $(metrics[i]).removeClass("ui-selected");
                    }

                    $(item.currentTarget).addClass("ui-selected");
                    $(item.currentTarget).attr("data-selected", true);

                    var selectedItem = $(item.currentTarget).attr("data-content");
                
                    // Update
                    this.model.set({"selectedMetric" : selectedItem});
                }
            }
        },

        render: function() {
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", this.model.get("domain"), "Domain");
            var jsonData = {"chosenMetrics" : []};
            var chosenMetrics = this.model.get("chosenMetrics");
            if (domain && chosenMetrics) {
                var domainMetrics = domain.metrics;
                for (var cMetrics = 0; cMetrics < chosenMetrics.length; cMetrics++) {
                    for (var dMetrics = 0; dMetrics < domainMetrics.length; dMetrics++) {
                        if (domainMetrics[dMetrics].id.metricId === chosenMetrics[cMetrics]) {
                            // add to the list
                            var option = {
                                "name" : domainMetrics[dMetrics].name,
                                "value" : chosenMetrics[cMetrics],
                                "selectMetric" : this.selectMetric,
                            };
                            jsonData.chosenMetrics.push(option);
                        }
                    }
                }
            }
            if (jsonData.chosenMetrics.length === 0) {
                jsonData.noChosenMetrics = true;
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
    root.squid_api.view.OrderByView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        format : null,
        removeOrderDirection: false,
        orderByDirectionDisplay: null,
        metricList: null,

        initialize : function(options) {
            if (this.model) {
                this.model.on('change', this.render, this);
            }

            if (options.removeOrderDirection) {
                this.removeOrderDirection = options.removeOrderDirection;
            }
            if (options.orderByDirectionDisplay) {
                this.orderByDirectionDisplay = options.orderByDirectionDisplay;
            }
            if (options.metricList) {
                this.metricList = options.metricList;
            }
            
            // To populate metrics
            squid_api.model.project.on("change:domains", this.render, this);

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
                if (event.target.checked !== undefined || event.target.type === "checkbox") {
                    var orderByDirection;
                    if (event.target.checked) {
                        orderByDirection = "DESC";
                    } else {
                        orderByDirection = "ASC";
                    }
                    var orderByList = this.model.get("orderBy");
                    var orderBy;
                    if (orderByList) {
                        orderBy = orderByList[0];
                        this.model.set("orderBy", [{"col" : orderBy.col, "direction" : orderByDirection}]);
                    }
                }
            }
        },

        getDomainMetrics : function() {
            var metrics = [];
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", this.model.get("domain"), "Domain");
            if (domain) {
                metrics = domain.metrics;
            }
            return metrics;
        },

        render : function() {
            var direction = "";
            var me = this;
            
            var orderByList = this.model.get("orderBy");
            if (orderByList) {
                var orderBy = this.model.get("orderBy")[0];
                if (orderBy.direction === "DESC") {
                    direction = "checked";
                }
            }

            var limit = this.model.get("limit");

            var metrics = this.getDomainMetrics();
            var chosenMetrics = this.model.get("chosenMetrics");
            var metricList = [];

            if (this.metricList) {
                var appMetrics = this.metricList;
                for (var idx=0; idx<metrics.length; idx++) {
                    for (ix=0; ix<appMetrics.length; ix++) {
                        var metric1 = metrics[idx];
                        if (appMetrics[ix] === metric1.oid) {
                            var option1 = {"label" : metric1.name, "value" : metric1.oid};
                            metricList.push(option1);
                        }
                    }
                }
            } else if (metrics && chosenMetrics) {
                for (var id=0; id<metrics.length; id++) {
                    var metric = metrics[id];
                    // Match with chosen
                    for (var match=0; match<chosenMetrics.length; match++) {
                        if (metric.oid === chosenMetrics[match]) {
                            var option = {"label" : metric.name, "value" : metric.oid};
                            metricList.push(option);
                        }
                    }
                }
            }

            var jsonData = {"direction" : direction, "limit" : limit, "chosenMetrics" : metricList, "orderByDirectionDisplay" : this.orderByDirectionDisplay, "removeOrderDirection" : this.removeOrderDirection};

            var html = this.template(jsonData);
            this.$el.html(html);

            this.$el.find("select").multiselect({
                onChange: function(option, selected, index) {
                    var metric = option.attr("value");
                    me.model.set({"selectedMetric": metric});
                }
            });

            if (this.model.get("selectedMetric")) {
                this.$el.find("select").multiselect('select', this.model.get("selectedMetric"));
            }

            this.$el.find("select").multiselect("refresh");

            // Set Limit Value
            this.$el.find(".sq-select").val(jsonData.limit);  

            return this;
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ProjectSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_project_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        projects : null,
        onChangeHandler: null,
        projectManipulateRender: null,
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
            if (options.projectManipulateRender) {
                this.projectManipulateRender = options.projectManipulateRender;
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
            } else {
                //init the projects
                this.projects = new squid_api.model.ProjectCollection();
            }
            this.projects.addParameter("deepread","1");
            this.projects.on("reset sync", this.render, this);
            squid_api.model.login.on('change:login', function(model) {
                if (model.get("login")) {
                    // fetch projects
                    me.projects.fetch({
                        success : function(model, response) {
                            console.log(model);
                        },
                        error : function(model, response) {
                            console.log(model);
                        }
                    });
                }
            });
      
            if (!this.model) {
                this.model = squid_api.model.config;
            }
            this.model.on("change:project", this.render, this);

            // if project edit element passed, render it's view
            if (this.projectManipulateRender) {
                this.model.on("change:project", this.editProjectViewRender, this);
                this.editProjectViewRender();
            }
        },

        events: {
            "change .sq-select": function(event) {
                if (this.onChangeHandler) {
                    this.onChangeHandler.call(this,event);
                } else {
                    // default behavior
                    var selectedOid = event.target.value || null;
                    this.model.set({
                        "project" : selectedOid,
                        "domain" : null
                    });
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
                el : $(me.projectManipulateRender),
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

(function (root, factory) {
    root.squid_api.view.SimpleDataExport = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        exportTemplate : null,
        downloadStatus : 0,
        currentJobId : null,
        analysis : null,
        
        initialize : function(options) {
            if (this.model) {
                this.analysis = this.model.get("analysis");
                this.listenTo(this.analysis, 'change', this.render);
                this.listenTo(this.model, 'change:templateData', this.render);
                this.listenTo(this.model, "change:enabled", this.setDownloadBtnState);
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            }
            
            this.exportTemplate = app.template[options.exportTemplate];
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },

        setDownloadBtnState : function() {
            // Loop through passed model to see if any false values exist
            var disabled = this.model.get("enabled") === false;
            var downloadBtn = this.$el.find("#download");
            if (disabled) {
                downloadBtn.addClass("disabled");
            } else {
                downloadBtn.removeClass("disabled");
            }
        },
        
        render : function() {
            
            var me = this;
            var analysis = this.analysis;
                         
             // prepare download link
             this.downloadStatus = 1;
             var downloadBtn = this.$el.find("#download");
             downloadBtn.addClass("disabled");
             
             if (analysis.get("id").projectId) {
                 var downloadAnalysis = new squid_api.model.ProjectAnalysisJob();
                 downloadAnalysis.set(analysis.attributes);
                 downloadAnalysis.set({
                     "id": {
                         "projectId": analysis.get("id").projectId,
                         "analysisJobId": null
                     },
                     "autoRun": false});
                 squid_api.controller.analysisjob.createAnalysisJob(downloadAnalysis, analysis.get("selection"))
                 .done(function(model, response) {
                     me.downloadStatus = 2;
                     me.currentJobId = downloadAnalysis.get("id");
                     // create download link
                     var analysisJobResults = new squid_api.model.ProjectAnalysisJobRender();
                     analysisJobResults.addParameter("format",me.format);
                     if (me.compression) {
                         analysisJobResults.addParameter("compression","gzip");
                     }
     
                     // build the template
                     var velocityTemplate = me.exportTemplate(me.model.get("templateData"));
                     analysisJobResults.setParameter("template", base64.encode(velocityTemplate));
                     analysisJobResults.setParameter("type","text/html");
                     analysisJobResults.setParameter("timeout",null);
                             
                     analysisJobResults.set({
                         "id": me.currentJobId,
                         "oid": downloadAnalysis.get("oid")
                     });
                     console.log("download url : "+analysisJobResults.url());
                     var downloadBtn = me.$el.find("#download");
                     downloadBtn.attr("href",analysisJobResults.url());
                     me.setDownloadBtnState();

                 })
                 .fail(function(model, response) {
                     console.error("createAnalysisJob failed");
                     me.setDownloadBtnState();
                 });
            }

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
        dataToDisplay : 10000,
        format : null,
        d3Formatter : null,
        startDate: null,
        endDate: null,
        colorPalette: null,
        interpolationRange: null,
        yearSwitcherView: null,
        metricSelectorView: null,

        initialize : function(options) {

            if (options.dataToDisplay) {
                this.dataToDisplay = options.dataToDisplay;
            }
            if (options.colorPalette) {
                this.colorPalette = options.colorPalette;
            }
            if (options.interpolationRange) {
                this.interpolationRange = options.interpolationRange;
            }
            if (options.yearSwitcherView) {
                this.yearSwitcherView = options.yearSwitcherView;
            }
            if (options.yearAnalysis) {
                this.yearAnalysis = options.yearAnalysis;
            }
            if (options.metricSelectorView) {
                this.metricSelectorView = options.metricSelectorView;
            }
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_timeseries_widget;
            }
            if (d3) {
                this.d3Formatter = d3.format(",.f");
            }
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (this.d3Formatter) {
                    var me = this;
                    this.format = function(f){
                        if (isNaN(f)) {
                            return f;
                        } else {
                            return me.d3Formatter(f);
                        }
                    };
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }

            if (this.model) {
                this.listenTo(this.model, 'change:status', this.render);
                this.listenTo(this.model, 'change:error', this.render);
            }

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
        
        /**
         * see : http://stackoverflow.com/questions/10966440/recreating-a-removed-view-in-backbone-js
         */
        remove: function() {
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();
            $(window).off("resize");
            return this;
        },

        seriesDataValues : function(dateIndex, metricIndex, modelRows, modelCols) {
            var series = [];
            var value, date;
            var serie;
            var currentSerieName = null;
            var serieName = "";

            var palette = new Rickshaw.Color.Palette();

            if (this.colorPalette) {
                palette.scheme = this.colorPalette;
            }
            
            // Start of Data Manipulation
            var manipTimeStart = new Date();
            var currentYear;

            // Store Serie Values from data
            for (var i=0; (i<modelRows.length); i++) {
                var yearChange = false;

                value = modelRows[i].v;

                if (this.YearOverYear) {
                    if (moment(value[dateIndex]).year() !== currentYear) {
                        yearChange = true;
                        currentYear = moment(value[dateIndex]).year();
                    }
                }

                date = moment.utc(value[dateIndex]);
                
                // Obtain the correct name based on index
                if (dateIndex>0) {
                    serieName = value[dateIndex-1];
                }
                if ((currentSerieName === null) || (serieName != currentSerieName) || yearChange === true) {
                    currentSerieName = serieName;
                    // create a new serie
                    serie = {};
                    if (yearChange) {
                        serie.name = moment(value[dateIndex]).year();
                    } else {
                        serie.name = modelCols[metricIndex].name;
                        serie.color = palette.color();
                    }
                    serie.data = [];
                    series.push(serie);
                }
                
                if (date.isValid()) {
                    var object = {};
                    object.x = moment(date).format("YYYY-MM-DD");
                    if (value[metricIndex] === null) {
                        object.y = 0;
                    } else {
                        object.y = parseFloat(value[metricIndex]);
                    }
                    serie.data.push(object);
                } else {
                    console.debug("Invalid date : "+value[dateIndex]);
                }
            }

            // Inverse Array to obtain Correct Colour
            if (this.YearOverYear) {
                series = series.reverse();
                for (i=0; i<series.length; i++) {
                    series[i].color = palette.color();
                }
            }

            var startDate = moment(this.startDate);

            // Store new Series Values
            var newSerie = {};
            var updatedData = [];

            // Calculate the difference in days between the start / end date
            var dateDifference;
            if (this.interpolationRange) {
                dateDifference = moment(this.endDate).utc().endOf('day').diff(startDate.startOf("day"), this.interpolationRange);
            } else {
                dateDifference = moment(this.endDate).diff(startDate, 'days');
            }

            /*
                Hashmaps with date as object key values / include a default y value of 0
                Add a value for each day
            */

            while (startDate.diff(this.endDate, 'days') <= 0) {
                newSerie[startDate.format("YYYY-MM-DD")] = { y : 0 };
                startDate = startDate.add(1, 'days');
            }

            for (serieIdx=0; serieIdx<series.length; serieIdx++) {
                // Get each serie
                var existingSerie = series[serieIdx].data;

                // Check if there is a difference between numbers of days / serie values
                if (series[serieIdx].data.length !== dateDifference && this.YearOverYear === false) {

                    // Fill in the values from existing serie
                    for (i=0; i<existingSerie.length; i++) {
                        var s = newSerie[existingSerie[i].x];
                        if (s !== undefined) {
                            s.y = existingSerie[i].y;
                        }
                    }

                    // Update the array with the new data
                    var updatedArray = [];
                    for (var key in newSerie) {
                        var obj = {};
                        obj.x = moment.utc(key).unix();
                        obj.y = newSerie[key].y;
                        updatedArray.push(obj);
                    }

                    // Update the existing data
                    series[serieIdx].data = updatedArray;
                } else {
                    
                    // Convert API date into UNIX + Sort if no manipulation occurs
                    for (i=0; i<existingSerie.length; i++) {
                        if (this.YearOverYear) {
                            var modifiedSerie = "2014" + existingSerie[i].x.substring(4);
                            existingSerie[i].x = moment.utc(modifiedSerie).unix();
                        } else {
                            existingSerie[i].x = moment.utc(existingSerie[i].x).unix();
                        }
                    }

                    series[serieIdx].data = this.sortDateValues(series[serieIdx].data);
                }
            }

            // End of Data Manipulation
            var manipTimeEnd = new Date();
            var manipTimeDifference = manipTimeEnd - manipTimeStart;
            console.log("TimeSeries manipulation time: " + manipTimeDifference + " ms");

            return series;
        },

        sortDateValues : function(dates) {
            dates.sort(function(a,b){
                return (a.x - b.x);
            });
            return dates;
        },

        getData: function() {
            var data, analysis;
            
            // Support Mutli / Single Analysis Jobs 
            if (this.model.get("analyses")) {
                if (this.YearOverYear) {
                    analysis = this.model.get("analyses")[1];
                } else {
                    analysis = this.model.get("analyses")[0];
                }
            } else {
                 analysis = this.model;
            }

            data = analysis.toJSON();
            data.done = this.model.isDone();

            return data;
        },

        render : function() {
            var me = this;
            var status = this.model.get("status");
            this.YearOverYear = config.get("YearOverYear");
            
            if (status === "PENDING") {
                this.$el.html(this.template());
                this.$el.find(".sq-loading").hide();
                this.$el.find("#stale").show();
            }
            if (status === "RUNNING") {
                this.$el.find(".sq-loading").show();
            }
            if (status === "DONE") {
                this.$el.html(this.template());
                this.$el.find("#stale").hide();
                this.$el.find(".sq-loading").hide();

                var data = this.getData();

                if (data.done && data.results) {
                    this.$el.find(".sq-loading").hide();

                    // Temp Fix for correct resizing
                    this.$el.css("width", "100%");

                    // Store Start and end Dates
                    var facets = data.selection.facets;
                    for (i=0; i<facets.length; i++) {
                        var items = facets[i].selectedItems;
                        for (ix=0; ix<items.length; ix++) {
                            if (items[ix].lowerBound && items[ix].upperBound) {
                                this.startDate = items[ix].lowerBound;
                                this.endDate = items[ix].upperBound;
                            }
                        }
                    }
                    
                    var dateColumnIndex=0;
                    
                    while (data.results.cols[dateColumnIndex].dataType != "DATE") {
                        dateColumnIndex++;
                    }

                    // Time Series [Series Data]
                    var series = this.seriesDataValues(dateColumnIndex, dateColumnIndex+1, data.results.rows, data.results.cols);
                    var metricName = data.results.cols[dateColumnIndex+1].name;

                    if (series.length>0 && (series[0].data.length>0)) {

                        var tempWidth = this.$el.width();

                        // Time Series Chart
                        var graph = new Rickshaw.Graph({
                            element: document.getElementById("chart"),
                            width: tempWidth,
                            height: 400,
                            renderer: 'line',
                            interpolation: 'linear',
                            strokeWidth: 3,
                            series: series
                        });

                        graph.render();

                        var hoverDetail = new Rickshaw.Graph.HoverDetail( {
                            graph: graph,
                            formatter: function(series, x, y) {
                                var formatter = d3.format(",.f"); 
                                var date;
                                if (config.get("YearOverYear")) {
                                    date = '<span class="date">' + series.name + "-" + moment(new Date(x * 1000)).format("MM-DD") + '</span>';
                                } else {
                                    date = '<span class="date">' + moment(new Date(x * 1000)).format("YYYY-MM-DD") + '</span>';
                                }
                                var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
                                var content = swatch + formatter(parseInt(y)) + " " + metricName + '<br>' + date;

                                return content;
                            }
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

                        yAxis.render();
                        xAxis.render();
                    } else {
                        this.$el.html("<div class='bad-data'>No Series data to View</span>");
                    }
                }
            }
            if (this.yearSwitcherView){
                this.yearSwitcherView.setElement(this.$el.find("#yearswitcher"));
                this.yearSwitcherView.render();
            }
            if (this.metricSelectorView){
                this.metricSelectorView.setElement(this.$el.find("#metricselector"));
                this.metricSelectorView.render();
            }
        }
    });

    return View;
}));
