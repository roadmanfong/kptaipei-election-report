
# 選情回報圖

## TODO
* 拍照

## Requirement
* 安裝[node.js](http://nodejs.org/)
* 安裝[phantom.js](http://phantomjs.org/)
* 安裝node.js完成後，在porject的根目錄下指令

```shell
npm install
```

## Guideline

### 參數設定
#### file:  `www/js/config.json`
`CAROUSEL_TIME_MS` 輪播及截圖時間設定


#### file:  `snapshot.js`

```js
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
```


### 指令
1. 設定網頁伺服器 [http://localhost:8000](http://localhost:8000)

```shell
grunt connect
```
保持視窗不要關閉,
ctrl+c 可以中止

2. 截圖
伺服器網頁運行時，執行

```shell
phantomjs snapshot.js
```

保持視窗不要關閉,
ctrl+c 可以中止，
預設存檔於 snapshot/{unix_time}.png


## 里界圖
```js
{
  "AREA": 16326540.3962, //
  "NEW": 6301200042, //same with NPTVID?
  "FULL": "臺北市北投區湖田里",
  "PERF_ID": 63012, //same as NPID?
  "COUN_ID": "6301200", // as CPTID
  "CPID": "63012", //字串 市ID
  "CPTID": "6301200", //字串 市區ID
  "CPTVID": "6301200042", //字串 市區里ID
  "NPID": 63012, //數 市ID
  "NPTID": 6301200, //數 市區ID
  "NPTVID": 6301200042, //數 市區里ID
  "PNAME": "臺北市", //市
  "TNAME": "北投區", //區
  "VNAME": "湖田里", //里
  "PTVNAME": "臺北市北投區湖田里",
  "PTNAME": "臺北市北投區",
  "TVNAME": "北投區湖田里",
  "TM2_MAX_X": 307802.17, //不知道幹嘛的
  "TM2_MAX_Y": 2789176.16, //不知道幹嘛的
  "TM2_MIN_X": 302319.034, //不知道幹嘛的
  "TM2_MIN_Y": 2783056.23, //不知道幹嘛的
  "MAX_X": 121.5736,
  "MAX_Y": 25.2101,
  "MIN_X": 121.519,
  "MIN_Y": 25.1551
}
```
### 地區
P:市名
T:區名
V:里民

### 值
C: 字串
N: 數值

```js
var properties = _.pluck(villagesData.features,'properties');
_.map(properties, function(property){
  return _.extend(_.pick(property, 'CPTVID', 'TVNAME'), {votes: parseInt(Math.random()*1000)});
});


```

# Resource
* 資訊視覺化 http://d3js.org/
* map http://leafletjs.com/
* jvectormap http://jvectormap.com/tutorials/getting-started/

## Sample
US Map States - Choropleth Plus Bar https://vida.io/documents/4vZ9mRGyepoyQxFcK
Choropleth http://bl.ocks.org/mbostock/4060606

# Reference
## 里界圖來源
https://github.com/ronnywang/data.taipei.gov.tw
http://ogre.adc4gis.com/
> `ogr2ogr -t_srs EPSG:4326 -s_srs EPSG:3826`
> from this link https://github.com/g0v/twgeojson/issues/31