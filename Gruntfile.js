'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;

var lrSnippet = require('connect-livereload')({ 
  port: LIVERELOAD_PORT 
});

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
}

/*global module:false*/
module.exports = function (grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  var dirConfig = {
    app: 'app',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    // Metadata.  
    dirConfig: dirConfig,
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      sass: {
        files: ['<%= dirConfig.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server']
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%= dirConfig.app %>/*.html>',
          '{.tmp,<%= dirConfig.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= dirConfig.app %>}/scripts/{,*/}*.js',
          '<%= dirConfig.app %>/scripts/templates/{,*/}*.{hbs,ejs,mustache}'
        ]
      },
    },
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, dirConfig.app)
            ];
          }
        },
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect,dirConfig.dist)
            ]
          }
        }
      },
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= dirConfig.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        node: true,
        reporterOutput: '',
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      reporter: require('jshint-stylish'),
      all: [
        'Grunfile.js',
        '<%= dirConfig.app %>}/scripts/{,*}*.js'
      ]
    },
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']  
      },
      dist: {
        files:[{
          expand: true,
          cwd: '<%= dirConfig.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= dirConfig.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },
    requirejs: {
      dist: {
        options : {
			    almond: true,
		  	  replaceRequireScript: [{
			  	  files: ['<%= dirConfig.dist %>/index.html'],
			  	  module: 'main'	
		 	    }],

		  	  modules: [{name: 'main'}],
		  	  baseUrl: '<%= dirConfig.app %>/scripts',
			
			    mainConfigFile: '<%= dirConfig.app %>/scripts/main.js', 

			    keepBuildDir: true,
			    dir: '.tmp/scripts',

			    optimize: 'none',
			    useStrict: true,
			    wrap: true

        }
      }        
	  },
    uglify: {
      dist: {
        files: {
          '<%= dirConfig.dist %>/scripts/main.js': [
            '.tmp/scripts/main.js'
          ]
        }
      }
    },	
    useminPrepare: {
      html: '<%= dirConfig.app %>/index.html',
      options: {
        dest: '<%= dirConfig.dist %>'
      }
    },
    usemin: {
      html: ['<%= dirConfig.dist %>/{,*/}*.html'],
      css: ['<%= dirConfig.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= dirConfig.dist %>']
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= dirConfig.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= dirConfig.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= dirConfig.app %>',
          src: '*.html',
          dest: '<%= dirConfig.dist %>'
        }]
      }
    },
    bower: {
      all: {
        rjsConfig: '<%= dirConfig.app %>/scripts/main.js'  
      }  
    }
  });

  grunt.registerTask('serve', function (target) {
    if(target === 'dist') {
      return grunt.task.run(['build','open:server','connect:dist:keepalive']); 
    }   

    grunt.task.run([
      'clean:server',
      'sass:server',
      'connect:livereload',
      'open:server',
      'watch'
    ]);
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
