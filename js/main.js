define(['jquery', 'impress', 'maze', 'mychart', 'ascii', 'animate'], function($, impress, maze, mychart, ascii, animate){
	'use strict';
	// impress init
	var api = impress();
	api.init();

	// ESC for overview
	$(document).on('keydown', function(event) {
		if (event.which === "27") { // 'ESC';
			api.goto("overview1");
		}
	});

	// maze
	maze.begin();

	// chart
	mychart.chart1.create();
	mychart.chart2.create();
	window.addEventListener('impress:stepenter', function() {
		if($('#chart1').hasClass('active')) {
			mychart.chart1.clear();
			mychart.chart1.create();
		}
		if($('#chart2').hasClass('active')) {
			mychart.chart2.clear();
			mychart.chart2.create();
		}
	});

	// ascii loop
	setInterval(ascii.loop, 120);
	// add animation using animate.css
	animate.animate();
});
