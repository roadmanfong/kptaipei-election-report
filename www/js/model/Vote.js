define([
  'app/config',
  'backbone',
],function(
  config,
  Backbone
) {
  var votes = [];

  for(var i = 0 ; i < config.CANDIDATE.length ; i++){
    votes.push(-1);
  }

  var Vote = Backbone.Model.extend({
    defaults: {
      id: null,//CPTID
      name: null,
      opacity: 0.5,
      votes: votes,
      villages: [],
      layers: null
    }
  });
  return Vote;
});