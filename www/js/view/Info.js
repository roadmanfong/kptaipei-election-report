define([
  'app/config',
  'app/toReadableNumber',
  'view/Bar',
  'underscore',
  'backbone',
  'jquery',
],function(
  config,
  toReadableNumber,
  ViewBar,
  _,
  Backbone,
  $
) {
  var Info = Backbone.View.extend({
    initialize: function(options) {
      var that = this;

      this.districtBar = new ViewBar({
        el: '#info .district-vote',
        model: new Backbone.Model()
      });

      this.villageABar = new ViewBar({
        el: '#info .village-a-vote',
        model: options.villageA
      });

      this.villageBBar = new ViewBar({
        el: '#info .village-b-vote',
        model: options.villageB
      });
      this.listenTo(this.collection, 'sync', this.renderProgress);
      this.maxWidth = parseInt($('#info .bar').first().css('max-width'));
    },
    originalName: null,
    update: function (model){
      if(model){
        this.updateDistrictName(model.get('name'));
      }
    },
    renderProgress: function (){
      $('#progress-percentage').html(this.collection.getProgress());
    },
    updateDistrictName: _.debounce(function(name) {
      if(this.originalName &&　this.originalName === name){
        return;
      }
      var $districtName = $('#info .district-name');
      if(!this.originalName){
        this.originalName = name;
        $districtName.html(name).show();
        return;
      }
      this.originalName = name;
      $districtName
      .stop(true, false)
      .fadeOut('fast', function() {
        $districtName.html(name);
      })
      .fadeIn('fast');
    }, 100),
    toggleInfo: _.debounce(function(model) {
        $('#info').toggle(!!model);
    }, 10),
    onMouseOver: _.debounce(function(model) {
      this.toggleInfo(model);
      this.update(model);
      this.districtBar.model.set(model.toJSON());
    }, 10),
    onMouseOut: _.debounce(function (model){
      // this.toggleInfo();
      this.update();
    }, 10)
  });
  return Info;
});