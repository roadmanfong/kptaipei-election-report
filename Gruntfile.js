module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'www',
          keepalive: true
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'www/js/*.js'],
      options: {
        ignores: ['www/js/*min.js', 'www/js/lib/*.js'],
        // options here to override JSHint defaults
        jshintrc: '.jshintrc'
      }
    },
    requirejs: {
      options: {
        wrap: true,
        baseUrl: 'www/js',
        name: 'lib/almond', // assumes a production build using almond
      },
      main: {
        options: {
          include: 'main-index',
          out: 'www/js/main-index-min.js',
          mainConfigFile: 'www/js/main-index.js'
        }
      },
      pie: {
        options: {
          include: 'main-pie',
          out: 'www/js/main-pie-min.js',
          mainConfigFile: 'www/js/main-pie.js'
        }
      }
    },
    htmlSnapshot: {
     all: {
       options: {
         snapshotPath: 'snapshots/',
         //This should be either the base path to your index.html file
         //or your base URL. Currently the task does not use it's own
         //webserver. So if your site needs a webserver to be fully
         //functional configure it here.
         sitePath: 'http://localhost:8000/',
         //by default the task waits 500ms before fetching the html.
         //this is to give the page enough time to to assemble itself.
         //if your page needs more time, tweak here.
         msWaitForPages: 1000,
       }
     }
   }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['jshint', 'requirejs']);

};