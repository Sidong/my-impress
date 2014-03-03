// animation script using animate.css
$(function() {
	
	// name
	window.addEventListener('impress:stepenter', function() {
	  $('#name.active h1').addClass('animated flipInY');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#name.past h1').removeClass('animated flipInY');
	});
	
	// hobbies
	window.addEventListener('impress:stepenter', function() {
	  $('#hobbies.active h1').addClass('animated rubberBand');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#hobbies.past h1').removeClass('animated rubberBand');
	});

	// game
	window.addEventListener('impress:stepenter', function() {
	  $('#myMaze.active #mazeInstruction').addClass('animated bounceInRight');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#myMaze.past #mazeInstruction').removeClass('animated bounceInRight');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#myMaze.active #game').addClass('animated tada');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#myMaze.past #game').removeClass('animated tada');
	});

	// movie
	window.addEventListener('impress:stepenter', function() {
	  $('#movies.active #slideTip').addClass('animated tada');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#movies.past #slideTip').removeClass('animated tada');
	});

	// chart1
	window.addEventListener('impress:stepenter', function() {
	  $('#chart1.active #life').addClass('animated tada');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#chart1.past #life').removeClass('animated tada');
	});

	// chart2
	window.addEventListener('impress:stepenter', function() {
	  $('#chart2.active #quick').addClass('animated rubberBand');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#chart2.past #quick').removeClass('animated rubberBand');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#chart2.active #simple').addClass('animated slideInLeft');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#chart2.past #simple').removeClass('animated slideInLeft');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#chart2.active #hard').addClass('animated slideInLeft');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#chart2.past #hard').removeClass('animated slideInLeft');
	});
	$('#chart2 #quick').hover(
		function(){$(this).addClass('animated rubberBand')},
		function(){$(this).removeClass('animated rubberBand')}
	);

	// beliefs
	window.addEventListener('impress:stepenter', function() {
	  $('#belief.active h1').addClass('animated swing');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#belief.past h1').removeClass('animated swing');
	});

	// info
	window.addEventListener('impress:stepenter', function() {
	  $('#info.active h1').addClass('animated rubberBand');
	});
	window.addEventListener('impress:stepenter', function() {
	  $('#info.past h1').removeClass('animated rubberBand');
	});
	$('#info li').hover(
		function(){$(this).addClass('animated tada')},
		function(){$(this).removeClass('animated tada')}
	);
});
