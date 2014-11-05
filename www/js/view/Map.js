define([
  'app/config',
  'underscore',
  'backbone',
  'leaflet',
  'view/info',
  'view/legend',
  'util/getColor'
], function(
  config,
  _,
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
        center: config.CENTER,
        zoom: config.ZOOM,
        maxZoom: config.MAX_ZOOM,
        minZoom: config.MIN_ZOOM,
        maxBounds: L.latLngBounds(config.LATLNG_BOUNDS[0], config.LATLNG_BOUNDS[1]),
        zoomControl: false
      });
      this.map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');
      this.map.on('zoomend', function() {
        view.collection.triggerModelsChange();
        view.collection.each(function(model) {
          if(model.get('CPTID') === view.lastCPTID){
            return;
          }
          model.set({opacity: view.blurOpacity()});
        });
      });

      if(config.ENABLE_BG_MAP){
        L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '',
          id: 'waneblade.k4nbn1c1'
        }).addTo(this.map);
      }

      var viewInfo = new ViewInfo({
        map: this.map
      });
      var viewLegend = new ViewLegend({
        map: this.map
      });

      this.on('mouseover', viewInfo.onMouseOver.bind(viewInfo));
      this.on('mouseout', viewInfo.onMouseOut.bind(viewInfo));
      this.on('mouseover', this.highlightFeature);
      this.on('mouseout', this.resetHighlight);
      this.on('click', this.zoomToFeature);
      this.on('mouseover', this.lastMouseOver);

      this.collection.on('reset', this.generateGeoJson, this);
      // get color depending on votes value
    },
    generateGeoJson: function (){
      var view = this;
      function onEachFeature(feature, layer){
        var model = view.collection.get(feature.properties.CPTVID);
        if(!model){
          console.warn('CPTVID ' + feature.properties.CPTVID + ' not exists');
          return;
        }
        model.set({
          CPTID: feature.properties.CPTID,
          layer: layer
        }, {silent: true});
        
        model.on('change', function(model) {
          // console.log('change');
          layer.setStyle(view.style(model));
        });
        layer.on({
          mouseover: function(e) {
            view.trigger('mouseover', e, model);
          },
          mouseout: function(e) {
            view.trigger('mouseout', e, model);
          },
          click: function(e) {
            view.trigger('click', e, model);
          }
        });
      }
      this.geojson = L.geoJson(this.geojsonData, {
        style: this.defaultStyle,
        onEachFeature: onEachFeature
      }).addTo(this.map);
    },
    defaultStyle: {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: '#FFEDA0'
    },
    style: function (model){
      var sumUp = this.collection.getVotes(model.get('CPTID'));
      var fillColor = getColor( this.isDetailMode() ? model.get('votes') : sumUp);
      return {
        fillOpacity: model.get('opacity'),
        fillColor: fillColor
      };
    },
    isDetailMode: function (){
      return this.map.getZoom() > config.ZOOM;
    },
    focusOpacity: function (){
      return this.isDetailMode() ? 0.8 : 0.7;
    },
    sameZoneOpacity: function (){
      return this.isDetailMode() ? 0.9 : 0.9; 
    },
    blurOpacity: function (){
      return this.isDetailMode() ? 0.2 : 0.5;
    },
    highlightFeature: function(e, model) {
      this.collection.setSameZone(model.get('CPTID'), {'opacity': this.sameZoneOpacity()});
      model.set('opacity', this.focusOpacity());
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }
    },
    resetHighlight: function (e, model){
      this.collection.setSameZone(model.get('CPTID'), {'opacity': this.blurOpacity()});
    },
    zoomToFeature: function (e){
      this.map.setView(e.target.getBounds().getCenter(), config.ZOOM + 1);
      // this.map.fitBounds(e.target.getBounds()); 
    },
    lastMouseOver: function (e, model){
      this.lastCPTID = model.get('CPTID');
    },
  });

  return Map;
})
