define(function() {
	var config = {
		//parse.com
		APP_ID: 'CPFQXuoHErkxiN8b3uDFuGuGBnZbLen9jglvAB4p',
		APP_REST_KEY: 'u7LyStVeHzbwCBMlW0rkH8Xby31mRymQiVkeJNKG',
		APP_JS_KEY: 'qvHqLCDitrqkwAL3bSbMfbdcYlUY9wlfVJZmom3S',
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
			opacity: 0.7,
			color: '#aa95a1',
			fillColor: '#ccc'
		},
		FOCUS_COLOR: '#222',
		FOCUS_OPACITY: 1,

		TILE_LAYER_ID: 'waneblade.k4nbn1c1',
		CAROUSEL_TIME_MS: 5000,
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
				pattern: '#blue',
				avatar:'url(img/avatar_6.jpg)'
			},
			{
				number: 7,
				name: '柯文哲',
				color: 'white',
				pattern: '#white',
				avatar: 'url(img/avatar_7.jpg)'
			}
		]
	};
	window.config = config;
	return config;
});