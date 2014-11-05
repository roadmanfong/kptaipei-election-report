define([
  'backbone',
  'leaflet',
  'util/getColor'
],function(
  Backbone,
  L,
  getColor
) {
  var Legend = Backbone.View.extend({
    // initialize: function(options) {
    //   this.map = options.map;
    //   this.legend = L.control({position: 'bottomright'});
    //   this.legend.onAdd = this.onAdd;
    //   this.legend.addTo(this.map);
    // },
    // onAdd: function(map) {
    //  // var div = L.DomUtil.create('div', 'info legend'),
    //  //           grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    //  //           labels = [],
    //  //           from, to;

    //  //         for (var i = 0; i < grades.length; i++) {
    //  //           from = grades[i];
    //  //           to = grades[i + 1];

    //  //           labels.push(
    //  //             '<i style="background:' + getColor(from + 1) + '"></i> ' +
    //  //             from + (to ? '&ndash;' + to : '+'));
    //  //         }

    //  //         div.innerHTML = labels.join('<br>');
    //  //         return div;
    // }
  });
  return Legend;
});