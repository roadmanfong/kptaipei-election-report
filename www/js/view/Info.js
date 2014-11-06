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
      this._div.innerHTML = model ? [
        '<h4>',
          model.get('name'),
        '</h4>',
        model.get('votes'),
        'votes'
      ].join('') : 'Hover over a district';
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