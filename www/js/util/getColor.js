define([
  'app/config',
  'underscore'
],function(
  config,
  _
) {
  function getColor(votes) {
    // console.log(votes[0] + ',' + votes[1]);
    var index = _.indexOf(votes, _.max(votes));
    return config.COLORS[index];

    // var colors = [
    //   'orange',
    //   'green',
    //   'red',
    //   'blue',
    //   'yellow',
    //   'purple',
    // ];
    // return colors[d%6];
  }
  return getColor;
})