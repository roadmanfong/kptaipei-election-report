requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'lib/jquery-2.1.1.min',
    'underscore': 'lib/underscore-min',
    'backbone': 'lib/backbone-min',
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
        exports: '_'
    },
  }
});
requirejs([
  'view/Map'
],function(Map) {
  var map = new Map();
});