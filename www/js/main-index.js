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
  'view/info',
  'view/Map',
  'model/Vote',
  'collection/Votes',
  'view/Pie'
], function(
  config,
  ViewInfo,
  ViewMap, 
  ModelVote,
  CollectionVotes, 
  ViewPie
) {
  Parse.initialize(config.APP_ID, config.APP_JS_KEY);
  var villageA = new ModelVote({
    votes: [123, 456]
  });
  var villageB = new ModelVote({
    votes: [333, 456]
  });
  var collectionVotes = new CollectionVotes({},{
    geojsonData: villagesData
  });
  var viewMap = new ViewMap({
    geojsonData: villagesData,//from tpe-villages.js
    collection: collectionVotes,
  });


  var viewInfo = new ViewInfo({
    map: viewMap.map,
    villageA: villageA,
    villageB: villageB
  });

  viewMap.on('mouseover', viewInfo.onMouseOver.bind(viewInfo));
  viewMap.on('mouseout', viewInfo.onMouseOut.bind(viewInfo));
  // setTimeout(collectionVotes.roll.bind(collectionVotes), 0);

  // collectionVotes.fetch({remove: false});
  // collectionVotes.startPolling();
  window.collectionVotes = collectionVotes;
});