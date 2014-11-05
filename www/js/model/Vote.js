define([
  'app/config',
  'backbone',
],function(
  config,
  Backbone
) {
  var votes = [];

  for(var i = 0 ; i < config.CANDIDATES_NUM ; i++){
    votes.push(-1);
  }

  var Vote = Backbone.Model.extend({
    defaults: {
      id: null,
      name: null,
      opacity: 0.5,
      votes: votes,
      CPTID: null
    }
  });
  return Vote;
});