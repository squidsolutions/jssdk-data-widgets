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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', [ 'jshint', 'clean', 'handlebars', 'concat:js', 'concat:css']);
};