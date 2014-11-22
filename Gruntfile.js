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
    autoshot: {
      map: {
        options: {
          path: 'snapshot',
          // remote: {
          //   files: [
          //     { src: "http://localhost:8000", dest: "google.png", delay: 3000 }
          //   ]
          // },
          local: {
            path: './www',
            port: 8080,
            files: [
              { src: 'index.html', dest: 'screenshot.jpg', delay: 10000}
            ]
          }
        }
      
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['jshint', 'requirejs']);

};