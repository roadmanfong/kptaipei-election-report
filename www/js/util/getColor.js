define([
  'json!config.json',
  'underscore'
],function(
  config,
  _
) {
  function getColor(votes) {
    // console.log(votes[0] + ',' + votes[1]);
    var maxVote = _.max(votes);
    var index = _.indexOf(votes, maxVote);
    // return maxVote <= 0 ? config.DEFAULT_STYLE.fillColor : 'url(' + config.CANDIDATE[index].pattern + ')';
    return maxVote <= 0 ? config.DEFAULT_STYLE.fillColor : config.CANDIDATE[index].color;

  }
  return getColor;
});