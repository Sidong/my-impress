$(document).ready(function() {
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
	collections2_g = collections2;

	// the Binary Tree direction, default to Northwest;
	var directions = {"Northwest":[0,3],"Northeast":[2,3],"Southwest":[0,1],"Southeast":[1,2]};
	var bt_direction = "Northwest";

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
				if (i == 0) {
					border[3] = 1;
				} else if (i == cellNum-1) {
					border[1] = 1;
				}
				if (j == 0) {
					border[0] = 1;
				} else if (j == cellNum-1) {
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
								x = j*cw, y = i*cw;
								new_x = x, new_y = y+cw;
								break;
							case 1:
								x = j*cw, y = i*cw + cw;
								new_x = x+cw, new_y = y;
								break;
							case 2:
								x = j*cw+cw, y = i*cw+cw;
								new_x = x, new_y = y-cw;
								break;
							case 3:
								x = j*cw+cw, y = i*cw;
								new_x = x-cw, new_y = y;
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
			if (neighbours.length != 0)
			{
				// choose one at random;
				rdNum = Math.floor(Math.random()*neighbours.length);
				// break the wall between the current and the next position;
				next_x = neighbours[rdNum].x, next_y = neighbours[rdNum].y;
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
				currentCell.x = next_x, currentCell.y = next_y;
				maze[currentCell.x][currentCell.y].visited = true;
				// if find the out, keep the stack in the solutionStack;
				if (currentCell.x == cellNum-1 && currentCell.y == cellNum-1) {
					solutionStack = cellStack.slice(0,cellStack.length);
					solutionStack.push(maze[currentCell.x][currentCell.y])
				}
				visitedCells++;
			} else {
				if (cellStack.length == 0) alert("error");
				tmpCell = cellStack.pop();
				currentCell.x = tmpCell.x, currentCell.y = tmpCell.y;
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
			if ((currentCell.x != 0 && tmp == 3) || (currentCell.x != cellNum-1 && tmp == 1)
				|| (currentCell.y != 0 && tmp == 0) || (currentCell.y != cellNum-1 && tmp == 2))
			{
				break_wall(currentCell, tmp);
			} else {
				rdNum = 1 - rdNum;
				tmp = directions[bt_direction][rdNum];
				if ((currentCell.x != 0 && tmp == 3) || (currentCell.x != cellNum-1 && tmp == 1)
					|| (currentCell.y != 0 && tmp == 0) || (currentCell.y != cellNum-1 && tmp == 2))
				{
					break_wall(currentCell, tmp);
				}
			}
			draw_walls();

			currentCell.y += 1;
			visitedCells += 1;

			if (currentCell.y == cellNum) {
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
						if (column != 0 && (maze[row][column-1].collected == undefined || maze[row][column-1].collected != maze[row][column].collected)) {choices.push(0);}
						break;
					case 1:
						if (row != cellNum-1 && (maze[row+1][column].collected == undefined || maze[row+1][column].collected != maze[row][column].collected)) {choices.push(1);}
						break;
					case 2:
						if (column != cellNum-1 && (maze[row][column+1].collected == undefined || maze[row][column+1].collected != maze[row][column].collected)) {choices.push(2);}
						break;
					case 3:
						if (row != 0 && (maze[row-1][column].collected == undefined || maze[row-1][column].collected != maze[row][column].collected)) {choices.push(3);}
						break;
				}
			}
			// archive it;
			if (choices.length == 0) {
				for (var i = 0; i < unarchivedCell.length; i++) {
					if (unarchivedCell[i].x == row && unarchivedCell[i].y == column) {
						unarchivedCell.splice(i,1);
						i = unarchivedCell.length;
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
				if (selectedCollection == undefined && neighbourCollection == undefined) {
					var tmp = [];
					var tag = row*10+column;
					maze[row][column].collected = tag;
					maze[neighbour_row][neighbour_column].collected = tag;
					tmp.push({x:row, y:column, collected:tag});
					tmp.push({x:neighbour_row, y:neighbour_column, collected:tag});
					collections2[tag] = tmp;
					tmp = null;
				} else if (selectedCollection == undefined && neighbourCollection != undefined) {
					maze[row][column].collected = neighbourCollection;
					collections2[neighbourCollection].push({x:row, y:column, collected:neighbourCollection});
				} else if (selectedCollection != undefined && neighbourCollection == undefined) {
					maze[neighbour_row][neighbour_column].collected = selectedCollection;
					collections2[selectedCollection].push({x:neighbour_row, y:neighbour_column, collected:selectedCollection});
				} else if (selectedCollection != undefined && neighbourCollection != undefined) {
					// console.log("selectedCollection:",selectedCollection);
					// console.log("neighbourCollection:",neighbourCollection);
					// console.log("collections2:",collections2);
					var tmp = collections2[neighbourCollection].slice(0,collections2[neighbourCollection].length);
					for (var i = 0; i < tmp.length; i++) {
						maze[tmp[i].x][tmp[i].y].collected = selectedCollection;
						collections2[selectedCollection].push({x:tmp[i].x, y:tmp[i].y, collected:selectedCollection});
					}
					delete collections2[neighbourCollection];
					tmp = null;
					// var tmp = collections2[selectedCollection].slice(0,collections2[selectedCollection].length);
					// for (var i = 0; i < tmp.length; i++) {
					// 	maze[tmp[i].x][tmp[i].y].collected = neighbourCollection;
					// 	collections2[neighbourCollection].push({x:tmp[i].x, y:tmp[i].y, collected:neighbourCollection});
					// }
					// delete collections2[selectedCollection];
					// tmp = null;
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
			while ((rdNeighbour == 0 && column == 0 ) || (rdNeighbour == 1 && row == cellNum-1) 
				|| (rdNeighbour == 2 && column == cellNum-1) || (rdNeighbour == 3 && row == 0))  {
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
			if (isCollected != undefined) {
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
					if (unarchivedCell[i].x == neighbour_row && unarchivedCell[i].y == neighbour_column) {
						unarchivedCell.splice(i,1);
						i = unarchivedCell.length;
					}
				}
			}
			// add to draw lines;
			archivedLine.push({ 
				from: {x:row, y:column},
				to:{x:neighbour_row, y:neighbour_column}
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
				while (selectedSet.length == 0) {
					rdCell = last[Math.floor(Math.random()*last.length)];
					for (var i = 0; i < 4; i++) {
						switch(i) {
							case 0:
								if (rdCell.y != 0 && maze[rdCell.x][rdCell.y-1].collected != rdCell.collected) { 
									selectedSet.push(0);
								}
								break;
							case 1: 
								if (rdCell.x != cellNum-1 && maze[rdCell.x+1][rdCell.y].collected != rdCell.collected) { 
									selectedSet.push(1);
								}
								break;
							case 2: 
								if (rdCell.y != cellNum-1 && maze[rdCell.x][rdCell.y+1].collected != rdCell.collected) { 
									selectedSet.push(2);
								}
								break;
							case 3: 
								if (rdCell.x != 0 && maze[rdCell.x-1][rdCell.y].collected != rdCell.collected) { 
									selectedSet.push(3);
								}
								break;
						}
					}
				}

				var rdSelect = selectedSet[Math.floor(Math.random()*selectedSet.length)];
				var neighbour_row = rdCell.x, neighbour_column = rdCell.y;
				switch(rdSelect) {
					case 0: neighbour_column-=1; break;
					case 1: neighbour_row+=1; break;
					case 2: neighbour_column+=1; break;
					case 3: neighbour_row-=1; break;
				}
				break_wall({x:rdCell.x, y:rdCell.y}, rdSelect);
				// add to draw lines;
				archivedLine.push({ 
					from: {x:rdCell.x, y:rdCell.y},
					to:{x:neighbour_row, y:neighbour_column}
				});

				var new_collection = maze[neighbour_row][neighbour_column].collected;
				for (var i = 0; i < last.length; i++) {
					collections[new_collection].push({x:last[i].x, y:last[i].y, collected:new_collection});
					maze[last[i].x][last[i].y].collected = new_collection;
				}
				collections.splice(collections.length-1,1);

				draw_walls();
				draw_lines();
			} else if (collections.length == 1) {
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
			if(tmpCell.visited == false && tmpCell.visited == false) {
				neighbours.push({x:position.x-1, y:position.y});
			}
		} catch (error){}
		try {
			tmpCell = maze[position.x+1][position.y];
			if(tmpCell.visited == false && tmpCell.visited == false) {
				neighbours.push({x:position.x+1, y:position.y});
			}
		} catch (error){}
		try {
			tmpCell = maze[position.x][position.y-1];
			if(tmpCell.visited == false && tmpCell.visited == false) {
				neighbours.push({x:position.x, y:position.y-1});
			}
		} catch (error){}
		try {
			tmpCell = maze[position.x][position.y+1];
			if(tmpCell.visited == false && tmpCell.visited == false) {
				neighbours.push({x:position.x, y:position.y+1});
			}
		} catch (error){}
	}
	function draw_path() {
		// draw the solution stack;
		if (solutionStack.length != 0) {
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
		if (window.location.hash == "#/myMaze") {
			if (event.which == 71) { // "g",generate;
				if (!isGenerated && !isGenerating) {
					// generate_loop = setInterval(create_maze_BT, 10);
					// generate_loop = setInterval(create_maze_DFS, 10);
					generate_loop = setInterval(create_maze_Kruskal, 10);
					// generate_loop = setInterval(create_maze_Kruskal2, 10);
					// create_maze_Kruskal2();
					isGenerating = true;
					draw_position();
				}
			} else if (event.which == 78) { // "n",new;
				if (generate_loop != undefined) clearInterval(generate_loop);
				init();
			} else if (event.which == 83) { // "s",solution;
				if (isGenerated) {
					draw_path();
				}
			} else if (event.which == 72) { // "h",hide;
				draw_walls();
				currentCell.x = 0;
				currentCell.y = 0;
				draw_position(userCell);
				draw_destination();
			} else if (isGenerated && (event.which == 74 || event.which == 73 || event.which == 76 || event.which == 75)) {
				switch(event.which)
				{
					case 74: // j(left);
						if (maze[userCell.x][userCell.y].wall[0] == 0) {
							clear_position();
							userCell.y-=1;
							draw_walls();
							draw_destination();
							draw_position(userCell);
						}
						break;
					case 73: // i(up)
						if (maze[userCell.x][userCell.y].wall[3] == 0) {
							clear_position();
							userCell.x-=1;
							draw_walls();
							draw_destination();
							draw_position(userCell);
						}
						break;
					case 76: // l(right)
						if (maze[userCell.x][userCell.y].wall[2] == 0) {
							clear_position();
							userCell.y+=1;
							draw_walls();
							draw_destination();
							draw_position(userCell);
						}
						break;
					case 75: // k(down)
						if (maze[userCell.x][userCell.y].wall[1] == 0) {
							clear_position();
							userCell.x+=1;
							draw_walls();
							draw_destination();
							draw_position(userCell);
						}
						break;
				}
				if (userCell.x == cellNum-1 && userCell.y == cellNum-1) {
					isGenerated = false;
					$('#mazeSuccess').fadeIn('slow');
					setTimeout(function(){$('#mazeSuccess').fadeOut('slow')},3000);
				}
			}
		}
	});
});
