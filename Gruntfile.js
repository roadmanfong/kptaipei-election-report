module.exports = function(grunt) {

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
      files: ['js/*.js'],
      options: {
        // options here to override JSHint defaults
        jshintrc: '.jshintrc'
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};