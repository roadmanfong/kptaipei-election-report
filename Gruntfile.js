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
        ignores: ['www/js/main-min.js', 'www/js/lib/*.js'],
        // options here to override JSHint defaults
        jshintrc: '.jshintrc'
      }
    },
    requirejs: {
      compile: {
        options: {
          wrap: true,
          baseUrl: 'www/js',
          include: 'main',
          name: 'lib/almond', // assumes a production build using almond
          out: 'www/js/main-index-min.js',
          mainConfigFile: 'www/js/main-index.js'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['jshint', 'requirejs']);

};