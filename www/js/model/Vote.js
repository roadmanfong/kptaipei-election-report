define([
  'app/config',
  'backbone',
],function(
  config,
  Backbone
) {
  var votes = [];

  for(var i = 0 ; i < config.CANDIDATE.length ; i++){
    votes.push(0);
  }

  var Vote = Backbone.Model.extend({
    defaults: {
      id: null,//CPTID
      name: null,
      opacity: config.DEFAULT_STYLE.opacity,
      color: config.DEFAULT_STYLE.color,
      votes: votes,
      villages: [],
      layers: null
    },
    initialize: function (model, options){
      options = options || {};
      if(options.voteHouseRange){
        this.voteHouseMin = options.voteHouseRange[0];
        this.voteHouseMax = options.voteHouseRange[1];
      }
    },
    fetchRange: function(options){
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var model = this;

      var VoteHouseObject = Parse.Object.extend("TicketInfoObject");
      var query = new Parse.Query(VoteHouseObject);
      query.lessThanOrEqualTo("voteHouseId", this.voteHouseMax);
      query.greaterThanOrEqualTo("voteHouseId", this.voteHouseMin);

      options.success = function(results) {
        var candidate6 = 0;
        var candidate7 = 0;
        for (var i = 0; i < results.length; i++) { 
          candidate6 += results[i].get("candidate6");
          candidate7 += results[i].get("candidate7");
        }
        var resp = {
          votes:[candidate6, candidate7]
        }

        var method = options.reset ? 'reset' : 'set';
        model[method](resp, options);
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      query.find({
        success: options.success,
        error: function(error) {
          console.error("Error: " + error.code + " " + error.message);
        }
      }); 
    }
  });
  return Vote;
});