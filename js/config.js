require.config({

	paths: {
		'impress': 'vendor/impress',
		'Chart': 'vendor/Chart',
		'jquery': 'vendor/jquery',
		'ascii': 'src/ascii',
		'maze': 'src/maze',
		'mychart': 'src/mychart',
		'animate': 'src/animate'
	},
	shim: {
		'Chart': {
			exports: 'Chart'
		},
		'impress': {
			exports: 'impress'
		}
	}
});
