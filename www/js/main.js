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
    console.log(result[0]);
    collectionVotes.set(result);
    console.log(collectionVotes.at(0).get('votes'));
  }
  window.collectionVotes = collectionVotes;
  var sheetAPI = 'https://spreadsheets.google.com/feeds/list/1Yx3j01MB6ISSvIjolv0hS33X4YOo2cbeQDb2bKPF2kM/1/public/values?alt=json-in-script&callback=?'
  $.getJSON(sheetAPI, function(data) {
    var result = _.map(data.feed.entry, function(entry) {
      var id = entry['gsx$houseid']['$t'].toString();
      debugger;
      console.log(id);
      console.log(collectionVotes.get(id).get('name'));
      return {
        id: entry['gsx$houseid']['$t'].toString(),
        votes: parseInt(entry['gsx$white']['$t']),
        votes2: parseInt(entry['gsx$blue']['$t'])
      }
    });

    console.log(result);
    collectionVotes.set(result, {remove: false, merge: true});
  });
});


