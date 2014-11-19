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
  /* global Parse */
  Parse.initialize(config.APP_ID, config.APP_JS_KEY);
  var villageA = new ModelVote({
    votes: [0, 0]
  },{
    voteHouseRange: [136, 137]
  });
  var villageB = new ModelVote({
    votes: [0, 0]
  },{
    voteHouseRange: [279, 283]
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
  function fetchAll(){
    collectionVotes.fetch({remove: false});
    villageA.fetchRange();
    villageB.fetchRange();
  }
  var pollingId;
  window.startPolling = function() {
    console.log('startPolling');
    pollingId = setInterval(fetchAll, config.POLLING_TIME_MS);
    fetchAll();
  };
  window.stopPolling = function() {
    console.log('stopPolling');
    clearInterval(pollingId);
  };
  window.startPolling();

  window.collectionVotes = collectionVotes;
});