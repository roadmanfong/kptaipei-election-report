define([
  'json!config.json',
  'app/toReadableNumber',
  'underscore',
  'backbone',
  'jquery',
],function(
  config,
  toReadableNumber,
  _,
  Backbone,
  $
) {
  var Bar = Backbone.View.extend({
    initialize: function(options) {
      var that = this;
      //render each bar of candidate
      var elm = _.reduce(config.CANDIDATE, function(mem, candidate) {
        return mem + that.template(candidate);
      }, '');
      this.$el.html(elm);

      this.maxWidth = parseInt(this.$el.find('.bar').first().css('max-width'));

      this.listenTo(this.model, 'change reset', this.update);
      this.update();
    },
    template: _.template(
      '<li>' +
        '<div class="candidate-number"><%= number %></div>' +
        '<div class="candidate-name"><%= name %></div>' + 
        '<div class="bar" style="background:<%= color %>">&nbsp;</div>' +
        '<div class="vote">&nbsp;</div>' +
      '</li>'
    ),
    originalName: null,
    update: function (){
      var votes = this.model.get('votes');
      var total = _.reduce(votes, function(mem,num){
        return mem + num;
      }, 0);

      _.each(votes, _.bind(function(value, index) {
        var $li = this.$el.find('li').eq(index);
        $li.find('.vote')
        .html(toReadableNumber(value));
        $li.find('.bar')
        .width(parseInt(value*this.maxWidth/total));
      }, this));
      
    }
  });
  return Bar;
});