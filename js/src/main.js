/* global $: false, impress: false, Chart: false */
$(document).ready(function() {
	"use strict";

	// ESC for overview
	var api = impress();
	$(document).on('keydown', function(event) {
		if (event.which === "27") { // 'ESC';
			api.goto("overview1");
		}
	});

	// b=1;

	// chart.js handling script
	// chart 1;
	var myChart1 = {};
	// these variables'values are needed to give;
	myChart1.id = "#myChart1";
	myChart1.data = [{value:10,color:"#F7464A"},{value:10,color:"#69bf97"},{value:10,color:"#f9f281"}];
	myChart1.create = function() { new Chart($(myChart1.id)[0].getContext('2d')).Doughnut(myChart1.data); };
	myChart1.clear = function() { $(myChart1.id)[0].getContext('2d').clearRect(0,0,$(myChart1.id)[0].width,$(myChart1.id)[0].height); };

	// chart 2;
	var myChart2 = {};
	// these variables'values are needed to give;
	myChart2.id = "#myChart2";
	myChart2.data = {
		labels : ["吃饭","思考","睡觉","聚会","编程","游戏","运动"],
		datasets : [
			{
				fillColor : "rgba(40,114,149,0.5)",
				strokeColor : "rgba(40,114,149,1)",
				pointColor : "rgba(40,114,149,1)",
				pointStrokeColor : "#fff",
				data : [65,59,90,81,56,55,40]
			},
			{
				fillColor : "rgba(191,63,63,0.5)",
				strokeColor : "rgba(191,63,63,1)",
				pointColor : "rgba(191,63,63,1)",
				pointStrokeColor : "#fff",
				data : [28,68,30,29,96,27,80]
			}
		]};
	myChart2.create = function() {new Chart($(myChart2.id)[0].getContext('2d')).Radar(myChart2.data,{scaleShowLabels : false, pointLabelFontSize : 18});};
	myChart2.clear = function() {$(myChart2.id)[0].getContext('2d').clearRect(0,0,$(myChart2.id)[0].width,$(myChart2.id)[0].height);};

	myChart1.create();
	myChart2.create();

	window.addEventListener('impress:stepenter', function() {
		if($('#chart1').hasClass('active')) {
			myChart1.clear();
			myChart1.create();
		}
		if($('#chart2').hasClass('active')) {
			myChart2.clear();
			myChart2.create();
		}
	});
});
