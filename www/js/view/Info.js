define([
  'backbone',
  'leaflet'
],function(
  Backbone,
  L
) {
  var Info = Backbone.View.extend({
    initialize: function(options) {
      this.map = options.map;
      // control that shows state info on hover
      this.info = L.control();
      this.info.onAdd = this.onAdd;
      this.info.update = this.update;
      this.info.addTo(this.map);
    },
    onAdd: function(map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    },
    update: function (model){
      this._div.innerHTML = '<h4>台北開票</h4>' +  (model ?
        '<b>' + model.get('name') + '</b><br />' + model.get('votes') + ' votes'
        : 'Hover over a state');
    },

    onMouseOver: function(e, model) {
      this.info.update(model);
    },
    onMouseOut: function (e, model){
      this.info.update();
    }
  });
  return Info;
});