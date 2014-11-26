//儲存截圖的資料夾
var DIR_NAME = 'snapshot';

//截圖大小
var SCREEN_FACTOR_PIXEL = 300;
var WIDTH = 4 * SCREEN_FACTOR_PIXEL;
var HEIGHT = 3 * SCREEN_FACTOR_PIXEL;

//截圖來源網頁
var TARGET_URL = 'http://localhost:8000';

//緩充第一次網頁載入時間
var DELAY_TIMEOUT_MS = 1000;

//截圖間隔時間
var INTERVAL_MS = require('./www/js/config.json').CAROUSEL_TIME_MS;

var genImageUrl = function (subDir) {
	return DIR_NAME + '/' + subDir + '/' + (new Date()).getTime() + '.png';
};

function snapshot(url, subDir){
	var page = require('webpage').create();
	page.viewportSize = { width: WIDTH, height: HEIGHT };

	console.log('Capturing ' + url + ' to ' + genImageUrl(subDir) + '...');

	function renderImage(){
		var imageUrl = genImageUrl(subDir);
	  	page.render(imageUrl);
		console.log('Rendered ' + imageUrl);
	}

	page.open(url, function() {
		setTimeout(function (){
			renderImage();
			setInterval(renderImage, INTERVAL_MS);
		}, DELAY_TIMEOUT_MS);
	});
}

console.log('Press Ctrl + c to Stop Capturing');
snapshot(TARGET_URL, 'map');
snapshot(TARGET_URL + '/pie.html', 'pie');