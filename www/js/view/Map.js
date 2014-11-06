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
      this.map.attributionControl.addAttribution(config.ATTRIBUTION_CONTROL);
      this.map.on('zoomend', function() {
        view.collection.trigger('change');
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
      this.collection.on('change', this.renderLayers, this);
      // get color depending on votes value
    },
    generateGeoJson: function (){
      var view = this;
      function onEachFeature(feature, layer){
        var model = view.collection.get(feature.properties.CPTID);
        // console.log('model' + model.id);
        if(!model){
          console.warn('CPTID ' + feature.properties.CPTID + ' not exists');
          return;
        }
        var layers = model.get('layers');
        if(!layers){
          model.set('layers', [], {silent: true});
        }
        model.get('layers').push(layer);

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
        style: config.DEFAULT_STYLE,
        onEachFeature: onEachFeature
      }).addTo(this.map);
    },
    renderLayers:function (_model){
      var view = this;
      var models = !_model ? this.collection.models : [_model];
      _.each(models, function(model) {
        _.each(model.get('layers'), function(layer) {              
          layer.setStyle(view.style(model));
        });
      });
      
    },    style: function (model){
      return {
        fillOpacity: model.get('opacity'),
        fillColor: getColor(model.get('votes'))
      };
    },
    highlightFeature: function(e, model) {
      model.set('opacity', config.FOCUS_OPACITY);
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera) {
        _.each(model.get('layers'),function(layer) {
          layer.bringToFront();
        });
      }
    },
    resetHighlight: function (e, model){
      model.set('opacity', config.BLUR_OPACITY);
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
