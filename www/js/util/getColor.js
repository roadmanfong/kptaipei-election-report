define([
  'app/config',
  'underscore'
],function(
  config,
  _
) {
  function getColor(votes) {
    // console.log(votes[0] + ',' + votes[1]);
    var maxVote = _.max(votes);
    var index = _.indexOf(votes, maxVote);
    return maxVote <= 0 ? config.NO_DATA_COLOR : 'url(' + config.CANDIDATE[index].pattern + ')';
  }
  return getColor;
});