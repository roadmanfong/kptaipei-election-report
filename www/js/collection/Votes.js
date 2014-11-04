define([
  'backbone',
  'model/Vote'
],function(
  Backbone,
  ModelVote
) {
  var Votes = Backbone.Collection.extend({
    model: ModelVote,
    initialize: function (collection, options){
      var properties = _.pluck(options.geojsonData.features,'properties');
      var startValues = _.map(properties, function(property){
        return {
          id: property.CPTVID,
          name: property.TVNAME,
          votes:0
        }
      });
      setTimeout(function(){
        //body
        this.reset(startValues);
      }.bind(this), 0);
    }
  });
  return Votes;
});