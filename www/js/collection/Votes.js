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
    // url: 'https://api.parse.com/1/functions/GetAllDistrictTicket',
    initialize: function (collection, options){
      options = options || {};
      if(options.geojsonData){
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
      }
    },
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      Parse.Cloud.run('GetAllDistrictTicket', {}, options.success);
    },
    parse: function(response) {
      return _.map(response, function(object) {
        // console.log(object.unfinishedVoteHouse);
        return {
          id: object.districtId,
          votes: [object.candidate6 || 0, object.candidate7 || 0],
          totalVoteHouseCount: object.totalVoteHouseCount,
          unfinishedVoteHouse: object.unfinishedVoteHouse
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
    getTotalVoteHouseCount: function (){
      return this.reduce(function(mem, model) {
        return mem + model.get('totalVoteHouseCount');
      }, 0);
    },
    getUnfinishedVoteHouse: function (){
      return this.reduce(function(mem, model) {
        return mem + model.get('unfinishedVoteHouse');
      }, 0);
    },
    getProgress: function (){
      var noDataNum = this.getUnfinishedVoteHouse();
      var totalNum = this.getTotalVoteHouseCount();
      return  ((totalNum - noDataNum)*100 / totalNum).toFixed(1) + '%';
    },
    getTotal: function (){
      var total = [];

      var initArray = [];
      for(var i = 0; i < config.CANDIDATE.length; i++) {
          initArray.push(0);
      }

      total = _.reduce(this.toJSON(), function(mem, item) {
        return _.each(mem, function(element, index, list) {
          mem[index] += item.votes[index];
        });
      }, initArray);

      return _.map(total, function(value, key, list) {
        return {
          value: value || 1,
          color: config.CANDIDATE[key].color,
          label: config.CANDIDATE[key].name,
          avatar: config.CANDIDATE[key].avatar
        }
      })
    },
  });
  return Votes;
});