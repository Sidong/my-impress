// animation script using animate.css
/* global $: false */
$(function() {
	"use strict";
	
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
		function() { $(this).addClass('animated rubberBand'); },
		function() { $(this).removeClass('animated rubberBand'); }
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
		function() { $(this).addClass('animated tada'); },
		function() { $(this).removeClass('animated tada'); }
	);
});
;/* global $: false */
$(document).ready(function() {
	"use strict";

	//some variables
	var r, g, b, gray;
	var character, line = "";
	
	//sprite stuff
	var sprite = document.getElementById("sprite");
	var W = sprite.width;
	var H = sprite.height;
	
	//temporary canvas for pixel processing
	var tcanvas = document.createElement("canvas");
	tcanvas.width = W;
	tcanvas.height = H; //same as the image
	var tc = tcanvas.getContext("2d");
	//painting the canvas white before painting the image to deal with pngs
	tc.fillStyle = "white";
	tc.fillRect(0, 0, W, H);
	//drawing the image on the canvas
	tc.drawImage(sprite, 0, 0, W, H);
	
	//accessing pixel data
	var pixels = tc.getImageData(0, 0, W, H);
	var colordata = pixels.data;
	//every pixel gives 4 integers -> r, g, b, a
	//so length of colordata array is W*H*4
	var ascii = document.getElementById("ascii");
	for(var i = 0; i < colordata.length; i = i+4)
	{
		r = colordata[i];
		g = colordata[i+1];
		b = colordata[i+2];
		//converting the pixel into grayscale
		gray = r*0.34 + g*0.5 + b*0.16;
		//overwriting the colordata array with grayscale values
		colordata[i] = colordata[i+1] = colordata[i+2] = gray;
		
		//text for ascii art.
		//blackish = dense characters like "W", "@"
		//whitish = light characters like "`", "."
		if(gray > 250) { character = " "; } //almost white
		else if(gray > 230) { character = "`"; }
		else if(gray > 200) { character = ":"; }
		else if(gray > 175) { character = "*"; }
		else if(gray > 150) { character = "+"; }
		else if(gray > 125) { character = "#"; }
		else if(gray > 50) { character = "W"; }
		else { character = "@"; } //almost black
		
		//newlines and injection into dom
		if(i !== 0 && (i/4)%W === 0) //if the pointer reaches end of pixel-line
		{
			ascii.appendChild(document.createTextNode(line));
			//newline
			ascii.appendChild(document.createElement("br"));
			//emptying line for the next row of pixels.
			line = "";
		}
		
		line += character;
	}
	
	var frames = 10;
	var container = document.getElementById("asciiContainer");
	var frame_width = parseInt(window.getComputedStyle(container).width)/frames;
	container.style.width = frame_width + "px";

	ascii.style.marginLeft = "0";

	setInterval(loop, 1000/10);

	function loop()
	{
		var current_ml = parseFloat(ascii.style.marginLeft);
		if (current_ml === frame_width*(frames-1)*(-1))
		{
			ascii.style.marginLeft = 0;
		} else {
			ascii.style.marginLeft = (current_ml - frame_width) + "px";
		}
	}
});
;/* global $: false, impress: false, Chart: false */
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
;/* jshint unused: false, laxbreak: true */
/* global $: false, console: false, alert: false */
$(document).ready(function() {
	"use strict";
	// canvas;
	var canvas = $('#maze')[0];
	var ctx = canvas.getContext('2d');
	// canvas and cell size;
	var W = canvas.width;
	var H = canvas.height;
	var cw = 50;
	var cellNum = W/cw;
	var totalCells = cellNum * cellNum;
	var isGenerated = false;
	var isGenerating = false;
	// tmp variables;
	var i, j, x, y, new_x, new_y, rdNum, next_x, next_y, tmpCell;
	// the tmp for DFS;
	var neighbours;
	// x representx the line, y represents the column;
	var currentCell;
	var userCell = {x:0, y:0};
	// the number of cells visited;
	var visitedCells;
	// generating interval function;
	var generate_loop;

	// the maze data structure
	var maze;
	window.maze_g = maze;  // the global variable for testing;
	// the cellStack for DFS
	var cellStack = [];
	var solutionStack = [];

	// the variables for Kruskal and Kruskal2;
	var archivedLine = [];
	var unarchivedCell = [];
	// Kruskal;
	var collections = [];
	// Kruskal2;
	var collections2 = {};

	// the Binary Tree direction, default to Northwest;
	var directions = {"Northwest":[0,3],"Northeast":[2,3],"Southwest":[0,1],"Southeast":[1,2]};
	var bt_direction = "Northwest";

	// the radio form;
	var radio = document.getElementById('algo');

	// define the maze cell class;
	var MazeCell = {
		createNew: function(x, y, border, wall, solution, backtrap){
			var mazeCell = {};
			// W S E N;
			mazeCell.x = x || 0;
			mazeCell.y = y || 0;
			mazeCell.border = border || [0,0,0,0];
			mazeCell.wall = wall || [0,0,0,0];
			mazeCell.solution = solution || [0,0,0,0];
			mazeCell.backtrap = backtrap || [0,0,0,0];
			mazeCell.visited = false; // used for DFS;
			return mazeCell;
		}
	};
	init();
	// create a 8*8 maze;
	function init() {
		// DFS, BT;
		visitedCells = 1;
		// DFS, BT;
		currentCell = {x:0, y:0};
		// Kruskal & Kruskal2;
		unarchivedCell = [];
		for (var i = 0; i < cellNum; i++) {
			for (var j = 0; j < cellNum; j++) {
				unarchivedCell.push({ x:i, y:j });
			}
		}
		archivedLine = [];
		collections = [];
		collections2 = {};
		// used by user;
		userCell = {x:0,y:0};
		// All;
		isGenerated = false;
		isGenerating = false;
		maze = [];
		// DFS;
		cellStack = [];
		solutionStack = [];
		// All;
		init_empty_maze();
		draw_walls();
		draw_position();
		// DFS;
		maze[currentCell.x][currentCell.y].visited = true;
	}
	// init the maze array;
	function init_empty_maze() {
		// i represents the line, and j represents the column;
		for (i = 0; i < cellNum; i++)
		{
			var mazeLine = [];
			for (j = 0; j < cellNum; j++)
			{
				var border = [0,0,0,0];
				var wall = [1,1,1,1];
				var x = i;
				var y = j;
				if (i === 0) {
					border[3] = 1;
				} else if (i === cellNum-1) {
					border[1] = 1;
				}
				if (j === 0) {
					border[0] = 1;
				} else if (j === cellNum-1) {
					border[2] = 1;
				}
				var aCell = MazeCell.createNew(x,y,border,wall);
				mazeLine.push(aCell);
			}
			maze.push(mazeLine);
		}
	}
	// accord to the mazeCell.wall to draw the wall;
	function draw_walls() {
		// clear Rect;
		ctx.clearRect(0,0,W,H);
		// draw the walls;
		ctx.strokeStyle = "gray";
		ctx.lineWidth = 2;
		for (i = 0; i < cellNum; i++)
		{
			for (j = 0; j < cellNum; j++)
			{
				for (var k = 0; k < 4; k ++)
				{
					if (maze[i][j].wall[k])
					{
						switch(k)
						{
							case 0:
								x = j*cw; y = i*cw;
								new_x = x; new_y = y+cw;
								break;
							case 1:
								x = j*cw; y = i*cw + cw;
								new_x = x+cw; new_y = y;
								break;
							case 2:
								x = j*cw+cw; y = i*cw+cw;
								new_x = x; new_y = y-cw;
								break;
							case 3:
								x = j*cw+cw; y = i*cw;
								new_x = x-cw; new_y = y;
								break;
						}
						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(new_x, new_y);
						ctx.stroke();
					}
				}
			}
		}
		// draw the borders;
		ctx.strokeStyle = "black";
		ctx.lineWidth = 5;
		ctx.strokeRect(0,0,W,H);
	}
	function draw_position(pos,color) {
		// draw the current position;
		var position = pos ? pos : currentCell;
		ctx.beginPath();
		ctx.fillStyle = color ? color : '#69bf97';
		// x represents the line, y represents the column;
		ctx.arc((position.y+0.5)*cw, (position.x+0.5)*cw, cw/3, 2*Math.PI, false);
		ctx.fill();
	}
	function clear_position(pos) {
		var position = pos ? pos : userCell;
		ctx.clearRect((position.y+0.5)*cw-cw/3, (position.x+0.5)*cw-cw/3, cw*2/3, cw*2/3);
	}
	function create_maze_DFS() {
		if (visitedCells < totalCells)
		{
			// find the neighbours with unvisited state;
			find_neighbours(currentCell);
			// if find one or more;
			if (neighbours.length !== 0)
			{
				// choose one at random;
				rdNum = Math.floor(Math.random()*neighbours.length);
				// break the wall between the current and the next position;
				next_x = neighbours[rdNum].x; next_y = neighbours[rdNum].y;
				if (currentCell.y > next_y) { // west side?
					maze[currentCell.x][currentCell.y].wall[0] = 0;
					maze[next_x][next_y].wall[2] = 0;
				} else if (currentCell.x < next_x) { // south side?
					maze[currentCell.x][currentCell.y].wall[1] = 0;
					maze[next_x][next_y].wall[3] = 0;
				} else if (currentCell.y < next_y) { // east side?
					maze[currentCell.x][currentCell.y].wall[2] = 0;
					maze[next_x][next_y].wall[0] = 0;
				} else if (currentCell.x > next_x) { // north side?
					maze[currentCell.x][currentCell.y].wall[3] = 0;
					maze[next_x][next_y].wall[1] = 0;
				}
				cellStack.push(maze[currentCell.x][currentCell.y]);
				currentCell.x = next_x; currentCell.y = next_y;
				maze[currentCell.x][currentCell.y].visited = true;
				// if find the out, keep the stack in the solutionStack;
				if (currentCell.x === cellNum-1 && currentCell.y === cellNum-1) {
					solutionStack = cellStack.slice(0,cellStack.length);
					solutionStack.push(maze[currentCell.x][currentCell.y]);
				}
				visitedCells++;
			} else {
				if (cellStack.length === 0) { alert("error"); }
				tmpCell = cellStack.pop();
				currentCell.x = tmpCell.x; currentCell.y = tmpCell.y;
			}
		} else {
			isGenerated = true;
			isGenerating = false;
			clearInterval(generate_loop);
		}
		draw_walls();
		if (isGenerated) {
			draw_destination();
			currentCell.x = 0; currentCell.y = 0;
		}
		draw_position();
	}
	function create_maze_BT() {
		if (visitedCells <= totalCells)
		{
			// start with the currentCell;
			// go from left to right;
			// go from top to down;
			rdNum = Math.floor(Math.random()*2);
			var tmp = directions[bt_direction][rdNum];
			if ((currentCell.x !== 0 && tmp === 3) || (currentCell.x !== cellNum-1 && tmp === 1)
					|| (currentCell.y !== 0 && tmp === 0) || (currentCell.y !== cellNum-1 && tmp === 2))
			{
				break_wall(currentCell, tmp);
			} else {
				rdNum = 1 - rdNum;
				tmp = directions[bt_direction][rdNum];
				if ((currentCell.x !== 0 && tmp === 3) || (currentCell.x !== cellNum-1 && tmp === 1)
					|| (currentCell.y !== 0 && tmp === 0) || (currentCell.y !== cellNum-1 && tmp === 2))
				{
					break_wall(currentCell, tmp);
				}
			}
			draw_walls();

			currentCell.y += 1;
			visitedCells += 1;

			if (currentCell.y === cellNum) {
				currentCell.y = 0;
				currentCell.x += 1;
			}

		} else { // if all cells visited;
			isGenerated = true;
			isGenerating = false;
			clearInterval(generate_loop);
		}
		if (isGenerated) {
			draw_destination();
			currentCell.x = 0; currentCell.y = 0;
		}
		draw_position();
	}
	function create_maze_Kruskal2() {	
		// 1. 一开始，maze中所有点都无归档;
		// 2. 随机选择一个无归档的点，判断其是有相邻非同组邻居;
			// 2.1 若无，将其归档(因为其他步骤导致)(归档的定义是该点所有邻居都是同一组);
			// 2.2 若有，随机将其一个非同组的邻居疏通;
		// 3. 重复2直至全部归档;
		if (unarchivedCell.length > 0) {
			// there esixts unarchived cells, randomly selects one;
			var selected = Math.floor(Math.random()*unarchivedCell.length);
			var row = unarchivedCell[selected].x;
			var column = unarchivedCell[selected].y;
			var choices = [];
			for (var i = 0; i < 4; i ++) {
				switch(i) {
					case 0:
						if (column !== 0 && (maze[row][column-1].collected === undefined || maze[row][column-1].collected !== maze[row][column].collected)) {choices.push(0);}
						break;
					case 1:
						if (row !== cellNum-1 && (maze[row+1][column].collected === undefined || maze[row+1][column].collected !== maze[row][column].collected)) {choices.push(1);}
						break;
					case 2:
						if (column !== cellNum-1 && (maze[row][column+1].collected === undefined || maze[row][column+1].collected !== maze[row][column].collected)) {choices.push(2);}
						break;
					case 3:
						if (row !== 0 && (maze[row-1][column].collected === undefined || maze[row-1][column].collected !== maze[row][column].collected)) {choices.push(3);}
						break;
				}
			}
			// archive it;
			if (choices.length === 0) {
				for (var k = 0; k < unarchivedCell.length; k++) {
					if (unarchivedCell[k].x === row && unarchivedCell[k].y === column) {
						unarchivedCell.splice(k,1);
						k = unarchivedCell.length;
					}
				}
			} else {
				var rdNeighbour = choices[Math.floor(Math.random()*choices.length)];
				var neighbour_row = row, neighbour_column = column;
				switch(rdNeighbour) {
					case 0: neighbour_column-=1; break;
					case 1: neighbour_row+=1; break;
					case 2: neighbour_column+=1; break;
					case 3: neighbour_row-=1; break;
				}
				console.log("selected:",row,column);
				console.log("new:",neighbour_row,neighbour_column);
				break_wall({x:row, y:column}, rdNeighbour);
				// 归为一组;
				var selectedCollection = maze[row][column].collected;
				var neighbourCollection = maze[neighbour_row][neighbour_column].collected;
				if (selectedCollection === undefined && neighbourCollection === undefined) {
					var tmp = [];
					var tag = row*10+column;
					maze[row][column].collected = tag;
					maze[neighbour_row][neighbour_column].collected = tag;
					tmp.push({x:row, y:column, collected:tag});
					tmp.push({x:neighbour_row, y:neighbour_column, collected:tag});
					collections2[tag] = tmp;
					tmp = null;
				} else if (selectedCollection === undefined && neighbourCollection !== undefined) {
					maze[row][column].collected = neighbourCollection;
					collections2[neighbourCollection].push({x:row, y:column, collected:neighbourCollection});
				} else if (selectedCollection !== undefined && neighbourCollection === undefined) {
					maze[neighbour_row][neighbour_column].collected = selectedCollection;
					collections2[selectedCollection].push({x:neighbour_row, y:neighbour_column, collected:selectedCollection});
				} else if (selectedCollection !== undefined && neighbourCollection !== undefined) {
					var tmp2 = collections2[neighbourCollection].slice(0,collections2[neighbourCollection].length);
					for (var m = 0; m < tmp2.length; m++) {
						maze[tmp2[m].x][tmp2[m].y].collected = selectedCollection;
						collections2[selectedCollection].push({x:tmp2[m].x, y:tmp2[m].y, collected:selectedCollection});
					}
					delete collections2[neighbourCollection];
					tmp2 = null;
				}
				archivedLine.push({ 
					from: {x:row, y:column},
					to:{x:neighbour_row, y:neighbour_column}
				});
				draw_walls();
				draw_lines();
			}	
		} else {
			isGenerated = true;
			isGenerating = false;
			clearInterval(generate_loop);
			draw_walls();
			draw_position();
			draw_destination();
		}
	}
	function create_maze_Kruskal() {
		// there esixts unarchived cells, randomly selects one;
		if (unarchivedCell.length > 0) {
			var selected = Math.floor(Math.random()*unarchivedCell.length);
			var row = unarchivedCell[selected].x;
			var column = unarchivedCell[selected].y;
			// randomly find one of its neighbours;
			var rdNeighbour = Math.floor(Math.random()*4);
			while ((rdNeighbour === 0 && column === 0 ) || (rdNeighbour === 1 && row === cellNum-1) 
				|| (rdNeighbour === 2 && column === cellNum-1) || (rdNeighbour === 3 && row === 0))  {
				rdNeighbour = Math.floor(Math.random()*4);
			}
			// break the walls betweens them;
			var neighbour_row = row, neighbour_column = column;
			switch(rdNeighbour) {
				case 0: neighbour_column-=1; break;
				case 1: neighbour_row+=1; break;
				case 2: neighbour_column+=1; break;
				case 3: neighbour_row-=1; break;
			}
			break_wall({x:row, y:column}, rdNeighbour);

			// if its neighbour is collected, collect the cell to its neighbour's collection and archive the cell;
			var isCollected = maze[neighbour_row][neighbour_column].collected;
			if (isCollected !== undefined) {
				maze[row][column].collected = isCollected;
				collections[isCollected].push( {x:row, y:column, collected:isCollected} );
				unarchivedCell.splice(selected,1);
			}
			// if its neighbour is not collected, collect both of them to a collection, and archive them;
			else {
				var count = collections.length;
				maze[row][column].collected = count;
				maze[neighbour_row][neighbour_column].collected = count;
				var tmp = [];
				tmp.push( {x:row, y:column, collected:count} );
				tmp.push( {x:neighbour_row, y:neighbour_column, collected:count} );
				collections.push(tmp);
				unarchivedCell.splice(selected,1);
				for(var i = 0; i < unarchivedCell.length; i++) {
					if (unarchivedCell[i].x === neighbour_row && unarchivedCell[i].y === neighbour_column) {
						unarchivedCell.splice(i,1);
						i = unarchivedCell.length;
					}
				}
			}
			// add to draw lines;
			archivedLine.push({ 
				from: {x:row, y:column},
				to: {x:neighbour_row, y:neighbour_column}
			});
			draw_walls();
			draw_lines();
		}
		// all the cells were archived;
		else {
			if (collections.length > 1) {
				// select the last collection, connect it with another collection, and combine them;
				var last = collections[collections.length-1];
				var selectedSet = [];
				var rdCell;
				// randomly select a cell, randomly select a neighbour that is not in the same collections, combine them;
				while (selectedSet.length === 0) {
					rdCell = last[Math.floor(Math.random()*last.length)];
					for (var n = 0; n < 4; n++) {
						switch(n) {
							case 0:
								if (rdCell.y !== 0 && maze[rdCell.x][rdCell.y-1].collected !== rdCell.collected) { 
									selectedSet.push(0);
								}
								break;
							case 1: 
								if (rdCell.x !== cellNum-1 && maze[rdCell.x+1][rdCell.y].collected !== rdCell.collected) { 
									selectedSet.push(1);
								}
								break;
							case 2: 
								if (rdCell.y !== cellNum-1 && maze[rdCell.x][rdCell.y+1].collected !== rdCell.collected) { 
									selectedSet.push(2);
								}
								break;
							case 3: 
								if (rdCell.x !== 0 && maze[rdCell.x-1][rdCell.y].collected !== rdCell.collected) { 
									selectedSet.push(3);
								}
								break;
						}
					}
				}

				var rdSelect = selectedSet[Math.floor(Math.random()*selectedSet.length)];
				var neighbour_row2 = rdCell.x, neighbour_column2 = rdCell.y;
				switch(rdSelect) {
					case 0: neighbour_column2-=1; break;
					case 1: neighbour_row2+=1; break;
					case 2: neighbour_column2+=1; break;
					case 3: neighbour_row2-=1; break;
				}
				break_wall({x:rdCell.x, y:rdCell.y}, rdSelect);
				// add to draw lines;
				archivedLine.push({ 
					from: {x:rdCell.x, y:rdCell.y},
					to:{x:neighbour_row2, y:neighbour_column2}
				});

				var new_collection = maze[neighbour_row2][neighbour_column2].collected;
				for (var p = 0; p < last.length; p++) {
					collections[new_collection].push({x:last[p].x, y:last[p].y, collected:new_collection});
					maze[last[p].x][last[p].y].collected = new_collection;
				}
				collections.splice(collections.length-1,1);

				draw_walls();
				draw_lines();
			} else if (collections.length === 1) {
				isGenerated = true;
				isGenerating = false;
				clearInterval(generate_loop);
				draw_walls();
				draw_position();
				draw_destination();
			}
		}
	}
	// draw the lines stored in archivedLine by Kruskal;
	function draw_lines() {
		var tmp = archivedLine.slice(0,archivedLine.length);
		while(tmp.length > 0) {
			var line = tmp.pop();
				ctx.beginPath();
				ctx.strokeStyle = '69bf97';
				ctx.lineWidth = cw/5 >= 8 ? 8 : cw/5;
				ctx.moveTo((line.from.y+0.5)*cw, (line.from.x+0.5)*cw);
				ctx.lineTo((line.to.y+0.5)*cw, (line.to.x+0.5)*cw);
				ctx.stroke();
		}
	}
	// break the wall between the pos cell and its direction cell;
	function break_wall(pos, direction) {
		maze[pos.x][pos.y].wall[direction] = 0;
		switch(direction) {
			case 0: maze[pos.x][pos.y-1].wall[2] = 0; break;
			case 1: maze[pos.x+1][pos.y].wall[3] = 0; break;
			case 2: maze[pos.x][pos.y+1].wall[0] = 0; break;
			case 3: maze[pos.x-1][pos.y].wall[1] = 0; break;
		}
	}
	// find the neighbours with unvisited state;
	function find_neighbours(position) {
		neighbours = [];
		try {
			tmpCell = maze[position.x-1][position.y];
			if(tmpCell.visited === false && tmpCell.visited === false) {
				neighbours.push({x:position.x-1, y:position.y});
			}
		} catch (error){}
		try {
			tmpCell = maze[position.x+1][position.y];
			if(tmpCell.visited === false && tmpCell.visited === false) {
				neighbours.push({x:position.x+1, y:position.y});
			}
		} catch (error){}
		try {
			tmpCell = maze[position.x][position.y-1];
			if(tmpCell.visited === false && tmpCell.visited === false) {
				neighbours.push({x:position.x, y:position.y-1});
			}
		} catch (error){}
		try {
			tmpCell = maze[position.x][position.y+1];
			if(tmpCell.visited === false && tmpCell.visited === false) {
				neighbours.push({x:position.x, y:position.y+1});
			}
		} catch (error){}
	}
	function draw_path() {
		// draw the solution stack;
		if (solutionStack.length !== 0) {
			draw_walls();
			var tmpCell;
			var tmpSolutionStack = solutionStack.slice(0,solutionStack.length);
			while (tmpSolutionStack.length > 0) {
				tmpCell = tmpSolutionStack.shift();
				draw_position({x:tmpCell.x, y:tmpCell.y},'#61868c');
			}
		} else {
			console.log("empty");
		}
	}
	function draw_destination() {
		ctx.fillStyle = '#69bf97';
		var pos = (cellNum-1) * cw;
		ctx.fillRect(pos+2,pos+2,cw-4,cw-4);
		draw_position({x:cellNum-1,y:cellNum-1},'white');
	}

	// keydown listener;
	$(document).keydown(function(event) {
		// console.log(event.which);
		if (window.location.hash === "#/myMaze") {
			if (event.which === 71) { // "g",generate;
				if (!isGenerated && !isGenerating) {
					radio = document.getElementById('algo');
					for (var i = 0; i < radio.length; i++) {
						if (radio[i].checked) {
							switch(radio[i].value) {
								case "DFS": generate_loop = setInterval(create_maze_DFS, 10); break;
								case "Kruskal": generate_loop = setInterval(create_maze_Kruskal, 10); break;
								case "BT": generate_loop = setInterval(create_maze_BT, 10); break;
							}
							break;
						}
					}
					// generate_loop = setInterval(create_maze_Kruskal2, 10);
					// create_maze_Kruskal2();
					isGenerating = true;
					draw_position();
				}
			} else if (event.which === 78) { // "n",new;
				if (generate_loop !== undefined) { clearInterval(generate_loop); }
				init();
			} else if (event.which === 83) { // "s",solution;
				if (isGenerated) {
					draw_path();
				}
			} else if (event.which === 72) { // "h",hide;
				draw_walls();
				currentCell.x = 0;
				currentCell.y = 0;
				draw_position(userCell);
				draw_destination();
			} else if (isGenerated && (event.which === 74 || event.which === 73 || event.which === 76 || event.which === 75)) {
				switch(event.which)
				{
					case 74: // j(left);
						if (maze[userCell.x][userCell.y].wall[0] === 0) {
							clear_position();
							userCell.y-=1;
							draw_walls();
							draw_destination();
							draw_position(userCell);
						}
						break;
					case 73: // i(up)
						if (maze[userCell.x][userCell.y].wall[3] === 0) {
							clear_position();
							userCell.x-=1;
							draw_walls();
							draw_destination();
							draw_position(userCell);
						}
						break;
					case 76: // l(right)
						if (maze[userCell.x][userCell.y].wall[2] === 0) {
							clear_position();
							userCell.y+=1;
							draw_walls();
							draw_destination();
							draw_position(userCell);
						}
						break;
					case 75: // k(down)
						if (maze[userCell.x][userCell.y].wall[1] === 0) {
							clear_position();
							userCell.x+=1;
							draw_walls();
							draw_destination();
							draw_position(userCell);
						}
						break;
				}
				if (userCell.x === cellNum-1 && userCell.y === cellNum-1) {
					isGenerated = false;
					$('#mazeSuccess').fadeIn('slow');
					setTimeout(function() { $('#mazeSuccess').fadeOut('slow'); }, 3000);
				}
			}
		}
	});
});
