define([
  'app/config',
  'underscore',
  'backbone',
  'model/Vote'
],function(
  config,
  _,
  Backbone,
  ModelVote
) {
  /*global villagesData*/
  var Votes = Backbone.Collection.extend({
    model: ModelVote,
    url: function (){
      return 'https://spreadsheets.google.com/feeds/list/' + 
      config.SHEET_ID +'/1/public/values?alt=json-in-script&callback=?';
    },
    initialize: function (collection, options){
      var properties = _.pluck(options.geojsonData.features,'properties');
      var districts = {};
      var startValues = _.map(properties, function(property){
        var district = districts[property.CPTID];
        if(!district){
          district = {villages:[]};
          district.name = property.TNAME;
          districts[property.CPTID] = district;//link back when first created
        }
        district.id = property.CPTID;
        district.villages.push(property.CPTVID);
      });
      setTimeout(this.reset.bind(this), 0, _(districts).toArray());
    },
    fetch: function (){
      // console.log('collection fetch!!');
      var that = this;
      $.getJSON(this.url(), function(response) {
        that.set(response, {remove: false, parse: true, silent: true});
        // that.triggerModelsChange();
      });
    },
    parse: function(response) {
      return _.map(response.feed.entry, function(entry) {
        var votes = [
          parseInt(entry['gsx$white']['$t']),
          parseInt(entry['gsx$blue']['$t'])
        ];
        if(votes.length !== config.CANDIDATE.length){
          throw 'collection/votes.js parse function not matched config.CANDIDATE.length';
        }
        return {
          id: entry['gsx$houseid']['$t'].toString(),
          votes: votes
        };
      });
    },
    roll: function (){
      console.log('collection roll!!');
      var result = _.map(collectionVotes.toJSON(), function(modelVote){
        var votes = [];

        for(var i = 0 ; i < config.CANDIDATE.length ; i++){
          votes.push(parseInt(Math.random()*10));
        }

        modelVote.votes = votes;
        return modelVote;
      });
      // console.log(result[0]);
      // console.log(collectionVotes.at(0).get('votes'));
      this.set(result, {silent: true});
      this.trigger('change');
    },
    startPolling: function (){
      clearInterval(this.pollingId);
      this.pollingId = setInterval(this.fetch.bind(this), config.POLLING_TIME_MS);
    },
    stopPolling: function (){
      clearInterval(this.pollingId);
    },
  });
  return Votes;
});