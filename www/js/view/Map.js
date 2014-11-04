define([
  'backbone',
  'leaflet',
  'view/info',
  'view/legend',
  'util/getColor'
],function(
  Backbone,
  L,
  ViewInfo,
  ViewLegend,
  getColor
) {
  var Map = Backbone.View.extend({
    initialize: function(options) {
      var view = this;
      this.geojsonData = options.geojsonData;
      this.map = L.map('map',{
        center: [25.07, 121.548781],
        zoom: 12,
        maxZoom: 15,
        minZoom: 12,
        maxBounds: L.latLngBounds([24,121], [26,122]),
        zoomControl: false
      });
      this.map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

      L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
        id: 'waneblade.k4nbn1c1'
      }).addTo(this.map);

      var viewInfo = new ViewInfo({
        map: this.map
      });
      var viewLegend = new ViewLegend({
        map: this.map
      });

      this.on('mouseover', viewInfo.onMouseOver.bind(viewInfo));
      this.on('mouseout', viewInfo.onMouseOut.bind(viewInfo));
      // this.on('mouseover', this.highlightFeature);
      // this.on('mouseout', this.resetHighlight);
      this.on('click', this.zoomToFeature);
      this.collection.on('reset', this.generateGeoJson, this);
      // get color depending on votes value
    },
    generateGeoJson: function (){
      var view = this;
      function onEachFeature(feature, layer){
        var model = view.collection.get(feature.properties.CPTVID);
        if(!model){
          console.warn('CPTVID ' + feature.properties.CPTVID + ' not exists')
          return;
        }
        feature.votes = model.get('votes');
        model.on('change', function(model) {
          layer.setStyle({
            fillColor: getColor(model.get('votes'))
          })
        });
        layer.on({
          mouseover: function(e) {
            view.trigger('mouseover', e);
          },
          mouseout: function(e) {
            view.trigger('mouseout', e);
          },
          click: function(e) {
            view.trigger('click', e);
          }
        });
      }

      this.geojson = L.geoJson(this.geojsonData, {
        style: this.style,
        onEachFeature: onEachFeature
      }).addTo(this.map);
    },
    style: function (feature){
      return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.votes)
      };
    },
    // highlightFeature: function(e) {
    //   var layer = e.target;

    //   layer.setStyle({
    //     weight: 5,
    //     color: '#666',
    //     dashArray: '',
    //     fillOpacity: 0.7
    //   });

    //   if (!L.Browser.ie && !L.Browser.opera) {
    //     layer.bringToFront();
    //   }
    // },
    // resetHighlight: function (e){
    //   this.geojson.resetStyle(e.target);
    // },
    zoomToFeature: function (e){
      this.map.fitBounds(e.target.getBounds()); 
    }
  });

  return Map;
})
