/*global requirejs, villagesData, window*/

requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'lib/jquery-2.1.1.min',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'leaflet': 'lib/leaflet',
    'parse': 'lib/parse-1.3.1'
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
    },
    'parse': {
      exports: 'Parse'
    }
  }
});
requirejs([
  'app/config',
  'parse',
  'view/Map',
  'collection/Votes',
  'view/Pie'
],function(
  config,
  Parse,
  ViewMap,
  CollectionVotes,
  ViewPie
) {
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