define([
  'backbone',
],function(
  Backbone
) {
  var Vote = Backbone.Model.extend({
    defaults: {
      id: null,
      name: null,
      highlight: false,
      votes: -1,
      CPTID: null
      // parent:
    }
  });
  return Vote;
});