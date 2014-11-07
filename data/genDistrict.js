
var _ = require('underscore');
var merge = require('turf-merge')
var fs = require('fs')

var villagesData = require('./tpe-villages-encoded.json');
// console.log(villagesData);
var features = _.chain(villagesData.features)
.groupBy(function(obj){
	// console.log(obj.properties.TNAME);
	return obj.properties.TNAME;
})
.map(function(value) {
	// console.log(key);
	// console.log(value);
	var polys = 
	{
	  "type": "FeatureCollection",
	  "features": value
	};

	var merged = merge(polys);
    merged.properties = _.pick(merged.properties, [
		'AREA',
		'PERF_ID',
		'COUN_ID',
		'CPID',
		'CPTID',
		'NPID',
		'NPTID',
		'PNAME',
		'TNAME',
		'PTNAME'
	]);
	return _.pick(merged, ['type', 'properties', 'geometry'])
})

.value();
var result = {
	"type": "FeatureCollection",
	"features": features
}
fs.writeFileSync('result.json', JSON.stringify(result, null, '\t'));
console.log(result);