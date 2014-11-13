define([
  'app/config',
  'backbone',
  'underscore',
  'lib/Chart',
  'app/toReadableNumber'
],function(
  config,
  Backbone,
  _,
  Chart,
  toReadableNumber
) {
  window.toReadableNumber = toReadableNumber;
  var Pie = Backbone.View.extend({
    initialize: function() {
      var ctx = document.getElementById("myChart").getContext("2d");
      this.myPieChart = new Chart(ctx)
      .Pie(this.collection.getTotal(), {
        percentageInnerCutout : 50, // This is 0 for Pie charts
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span class=\"bullet\" style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><span class=\"vote\"><%=toReadableNumber(segments[i].value)%></span><%}%>票</li><%}%></ul>"
      });
      this.listenTo(this.collection, 'sync change', this.render, this);
      this.listenTo(this.collection, 'sync change', this.renderUpdateTime, this);
    },
    render: _.debounce(function (){
      console.log('Pie render');
      console.log(_.pluck(this.collection.getTotal(), 'value'));
      var myPieChart = this.myPieChart;
      _.each(this.collection.getTotal(), function(value, index) {
        _.extend(myPieChart.segments[index], value);
      });
      // Would update the first dataset's value of 'Green' to be 10
      myPieChart.update();
      $("#legend").html(this.myPieChart.generateLegend());
    }, 500),
    renderUpdateTime: function() {
      $("#update-time").html('更新時間:' + (new Date()).toLocaleString());
    }
  })
  return Pie;
});