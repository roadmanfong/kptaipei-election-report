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
      var startValues = _.map(properties, function(property){
        return {
          id: property.CPTVID,
          name: property.TVNAME
        };
      });
      setTimeout(this.reset.bind(this), 0, startValues);
    },
    fetch: function (){
      // console.log('collection fetch!!');
      var that = this;
      $.getJSON(this.url(), function(response) {
        that.set(response, {remove: false, parse: true, silent: true});
        that.triggerModelsChange();
      });
    },
    parse: function(response) {
      return _.map(response.feed.entry, function(entry) {
        // var id = entry['gsx$houseid']['$t'].toString();
        // console.log(id);
        // console.log(collectionVotes.get(id).get('name'));
        return {
          id: entry['gsx$houseid']['$t'].toString(),
          votes: parseInt(entry['gsx$white']['$t']),
          votes2: parseInt(entry['gsx$blue']['$t'])
        };
      });
    },
    triggerModelsChange: function(){
      this.each(function(model){
        model.trigger('change', model);
      });
    },
    setSameZone: function (CPTID, attr){
      this.each(function(_model) {
        if(_model.get('CPTID') === CPTID){
          _model.set(attr);
        }
      });
    },
    getVotes: function(CPTID){
      var sum = 0;
      this.each(function(_model) {
        if(_model.get('CPTID') === CPTID){
          sum = sum + _model.get('votes');
        }
      });
      return sum;
    },
    roll: function (){
      console.log('collection roll!!');
      var properties = _.pluck(villagesData.features,'properties');
      var result = _.map(properties, function(property){
        return {
          id: property.CPTVID,
          name: property.TVNAME,
          votes: parseInt(Math.random()*10)
        };
      });
      // console.log(result[0]);
      // console.log(collectionVotes.at(0).get('votes'));
      this.set(result, {silent: true});
      this.triggerModelsChange();
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