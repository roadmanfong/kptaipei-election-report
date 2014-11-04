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
  'view/Map',
  'collection/Votes'
],function(ViewMap, CollectionVotes) {
  var collectionVotes = new CollectionVotes({},{
    geojsonData: villagesData
  });
  var viewMap = new ViewMap({
    geojsonData: villagesData,//from tpe-villages.js
    collection: collectionVotes
  });

  window.roll = function() {
    var properties = _.pluck(villagesData.features,'properties');
    var result = _.map(properties, function(property){
      return {
        id: property.CPTVID,
        name: property.TVNAME,
        votes: parseInt(Math.random()*1000)
      }
    });
    collectionVotes.set(result);
    console.log(collectionVotes.at(0).get('votes'));
  }
  window.collectionVotes = collectionVotes;
});