jssdk-data-widgets
==================

A collection of data (from AnalysisJobs) visualization and manipulation widgets.

## DataTableView
*Renders an AnalysisJob's results as a Table.*
* model : an Analysis
* options :
  * template : a custom Handlebars template
  * maxRowsPerPage : limits the number of rows displayed (default is 10000)
  * format : a formatter function for metrics (default is `d3.format(",.f");`)

## DomainSelector
*Renders the domains of the API's current project as an INPUT select and modifies the API's current domain if selection changes*
* model : the API's current project (squid_api.model.project)
* options :
  * template : a custom Handlebars template
  * displayAllDomains : if false, do not display domains with empty dimensions or metrics (default is false)

## DimensionSelector
*Renders the dimensions of an analysis as an INPUT select and modifies the analysis dimensions if selection changes*
* model : an Analysis
* options :
  * template : a custom Handlebars template
  * dimensionIdList : a list of dimension oids to filter an order the displayed list
  * dimensionIndex : the index of the dimension which will be changed in the analysis



