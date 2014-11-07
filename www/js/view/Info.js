define([
  'app/config',
  'app/toReadableNumber',
  'underscore',
  'backbone',
  'jquery',
  'leaflet'
],function(
  config,
  toReadableNumber,
  _,
  Backbone,
  $,
  L
) {
  var Info = Backbone.View.extend({
    initialize: function(options) {
      var that = this;
      var elm = _.reduce(config.CANDIDATE, function(mem, candidate) {
        return mem + that.template(candidate);
      }, '');
      $("#info .district-vote").html(elm);

      this.maxWidth = parseInt($("#info .bar").first().css('max-width'));
    },
    template: _.template(
      '<li>' +
        '<div class="candidate-number"><%= number %></div>' +
        '<div class="candidate-name"><%= name %></div>' + 
        '<div class="bar" style="background:<%= color %>">&nbsp;</div>' +
        '<div class="vote">&nbsp;</div>' +
      '</li>'
    ),
    update: function (model){
      if(model){
        var votes = model.get('votes');
        var total = _.reduce(votes, function(mem,num){return mem+num;}, 0);
        $("#info .district-name").html(model.get('name'));
        for(var index = 0 ; index < votes.length ; index ++ ){
          var color = config.CANDIDATE[index].color;
          var $li = $('#info li').eq(index);
          $li.find('.vote')
          .html(toReadableNumber(votes[index]));
          $li.find('.bar')
          .width(parseInt(votes[index]*this.maxWidth/total));
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
      // this.toggleInfo();
      this.update();
    }, 10)
  });
  return Info;
});