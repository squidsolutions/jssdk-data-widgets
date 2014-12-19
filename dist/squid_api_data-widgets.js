this["squid_api"] = this["squid_api"] || {};
this["squid_api"]["template"] = this["squid_api"]["template"] || {};

this["squid_api"]["template"]["squid_api_barchart_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"bar_chart\" />";
  });

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
  buffer += "\n        <li class=\"item\" data-content="
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "><i class=\"fa fa-ellipsis-v\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noChosenDimensions), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
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

  buffer += "<ul class=\"widget-selector\">\n    ";
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

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_export_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n		<div>\r\n			<h3>Scripted Download</h3>\r\n			<a id=\"curlbtn\">View</a> cURL commands\r\n			<div id=\"curl\">\r\n				<p>Sample code to download the analysis results using curl shell command.</p>\r\n				<b>1 - get an authentication token</b>\r\n				<p>replace the 'login' and 'password' fields in the following snippet</p>\r\n<pre class=\"curl\">curl '";
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
    + "&login=<b>[login]</b>&password=<b>[password]</b>'</pre>\r\n				<b>2 - download the export</b>\r\n				<p>replace the 'access_token' field in the following snippet by the value of the 'tokenId' field returned by the previous script</p>\r\n<pre class=\"curl\">curl '";
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
    + "</pre>\r\n				<b>3 - view the export</b>\r\n				<p>your analysis results should now be downloaded as</p>\r\n<pre class=\"curl\">ls ";
  if (helper = helpers.curlFileName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.curlFileName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</pre>\r\n			</div>\r\n		</div>\r\n		";
  return buffer;
  }

  buffer += "<div class=\"panel panel-default filter-panel\">\r\n	<div class=\"panel-heading\">\r\n		<button type=\"button\" class=\"close\" data-toggle=\"collapse\"\r\n			data-target=\"";
  if (helper = helpers['data-target']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['data-target']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-clavier=\"true\" aria-hidden=\"true\">\r\n		</button>\r\n		<h4 class=\"panel-title\" id=\"myModalLabel\">Export</h4>\r\n	</div>\r\n	<div class=\"panel-body\">\r\n		<div>\r\n			<label>Format</label> \r\n			<input type=\"radio\" name=\"format\" value=\"csv\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.formatCSV), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "> csv \r\n		</div>\r\n		<div>\r\n			<label>Compression</label> <input type=\"checkbox\" name=\"compression\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.compression), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "> gzip\r\n		</div>\r\n		<div>\r\n			<h3>Direct Download</h3>\r\n			<a href=\"#\" class=\"btn btn-default\" id=\"download\">Download</a> analysis results\r\n		</div>\r\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</div>\r\n</div>\r\n\r\n\r\n\r\n";
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
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"padding: 3px; display: inline-block;\" id=\"";
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

  buffer += "\r\n";
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
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"item "
    + escapeExpression(((stack1 = (depth0 && depth0.selected)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-selected=\""
    + escapeExpression(((stack1 = (depth0 && depth0.attrSelected)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-content=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        	<div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        	<span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.total)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </li>\n    ";
  return buffer;
  }

  buffer += "<ul class=\"chosen-metrics\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.chosenMetrics), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_orderby_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n		<div class=\"pull-right\">\n			<table>\n				<tr>\n					<td>\n						<div class=\"onoffswitch\">\n			    			<input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"myonoffswitch\" ";
  if (helper = helpers.direction) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.direction); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ">\n			    			<label class=\"onoffswitch-label\" for=\"myonoffswitch\">\n			        			<span class=\"onoffswitch-inner\"></span>\n			       				 <span class=\"onoffswitch-switch\"></span>\n			    			</label>\n						</div>\n					</td>\n					<td>\n						&nbsp;\n						<span style=\"font-size : x-large;\">";
  if (helper = helpers.limit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.limit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> <label class=\"records\">Records</label>\n					</td>\n				</tr>\n			</table>\n		</div>\n	";
  return buffer;
  }

  buffer += "<div class=\"orderby-container\">\n	";
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
  


  return "<div class='sq-loading' style='position:absolute; width:100%; top:40%; z-index: 1;'>\n	<div class=\"spinner\">\n	<div class=\"rect5\"></div>\n	<div class=\"rect4\"></div>\n	<div class=\"rect3\"></div>\n	<div class=\"rect2\"></div>\n	<div class=\"rect1\"></div>\n	<div class=\"rect2\"></div>\n	<div class=\"rect3\"></div>\n	<div class=\"rect4\"></div>\n	<div class=\"rect5\"></div>\n	</div>\n</div>\n<div id=\"chart_container\">\n	<div id=\"chart\"></div>\n	<div id=\"legend_container\">\n		<div id=\"smoother\" title=\"Smoothing\"></div>\n		<div id=\"legend\"></div>\n	</div>\n	<div id=\"slider\"></div>\n</div>\n";
  });
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

        mainModel : null,

        initialize : function(options) {
            this.mainModel = options.mainModel;

            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
                this.mainModel.on("change:selectedMetric", this.selectColumn, this);
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
            if (options.selectedMetric) {
                this.selectedMetric = options.selectedMetric;
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
        },

        events : ({
            "click thead th.NUMBER" : function(item) {
                var selectedMetric = $(item.target).attr("data-content");
                this.mainModel.set("selectedMetric", selectedMetric);
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
                })
                .attr("data-content", function(d) {
                    return d.id;
                })
                .attr("class", function(d) {
                    return d.dataType;
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

        selectColumn : function() {
            // Get Table Headers
            var tableHeaders = this.$el.find("table th");

            // Loop over each one and match the value
            for (i=0; i<tableHeaders.length; i++) { 
                if (this.mainModel.get("selectedMetric") == $(tableHeaders[i]).attr("data-content")) {
                    $(tableHeaders[i]).addClass("filtered-by");
                }
            }

            // Add remaining Classes
            this.addMetricClasses();
        },

        render : function() {
            var jsonData, data, rowIdx, colIdx, row, rows, v, analysis;

            var me = this;

            this.$el.html(this.template());
            
            // display
            this.display();
            
            if (!this.model.isDone()) {
                // running
                if (this.model.get("status") == "RUNNING") {
                    $(".sq-loading").show();
                } else {
                    $(".sq-loading").hide();
                }
            } else if (this.model.get("error")) {
                // error
                $(".sq-loading").hide();
            } else {
                $(".sq-loading").hide();
            }

            this.selectColumn();

            this.addMetricClasses();

            return this;
        },

        addMetricClasses : function() {
            var index = [];
            var me = this;
            var columnHeaders = this.$el.find("th");

            for (i=0; i<columnHeaders.length; i++) {
                if ($(columnHeaders[i]).hasClass("NUMBER")) {
                    index.push(i);
                }
            }

            var bodyTr = this.$el.find("tbody tr");

            for (i=0; i<bodyTr.length; i++) {
                var items = $(bodyTr[i]).find("td");

                for (i1=0; i1<index.length; i1++) {
                    for (i2=0; i2<items.length; i2++) {
                        if (i2 === index[i1]) {
                            $(items[i2]).addClass("NUMBER");
                        }
                    }
                }
            }
        },
        
        display : function() {
            var analysis = this.model;

            // in case of a multi-analysis model
            if (analysis.get("analyses")) {
              analysis = analysis.get("analyses")[0];
            }

            var jsonData = analysis.toJSON();
            if (jsonData.results) {
                // apply paging and number formatting
                data = {};
                data.done = this.model.isDone();
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
                
                // build the html datatable
                this.dataTableInsert(data);
                // Initiate the Data Table after render
                this.$el.find(".sq-table").DataTable({
                    "ordering": false,
                    "lengthChange": false,
                    "searching": false
                });
            }
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

            // listen for filters change as we use them to filter out boolean dimensions
            squid_api.model.filters.on("change", function() {
                me.render();
            }); 

        },

        render: function() {
            var isMultiple = true;
            var me = this;

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
                        // do not display boolean dimensions
                        // this is a workaround as the API should return a dimension type
                        var isBoolean = false;
                        var filters = squid_api.model.filters;
                        if (filters ) {
                            var sel = filters.get("selection");
                            if (sel) {
                                var facets = sel.facets;
                                var fi = 0;
                                while ((fi < facets.length) && (!isBoolean)) {
                                    var facet = facets[fi];
                                    fi++;
                                    if (facet.dimension.oid == dim.oid) {
                                        if ((facet.items.length == 1) && (facet.items[0].value == "true")) {
                                            isBoolean = true; 
                                        }
                                    }
                                }
                            }
                        }
                        
                        if (!isBoolean) {
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
                    }
                    
                    for (var dimIdx=0; dimIdx<dimensions.length; dimIdx++) {
                        var dimension = dimensions[dimIdx];
                        // check if selected
                        var selected = this.isChosen(dimension);
                        
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
                 selector.multiselect({
                    buttonText: function(options, select) {
                        return 'Dimensions <span class="caret"></span>';
                    },
                    onChange: function(option, selected, index) {
                        var chosenModel = _.clone(me.model.get("chosenDimensions"));
                        var currentItem = option.attr("value");

                        if (selected) {
                            chosenModel.push(option.attr("value"));
                            me.model.set({"chosenDimensions": chosenModel});
                            me.model.set("selectedDimension", currentItem);
                        } else {
                            // If deselected remove item from array
                            for (var i = chosenModel.length; i--;) {
                                if (chosenModel[i] === currentItem) {
                                    chosenModel.splice(i, 1);
                                }
                            }
                            me.model.set({"chosenDimensions": chosenModel});
                        }
                    }
                });
            }

            // Remove Button Title Tag
            this.$el.find("button").removeAttr('title');

            return this;
        },
        
        isChosen : function(dim) {
            var selected = false;

            var dimensions = this.model.get("chosenDimensions");

            if (dimensions) {
                if (this.dimensionIndex !== null) {
                    if (dim.oid == dimensions[this.dimensionIndex]) {
                        selected = true;
                    }
                } else {
                    for (var j=0; j<dimensions.length; j++) {
                        if (dim.oid == dimensions[j]) {
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

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

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
        },

        render: function() {
            var chosenDimensions = this.model.get("chosenDimensions");
            var jsonData = {"chosenDimensions" : []};
            var html;
            
            // iterate through all domains dimensions
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);

            if (domain) {
                if (domain.dimensions) {
                    var dimensions = [];
                    var dims = domain.dimensions;
                    for (var dc=0; dc<chosenDimensions.length; dc++) {
                        for (var d=0; d<dims.length; d++){
                            var dim = dims[d];
                            if (chosenDimensions[dc] == dims[d].oid) {
                                var item = {};
                                item.id = dims[d].oid;
                                item.value = dims[d].name;
                                dimensions.push(item);
                            }
                        } 
                    }
                    jsonData.chosenDimensions = dimensions;
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

            for (i = 0; i < dimensions.length; i++) {
                if ($(dimensions[i]).attr("data-content") === me.model.get("selectedDimension")) {
                    $(dimensions[i]).attr("data-selected", "true");
                    $(dimensions[i]).addClass("ui-selected");
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
                this.model.on("change:currentAnalysis", this.render, this);
                this.model.on("change:selectedDimension", this.render, this);
                this.model.on("change:timeDimension", this.render, this);
            }
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
            if (analysis == this.tableView.model) {
                currentViewName = "tableView";
            }
            if (analysis == this.barView.model) {
                currentViewName = "barView";
            }
            if (analysis == this.timeView.model) {
                currentViewName = "timeView";
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

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (typeof options.displayAllDomains !== 'undefined') {
                this.displayAllDomains = options.displayAllDomains;
            }

            // init the domains
            this.model = squid_api.model.project;
            this.model.on("change", this.process, this);
        },

        events: {
            "change .sq-select": function(event) {
                var selectedOid = event.target.value;
                // update the current domain
                squid_api.setDomainId(selectedOid);
            }
        },
        
        process : function() {
            var domains = this.model.get("domains");
            if (!squid_api.domainId) {
                squid_api.model.status.on("change:domain", this.render, this);
                if (domains && (domains.length == 1)) {
                    // auto-select the single domain
                    squid_api.setDomainId(domains[0].oid);
                } else {
                    this.render();
                }
            } else {
                this.render();
            }
        },

        render: function() {
            var domain, domains, jsonData = {"selAvailable" : true, "options" : [{"label" : "Select Domain", "value" : "", "selected" : false}]};

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
                    
                    if (!this.displayAllDomains) {
                        // do not display domains with no dimensions nor metrics
                        if ((!domain.dimensions) || (domain.dimensions.length === 0)) {
                            displayed = false;
                        }
                        if ((!domain.metrics) || (domain.metrics.length === 0)) {
                            displayed = false;
                        }
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
    root.squid_api.view.DataExport = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    View = Backbone.View.extend( {

        template : null,
        renderTo: null,
        format : "csv",
        compression : true,
        downloadStatus : 0,
        curlCollapsed : true,
        
        initialize : function(options) {
            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_export_widget;
            }
            if (options.renderTo) {
                this.renderTo = options.renderTo;
            }
        },

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },
        
        clickedFormat : function (event) {
            var t = event.target;
            this.format = t.value;
            this.render();
        },
        
        clickedCompression : function (event) {
            var t = event.target;
            this.compression = (t.checked);
            this.render();
        },
        
        download : function(event) {
            var me = this, analysis = this.model;
      
            if (this.downloadStatus === 0) {
                event.preventDefault();
                this.downloadStatus = 1;
                this.$el.find("#download").html("Computing...");
                var downloadAnalysis = new squid_api.model.ProjectAnalysisJob();
                downloadAnalysis.set({
                   "id": {
                        "projectId": analysis.get("id").projectId,
                        "analysisJobId": null
                    },
                    "domains": analysis.get("domains"),
                    "dimensions" : analysis.get("dimensions"),
                    "metrics" : analysis.get("metrics"),
                    "orderBy": analysis.get("orderBy")
                    });
                downloadAnalysis.addParameter("timeout",null);
                squid_api.controller.analysisjob.createAnalysisJob(downloadAnalysis, analysis.get("selection"))
                    .done(function(model, response) {
                        me.downloadStatus = 2;
                        // create download link
                        var analysisJobResults = new squid_api.model.ProjectAnalysisJobResult();
                        analysisJobResults.addParameter("format",me.format);
                        if (me.compression) {
                            analysisJobResults.addParameter("compression","gzip");
                        }
                        analysisJobResults.set({
                                "id": downloadAnalysis.get("id"),
                                "oid": downloadAnalysis.get("oid")
                            });
                        console.log(analysisJobResults.url());
                        me.$el.find("#download").html("Click this link to download");
                        me.$el.find("#download").attr("href",analysisJobResults.url());
                        me.$el.find("#download").removeClass("btn-default");
                        me.$el.find("#download").addClass("btn-link");
                    })
                    .fail(function(model, response) {
                        console.error("createAnalysisJob failed");
                    });
            } else {
                me.downloadStatus = 0;
                me.$el.find("#download").html("Download");
                me.$el.find("#download").removeClass("btn-link");
                me.$el.find("#download").addClass("btn-default");
            }
        },
        
        render : function() {
            var me = this, analysis = this.model;

            // render the curl snippet
            var exportAnalysis = new squid_api.model.ProjectAnalysisJob();
            exportAnalysis.addParameter("format",this.format);
            if (this.compression) {
                exportAnalysis.addParameter("compression","gzip");
            }
            exportAnalysis.addParameter("access_token","[access_token]");
            exportAnalysis.set({
               "id": {
                    "projectId": analysis.get("id").projectId,
                    "analysisJobId": null
                },
                "domains": analysis.get("domains"),
                "dimensions" : analysis.get("dimensions"),
                "metrics" : analysis.get("metrics"),
                "selection": analysis.get("selection"),
                "orderBy": analysis.get("orderBy")
                });

            // escape all spaces in the json injected into cURL
            var data = JSON.stringify(exportAnalysis).replace(/\'/g, '\\\'');
            
            this.$el.html(this.template({
                "data-target" : this.renderTo,
                "formatCSV": (this.format == "csv"),
                "formatJSON": (this.format == "json"),
                "compression": (this.compression),
                "curl": exportAnalysis.url().replace(/\[access_token\]/g, '<b>[access_token]</b>'),
                "curlFileName" : "analysis."+((this.format == "csv")?"csv":"")+((this.format == "json")?"json":"")+((this.compression)?".gz":""),
                "origin": "https://api.squidsolutions.com",
                "data": data,
                "customerId" : squid_api.customerId,
                "clientId" : squid_api.clientId,
                "redirectURI":"https://api.squidsolutions.com",
                "apiURL":squid_api.apiURL
                })
            );
            
            // apply cURL panel state
            if (me.curlCollapsed) {
                me.$el.find('#curl').hide();
            } else {
                me.$el.find('#curl').show();
            }
            
            this.$el.find("#curlbtn").click(function() {
                me.curlCollapsed = !me.curlCollapsed;
                if (me.curlCollapsed) {
                    me.$el.find('#curl').hide();
                } else {
                    me.$el.find('#curl').show();
                }
            });
            
            // register click handlers
            this.$el.find("#download").click(
                    function(event) {
                        me.download(event);
                    });
            this.$el.find('[name="format"]').click(
                    function(event) {
                        me.clickedFormat(event);
                    });
            this.$el.find('[name="compression"]')
                    .click(function(event) {
                        me.clickedCompression(event);
                    });

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

            if (this.model) {
                this.model.on("change:chosenMetrics", function() {
                    me.render();
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

            if (this.$el.find("select").length > 0) {

            } else {
                var html = this.template(jsonData);
                this.$el.html(html);
                this.$el.show();

                // Initialize plugin
                var selector = this.$el.find("select");
                if (isMultiple) {
                    selector.multiselect({
                        buttonText: function(options, select) {
                            return 'Metrics <span class="caret"></span>';
                        },
                    });
                }

                // Remove Button Title Tag
                this.$el.find("button").removeAttr('title');
            }

            return this;
        },
        
        getDomainMetrics : function() {
            var metrics;
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);
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

        initialize: function(options) {
            var me = this;

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
            
            if (this.model) {
                this.model.on("change:chosenMetrics", function() {
                    me.render();
                });

                this.model.on("change:selectedMetric", function() {
                    me.render();
                });

                this.model.get("totalAnalysis").on("change:results", function() {
                    me.render();
                });
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        events: {
            // Dimension Sorting
            "click li": function(item) {
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
        },

        render: function() {

            var results;
            var currentAnalysis = this.model.get("totalAnalysis");
            var chosenMetrics   = this.model.get("chosenMetrics");
            var selectedMetric  = this.model.get("selectedMetric");
            var jsonData        = {"chosenMetrics" : []};

            if (currentAnalysis) {
                results = currentAnalysis.get("results");
            }
            
            // iterate through all domains dimensions
            var domain = squid_api.utils.find(squid_api.model.project.get("domains"), "oid", squid_api.domainId);

            if (results) {
                for (var idx = 0; idx < results.cols.length; idx++) {

                    for (var cm = 0; cm < chosenMetrics.length; cm++) {
                        var col = results.cols[idx];

                        if (chosenMetrics[cm] === col.id) {
                            // get the total for the metric
                            totalValue = results.rows[0].v[idx];
                            if (col.dataType == "NUMBER") {
                                totalValue = this.format(totalValue);
                            }

                            var selected, attrSelected;

                            if (selectedMetric === col.id) {
                                selected     = "ui-selected";
                                attrSelected = "true";
                            } else {
                                selected     = "";
                                attrSelected = "";
                            }

                             // add to the list
                            var option = {
                                "name" : col.name,
                                "value" : col.id,
                                "selected" : selected,
                                "attrSelected" : attrSelected,
                                "total" : {
                                    "value" : totalValue,
                                    "unit" : null
                                }
                            };
                            jsonData.chosenMetrics.push(option);
                        }
                    }
                }
                var html = this.template(jsonData);
                this.$el.html(html);
                this.$el.show();
            }

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
            var limit = null;
            if (this.model.get("currentAnalysis")) {
                limit = this.model.get("currentAnalysis").get("limit");
            }

            var jsonData = {"direction" : checked, "limit" : limit};

            var html = this.template(jsonData);
            this.$el.html(html);
             
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

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            // init the projects
            this.model.on("reset sync", this.process, this);
        },

        events: {
            "change .sq-select": function(event) {
                var selectedOid = event.target.value;
                // update the current project
                squid_api.setProjectId(selectedOid);
            }
        },
        
        process : function() {
            if (!squid_api.projectId) {
                squid_api.model.status.on("change:project", this.render, this);
                if ((this.model.size() == 1)) {
                    // auto-select the single project
                    squid_api.setProjectId(this.model.at(0).get("oid"));
                } else {
                    this.render();
                }
            } else {
                this.render();
            }
        },

        render: function() {
            // display

            var project, jsonData = {"selAvailable" : true, "options" : [{"label" : "Select Project", "value" : "", "selected" : false}]};

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
        dataToDisplay : 10000,
        
        format : null,
        
        d3Formatter : null,

        initialize : function(options) {
            
            if (this.model) {
                this.listenTo(this.model, 'change:status', this.update);
                this.listenTo(this.model, 'change:error', this.render);
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

        update : function() {

            if (!this.model.isDone()) {
                // running
                if (this.model.get("status") == "RUNNING") {
                    $(".sq-loading").show();
                } else {
                    $(".sq-loading").hide();
                }
            } else if (this.model.get("error")) {
                // error
                $(".sq-loading").hide();
            }

            this.render();
        },

        seriesDataValues : function(dateIndex, metricIndex, modelData) {
            var series = [];
            var value, date;
            var serie;
            var currentSerieName = null;
            var serieName = "";
            var palette = new Rickshaw.Color.Palette({ scheme: 'cool' });
            
            for (var i=0; (i<modelData.length); i++) {
                value = modelData[i].v;
                date = moment.utc(value[dateIndex]);
                
                // deal with series
                if (dateIndex>0) {
                    serieName = value[dateIndex-1];
                }
                if ((currentSerieName === null) || (serieName != currentSerieName)) {
                    currentSerieName = serieName;
                    // create a new serie
                    serie = {};
                    serie.color = palette.color();
                    serie.name = currentSerieName;
                    serie.data = [];
                    series.push(serie);
                }
                
                if (date.isValid()) {
                    var object = {};
                    // Convert date value into unix
                    object.x = date.unix();
                    object.y = parseFloat(value[metricIndex]);
                    serie.data.push(object);
                } else {
                    console.debug("Invalid date : "+value[dateIndex]);
                }
            }
            
            // sort series data
            for (var j=0; j<series.length; j++) {
                series[j].data = this.sortDateValues(series[j].data);
            }
            return series;
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

        sortDateValues : function(dates) {
            dates.sort(function(a,b){
                return (a.x - b.x);
            });
            return dates;
        },

        render : function() {

            var me = this;

            var data = this.getData();

            if (data.done) {
                
                // Print Template
                this.$el.html(this.template());
                
                var dateColumnIndex=0; 
                while (data.results.cols[dateColumnIndex].dataType != "DATE") {
                    dateColumnIndex++;
                }

                // Time Series [Series Data]
                var series = this.seriesDataValues(dateColumnIndex, dateColumnIndex+1, data.results.rows);
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
                        series: series
                    });

                    graph.render();

                    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
                        graph: graph,
                        xFormatter: function(x) { return "Date: " + moment.utc(x, 'X').format('YYYY-MM-DD');},
                        yFormatter: function(y) { return Math.floor(y); },
                        formatter: function(series, x, y) {
                            var content = "";
                            if (series.name) {
                                content = series.name + ": ";
                            }
                            content += me.format(y) + " " + metricName;
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
                    this.$el.html("<div class='bad-data'>Time Series incompatible, please choose another</span>");
                }
                $(".sq-loading").hide();
                return this;
            }
        }
    });

    return View;
}));
