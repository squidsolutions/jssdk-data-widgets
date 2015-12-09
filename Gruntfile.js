module.exports = function(grunt) {
    grunt
            .initConfig({
                jshint : {
                    all : [ 'src/*.js' ],
		    options : {
  			 jshintrc: '.jshintrc',
			 force: true
		    }
                },
                clean : {
                    all : "dist/"
                },
                concat : {
                    options : {
                        stripBanners : true,
                    },

                        css : {
                            src : ['src/*.css' ],
                            dest : 'dist/squid_api_data-widgets.css',
                        },
                        js : {
                            src : [ 'build/templates.js',
                                'src/*.js' ],
                            dest : 'dist/squid_api_data-widgets.js',

                    },
                    dev:{
                        files: {
                            'dist/squid_api_barchart_widget.js': ['dist/squid_api_barchart_widget_template.js','src/squid_api_barchart_widget.js'],
                            'dist/squid_api_datatable_widget.js': ['dist/squid_api_datatable_widget_template.js','src/squid_api_datatable_widget.js'],
                            'dist/squid_api_dimension_selector_widget.js': ['dist/squid_api_dimension_selector_widget_template.js', 'src/squid_api_dimension_selector_widget.js'],
                            'dist/squid_api_dimension_widget.js': ['dist/squid_api_dimension_widget_template.js', 'src/squid_api_dimension_widget.js'],
                            'dist/squid_api_displaytype_selector_widget.js': ['dist/squid_api_displaytype_selector_widget_template.js', 'src/squid_api_displaytype_selector_widget.js'],
                            'dist/squid_api_domain_selector_widget.js': ['dist/squid_api_domain_selector_widget_template.js', 'src/squid_api_domain_selector_widget.js'],
                            'dist/squid_api_export_widget.js': ['dist/squid_api_export_widget_template.js', 'src/squid_api_export_widget.js'],
                            'dist/squid_api_export_scheduler_widget.js': ['dist/squid_api_export_scheduler_widget_template.js', 'src/squid_api_export_scheduler_widget.js'],
                            'dist/squid_api_kpi_widget.js': ['dist/squid_api_kpi_widget_template.js', 'src/squid_api_kpi_widget.js'],
                            'dist/squid_api_metric_selector_widget.js': ['dist/squid_api_metric_selector_widget_template.js', 'src/squid_api_metric_selector_widget.js'],
                            'dist/squid_api_metric_total_widget.js': ['dist/squid_api_metric_total_widget_template.js', 'src/squid_api_metric_total_widget.js'],
                            'dist/squid_api_metric_widget.js': ['dist/squid_api_metric_widget_template.js', 'src/squid_api_metric_widget.js'],
                            'dist/squid_api_orderby_widget.js': ['dist/squid_api_orderby_widget_template.js', 'src/squid_api_orderby_widget.js'],
                            'dist/squid_api_project_selector_widget.js': ['dist/squid_api_project_selector_widget_template.js', 'src/squid_api_project_selector_widget.js'],
                            'dist/squid_api_timeseries_widget.js': ['dist/squid_api_timeseries_widget_template.js', 'src/squid_api_timeseries_widget.js'],
                        },
                    }
                },
                copy: {
                    devDist: {
                        files: [{
                            expand: true,
                            flatten: true,
                            src : [ 'src/*.js' ],
                            dest: 'dist'
                        }]
                    }
                },
                sass: {
                    dist: {
                        files: {
                            'dist/squid_api_data-widgets.css': 'src/*.scss'
                        },
                        options: {
                            sourcemap: 'none'
                        }
                    }
                },
                handlebars : {
                    options : {
                        namespace : 'squid_api.template',
                        processName : function(filePath) {
                            return filePath.replace(/^.*\//, '').replace(
                                    /\.hbs$/, '');
                        }
                    },
                    all : {
                        files : {
                            "build/templates.js" : [ "src/*.hbs" ]
                        }
                    },
                    dev : {
                        files : {
                            'dist/squid_api_barchart_widget_template.js': ['src/squid_api_barchart_widget.hbs'],
                            'dist/squid_api_datatable_widget_template.js': ['src/squid_api_datatable_widget.hbs'],
                            'dist/squid_api_dimension_selector_widget_template.js': ['src/squid_api_dimension_selector_widget.hbs'],
                            'dist/squid_api_dimension_widget_template.js': ['src/squid_api_dimension_widget.hbs'],
                            'dist/squid_api_displaytype_selector_widget_template.js': ['src/squid_api_displaytype_selector_widget.hbs'],
                            'dist/squid_api_domain_selector_widget_template.js': ['src/squid_api_domain_selector_widget.hbs'],
                            'dist/squid_api_export_widget_template.js': ['src/squid_api_export_widget.hbs'],
                            'dist/squid_api_export_scheduler_widget_template.js': ['src/squid_api_export_scheduler_widget.hbs'],
                            'dist/squid_api_kpi_widget_template.js': ['src/squid_api_kpi_widget.hbs'],
                            'dist/squid_api_metric_selector_widget_template.js': ['src/squid_api_metric_selector_widget.hbs'],
                            'dist/squid_api_metric_total_widget_template.js': ['src/squid_api_metric_total_widget.hbs'],
                            'dist/squid_api_metric_widget_template.js': ['src/squid_api_metric_widget.hbs'],
                            'dist/squid_api_orderby_widget_template.js': ['src/squid_api_orderby_widget.hbs'],
                            'dist/squid_api_project_selector_widget_template.js': ['src/squid_api_project_selector_widget.hbs'],
                            'dist/squid_api_timeseries_widget_template.js': ['src/squid_api_timeseries_widget.hbs'],
                        }
                    }
                },
                watch : {
                    js : {
                        files : [ 'src/**/*.*' ],
                        tasks : [ 'default' ]
                    }
                }
            });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('devDist', [ 'jshint', 'clean', 'handlebars:dev', 'copy:devDist', 'concat:dev' ]);

    grunt.registerTask('default', [ 'jshint', 'clean', 'handlebars', 'concat:js', 'concat:css']);
};
