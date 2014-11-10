/*global requirejs, villagesData, window*/

requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'lib/jquery-2.1.1.min',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'leaflet': 'lib/leaflet',
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'leaflet':{
      exports: 'L'
    }
  }
});
requirejs([
  'app/config',
  'view/Map',
  'collection/Votes'
],function(config, ViewMap, CollectionVotes) {
  var collectionVotes = new CollectionVotes({},{
    geojsonData: villagesData
  });
  var viewMap = new ViewMap({
    geojsonData: villagesData,//from tpe-villages.js
    collection: collectionVotes
  });
  $.ajaxSetup({
    headers:{
      "X-Parse-Application-Id": config.APP_ID,
      "X-Parse-REST-API-Key": config.APP_KEY
    }
  });
  setTimeout(function(){
    collectionVotes.roll();
  }, 0);
  // collectionVotes.fetch({remove: false});
  // collectionVotes.startPolling();
  window.collectionVotes = collectionVotes;
});