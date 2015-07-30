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
  * paging : if set to true this will activate pagination on the data table
  * ordering : if set to true this will allow the user to click on the table headers to set analysis OrderBy
  * ignoreColumns : specify with an integer, the number of columns to ignore from the left when setting the orderBy for the analysis
  * staleMessage : "Message to be displayed when the analysis is in a pending state"

## DomainSelector
*Renders the domains of the API's current project as an INPUT.  Selects and modifies the API's current domain if selection changes*
* model : the API's current project (squid_api.model.project)
* options :
  * template : a custom Handlebars template
  * displayAllDomains : if false, do not display domains with empty dimensions or metrics (default is false)

## ProjectSelector
*Renders the available projects of the API as an INPUT.  Selects and modifies the API's current project if selection changes*
* model : an Analysis
* options :
  * template : a custom Handlebars template
  * projectManipulateRender : allows new projects to be created / modified directly from the project selector (takes a DOM element)
  * projectAutomaticLogin : if a new project is being created then automatically log the user in if set to true

## DimensionSelector
*Renders the dimensions of the current Domain as an INPUT.  Selects and modifies the model if selection changes.  Optionally works as a single selection*
* model : an array of Dimensions
* options :
  * template : a custom Handlebars template
  * dimensionIdList : a list of dimension oids to filter an order the displayed list
  * dimensionIndex : the index of the dimension which will be changed in the model (single selection mode)

## DimensionWidget
*Displays the list of selected dimensions*
* model : selectedDimensions / chosenDimensions
* options :
  * template : a custom Handlebars template
  * selectDimension : if set to true, this permits the ability to change the selectedDimensions within the model

## ExportWidget
*Exports a complete dataset*
* model : exportAnalysis
* options :
  * template : a custom Handlebars template
  * displayInAccordion : if set to true, this provides a button to click which opens the export panel in an accordion

## MetricSelectorView
*Renders the metrics of an analysis as an INPUT.  Select and modifies the analysis metrics if selection changes.*
* model : an Analysis
* options :
  * template : a custom Handlebars template
  * metricIdList : a list of metric oids to filter an order the displayed list
  * metricIndex : the index of the metric which will be changed in the analysis

## MetricWidget
*Renders metric's which have been selected*
* model : selectedMetric
* options :
  * template : a custom Handlebars template
  * displayMetricValue : if set to true, will display the value of the metric when shown
  * selectMetric : if set to true will allow the metric to be selected and update the model 'selectedMetric'

## MetricTotalView
*Renders a total number for each metric*
* model : an Analysis which computes the total for each metric
* options :
  * template : a custom Handlebars template
  * selectionModel : an Analysis used to display current selected metrics

## BarChartView
*Renders an AnalysisJob's results as a Bar Chart.*
* model : an Analysis
* options :
  * template : a custom Handlebars template
  * format : a formatter function for number values (default is `d3.format(",.f");`)

## OrderByView
*Sets the Main Model's order by direction to Ascending / Descending. *
* model : an Order By Direction value
* options :
  * template : a custom Handlebars template
  * format : a formatter function for number values (default is `d3.format(",.f");`)

## TimeSeriesView
*Renders an AnalysisJob's results as a time series chart. (Relies on a date) *
* model : an Analysis
* options :
  * template : a custom Handlebars template
  * format : a formatter function for number values (default is `d3.format(",.f");`)
  * staleMessage : "Message to be displayed when the analysis is in a pending state"
