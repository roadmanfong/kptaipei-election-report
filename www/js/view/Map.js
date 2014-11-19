define([
  'app/config',
  'underscore',
  'backbone',
  'leaflet',
  'util/getColor'
], function(
  config,
  _,
  Backbone,
  L,
  getColor
) {
  var Map = Backbone.View.extend({
    initialize: function(options) {
      var view = this;
      this.geojsonData = options.geojsonData;
      this.map = L.map('map',{
        center: config.CENTER,
        dragging: config.DRAGGING,
        zoom: config.ZOOM,
        maxZoom: config.MAX_ZOOM,
        minZoom: config.MIN_ZOOM,
        maxBounds: L.latLngBounds(config.LATLNG_BOUNDS[0], config.LATLNG_BOUNDS[1]),
        zoomControl: false
      });
      this.map.on('zoomend', this.onZoomend.bind(this));

      if(config.ENABLE_BG_MAP){
        L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '',
          id: config.TILE_LAYER_ID
        }).addTo(this.map);
      } else {
        function injectStyles(rule) {
          var div = $("<div />", {
            html: '&shy;<style>' + rule + '</style>'
          }).appendTo("body");    
        }
        injectStyles('.leaflet-container {background: ' + config.MAP_BG_COLOR + '; }', 1); 
      }
      

      this.on('mouseover', this.highlightFeature);
      this.on('mouseout', this.resetHighlight);
      this.on('mouseover', this.lastMouseOver);

      this.collection.on('reset', this.generateGeoJson, this);
      this.collection.on('change', this.renderLayers, this);
      this.collection.on('sync', this.renderUpdateTime, this);

      setTimeout(this.randomMouseOver.bind(this), 1);
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
        // var layers = model.get('layers');
        // if(!layers){
        //   model.set('layers', [], {silent: true});
        // }
        // model.get('layers').push(layer);

        model.set('layer', layer);
        layer.on({
          mouseover: function(e) {
            view.trigger('mouseover', model);
          },
          mouseout: function(e) {
            view.trigger('mouseout', model);
          },
          click: function(e) {
            view.trigger('click', model);
          }
        });
      }
      this.geojson = L.geoJson(this.geojsonData, {
        style: config.DEFAULT_STYLE,
        onEachFeature: onEachFeature
      }).addTo(this.map);
    },
    renderLayers: function (_model){
      var view = this;
      var models = !_model ? this.collection.models : [_model];
      _.each(models, function(model) {
        model.get('layer').setStyle(view.style(model));
      });
    },
    style: function (model){
      return {
        fillOpacity: model.get('opacity'),
        fillColor: getColor(model.get('votes'))
      };
    },
    highlightFeature: function(model) {
      model.set('opacity', config.FOCUS_OPACITY);
      var layer = model.get('layer');
      if (!L.Browser.ie && !L.Browser.opera) {
        _.each(model.get('layers'),function(layer) {
          layer.bringToFront();
        });
      }
    },
    //TODO: test1
    //      test2
    resetHighlight: function (model){
      model.set('opacity', config.BLUR_OPACITY);
    },
    lastMouseOver: function (model){
      this.lastMouseOverId = model.get('id');
    },
    onZoomend: function (){
      this.collection.each(function(model) {
        if(model.id === this.lastMouseOverId){
          return;
        } else {
          model.trigger('change', model);
        }
      });
    },
    renderUpdateTime: function() {
      $("#update-time").html('更新時間:' + (new Date()).toLocaleString());
    },
    randomMouseOver: function() {
      randomModel = collectionVotes.at(0);
      this.trigger('mouseover', randomModel);
    }
  });
  return Map;
})
