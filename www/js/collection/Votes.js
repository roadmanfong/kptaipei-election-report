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
    url: 'https://api.parse.com/1/classes/DistrictTicket',
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
    parse: function(response) {
      return _.map(response.results, function(object) {
        return {
          id: object.districtId,
          votes: [object.candidate6 || 0, object.candidate7 || 0]
        };
      });
    },
    roll: function (){
      console.log('collection roll!!');
      var result = _.map(this.toJSON(), function(modelVote){
        var votes = [];

        for(var i = 0 ; i < config.CANDIDATE.length ; i++){
          votes.push(parseInt(Math.random()*1000000));
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
      this.pollingId = setInterval(this.fetch.bind(this, {remove: false}), config.POLLING_TIME_MS);
    },
    stopPolling: function (){
      clearInterval(this.pollingId);
    },
  });
  return Votes;
});