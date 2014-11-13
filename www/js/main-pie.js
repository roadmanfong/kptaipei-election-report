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
  'collection/Votes',
  'view/Pie'
],function(config, ViewMap, CollectionVotes, ViewPie) {
  Parse.initialize(config.APP_ID, config.APP_JS_KEY);

  var collectionVotes = new CollectionVotes({},{
    geojsonData: villagesData
  });
 
  setTimeout(collectionVotes.roll.bind(collectionVotes), 0);

  var viewPie = new ViewPie({
    collection: collectionVotes
  });
  // collectionVotes.fetch({remove: false});
  // collectionVotes.startPolling();
  window.collectionVotes = collectionVotes;
});