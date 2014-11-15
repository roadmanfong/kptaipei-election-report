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
  /* global Parse */
  Parse.initialize(config.APP_ID, config.APP_JS_KEY);

  var collectionVotes = new CollectionVotes({},{
    geojsonData: villagesData
  });
 
  var viewPie = new ViewPie({
    collection: collectionVotes
  });

  var pollingId;
  window.startPolling = function() {
    console.log('startPolling');
    pollingId = setInterval(function() {
      collectionVotes.fetch({remove: false});
    }, config.POLLING_TIME_MS);
    collectionVotes.fetch({remove: false});
  };
  window.stopPolling = function() {
    console.log('stopPolling');
    clearInterval(pollingId);
  };
  window.startPolling();

  window.collectionVotes = collectionVotes;
});