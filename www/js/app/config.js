define(function() {
	var config = {
		//parse.com
		APP_ID: "CPFQXuoHErkxiN8b3uDFuGuGBnZbLen9jglvAB4p",
		APP_REST_KEY: "u7LyStVeHzbwCBMlW0rkH8Xby31mRymQiVkeJNKG",
		APP_JS_KEY: "qvHqLCDitrqkwAL3bSbMfbdcYlUY9wlfVJZmom3S",
		ATTRIBUTION_CONTROL: '',
		//map
		ENABLE_BG_MAP: false,
		// MAP_BG_COLOR: '#989898',
		DRAGGING: false,
		ZOOM: 12,
		MAX_ZOOM: 12,
		MIN_ZOOM: 12,
		LATLNG_BOUNDS: [[24,121], [26,122]],
		CENTER: [25.09, 121.5],
		POLLING_TIME_MS: 30000,
		DEFAULT_STYLE: {
			weight: 2,
			opacity: 1,
			color: '#bbb',
			fillOpacity: 0.9,
			fillColor: 'lightgray'
		},
		NO_DATA_COLOR: 'lightgray',
		FOCUS_OPACITY: 1,
		BLUR_OPACITY: 0.9,
		TILE_LAYER_ID: 'waneblade.k4nbn1c1',
		//data
		CANDIDATE: [
			// {
			// 	number: 1,
			// 	name: '陳汝斌',
			// 	color: 'gray',
			// 	avatar:''
			// },
			// {
			// 	number: 2,
			// 	name: '趙衍慶',
			// 	color: 'gray',
			// 	avatar:''
			// },
			// {
			// 	number: 3,
			// 	name: '李宏信',
			// 	color: 'gray',
			// 	avatar:''
			// },
			// {
			// 	number: 4,
			// 	name: '陳永昌',
			// 	color: 'gray',
			// 	avatar:''
			// },
			// {
			// 	number: 5,
			// 	name: '馮光遠',
			// 	color: 'gray',
			// 	avatar:''
			// },
			{
				number: 6,
				name: '連勝文',
				color: '#428bca',
				avatar:''
			},
			{
				number: 7,
				name: '柯文哲',
				color: 'white',
				avatar:''
			}
		]
	};
	window.config = config;
	return config;
});