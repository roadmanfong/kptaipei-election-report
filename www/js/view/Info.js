define([
  'app/config',
  'underscore',
  'backbone',
  'jquery',
  'leaflet'
],function(
  config,
  _,
  Backbone,
  $,
  L
) {
  var Info = Backbone.View.extend({
    initialize: function(options) {
    },
    update: function (model){
      if(model){
        var votes = model.get('votes');
        var total = _.reduce(votes, function(mem,num){return mem+num;}, 0);
        $("#info .district-name").html(model.get('name'));
        for(var index = 0 ; index < votes.length ; index ++ ){
          var color = config.CANDIDATE[index].color;
          $('#info .votes li').eq(index)
          .html(votes[index]).css({color: color});
          $('#info .bars li').eq(index)
          .width(votes[index]/total*99 + '%')
          .css({background: color});
        }
      }
    },
    toggleInfo: _.debounce(function(model) {
        $("#info").toggle(!!model);
    }, 10),
    onMouseOver: _.debounce(function(e, model) {
      this.toggleInfo(model);
      this.update(model);
    }, 10),
    onMouseOut: _.debounce(function (e, model){
      this.toggleInfo();
      this.update();
    }, 10)
  });
  return Info;
});