define([
  'app/config',
  'backbone',
  'model/Vote'
],function(
  config,
  Backbone,
  ModelVote
) {
  var Votes = Backbone.Collection.extend({
    model: ModelVote,
    url: function (){
      return 'https://spreadsheets.google.com/feeds/list/' + 
      config.SHEET_ID +'/1/public/values?alt=json-in-script&callback=?';
    },
    initialize: function (collection, options){
      var properties = _.pluck(options.geojsonData.features,'properties');
      var startValues = _.map(properties, function(property){
        return {
          id: property.CPTVID,
          name: property.TVNAME,
          votes:0
        }
      });
      setTimeout(this.reset.bind(this), 0, startValues);
    },
    fetch: function (){
      var that = this;
      $.getJSON(this.url(), function(data) {
        var result = _.map(data.feed.entry, function(entry) {
          // var id = entry['gsx$houseid']['$t'].toString();
          // console.log(id);
          // console.log(collectionVotes.get(id).get('name'));
          return {
            id: entry['gsx$houseid']['$t'].toString(),
            votes: parseInt(entry['gsx$white']['$t']),
            votes2: parseInt(entry['gsx$blue']['$t'])
          }
        });
        console.log(result);
        that.set(result, {remove: false});
      });
    },
    roll: function (){
      var properties = _.pluck(villagesData.features,'properties');
      var result = _.map(properties, function(property){
        return {
          id: property.CPTVID,
          name: property.TVNAME,
          votes: parseInt(Math.random()*1000)
        }
      });
      // console.log(result[0]);
      // console.log(collectionVotes.at(0).get('votes'));
      this.set(result);
    },
  });
  return Votes;
});