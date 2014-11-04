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
    update: function (props){
      this._div.innerHTML = '<h4>台北開票</h4>' +  (props ?
        '<b>' + props.TVNAME + '</b><br />' + props.votes + ' votes'
        : 'Hover over a state');
    },

    onMouseOver: function(e) {
      var layer = e.target;
      this.info.update(layer.feature.properties);
    },
    onMouseOut: function (e){
      this.info.update();
    }
  });
  return Info;
});