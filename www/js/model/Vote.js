define([
  'backbone',
],function(
  Backbone
) {
  var Vote = Backbone.Model.extend({
    defaults: {
      id: null,
      name: null,
      opacity: 0.5,
      votes: -1,
      CPTID: null
      // parent:
    }
  });
  return Vote;
});