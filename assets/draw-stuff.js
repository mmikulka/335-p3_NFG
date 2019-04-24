/*
Authors: Jonathan Ishii, Matthew Mikulka
Contact: jtishii@csu.fullerton.edu, mattmikulka@csu.fullerton.edu
Description: This program illustrates Knight Max Flow problem and solves it as best it can.
              It also holds all the javascript that does all the computing to draw objects on the canvas.
*/
// Draw filled rect.

max_edges = Math.floor((Math.random() * 16)) + 15;

var flowCapacity = 0;

edges = 0;

function draw_rect( ctx, sSize, fill, x, y)
{
    fill = fill || 'white';
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = fill;
    ctx.lineWidth = 3;
    ctx.rect(x, y, sSize, sSize);
	ctx.fill();
    ctx.stroke();
	ctx.closePath();
    ctx.restore( );
}

// =====================================================  draw_grid ====
// draw starting grid
function draw_board( rctx, sSize, rstroke, rfill1, rfill2, boardNumbers)
{
    rctx.save( );
    rctx.strokeStyle = "black";
	  rctx.lineWidth = 1;
	for (var iy = 0; iy < 10; iy += 1)
	{
      // draws y axis cell labels
      rctx.save();
      rctx.font = "40px Arial";
      rctx.fillStyle = "black";
      rctx.fillText(iy, 10, iy * sSize + 140);
      rctx.restore();
    	for ( var ix = 0; ix < 10; ix += 1)
    	{
			var fill;
			if ((iy + ix) % 2 == 0) {fill = rfill1;}
			else {fill = rfill2}
			draw_rect (rctx, sSize, fill, ix * sSize + 50, iy * sSize + 50);

      // draws the value of the cells on the board
      rctx.save();
      rctx.context
      rctx.font = "20px Arial";
      rctx.fillStyle = "blue";
      rctx.fillText(boardNumbers[iy][ix][0], ix * sSize + 55, iy * sSize + 70);

      // draws x axis cell indexs
      rctx.font = "40px Arial";
      rctx.fillStyle = "black";
      rctx.fillText(ix, ix * sSize + 120, 30);
      rctx.restore();
   	 	}
	}
}

/*
creats a 10x10 3d array with each cell a random even number between (0 and 30).
*/

function createBoardArray()
{
	var boardArray = new Array();
	for (var i = 0; i < 10; ++i)
	{
		boardArray[i] = new Array();
		for (var j = 0; j < 10; ++j)
		{
			boardArray[i][j] = new Array();
			boardArray[i][j][0] = Math.floor((Math.random() * 16)) * 2; // assigns a random even number between 0 and 30 to each cell for the capacity
			boardArray[i][j][1] = 0; // current max flow through this nodes
      boardArray[i][j][2] = 0; // the amount of edges to took to get there
      boardArray[i][j][3] = 0; // the xindex of the last node that took to get there
      boardArray[i][j][4] = 0; // the yindex of the last node that took to get there
      // everything else after that will be current flow from previous iterations that have already been flown

		}
	}
	//print array numbers to console
	/*
	for (var i = 0; i < 10; ++i)
	{
		for (var j = 0; j < 10; ++j)
		{
			console.log(boardArray[i][j]);
		}
	}
	*/
	return boardArray;
}

// draws a nodes in the given index of the grid
function drawNode(ctx, x, y, color)
{
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = color || "green";
  ctx.arc(y * 150 + 125, x * 150 + 125, 30, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

// connects 2 nodes together based on their indexes in the grid
function connectNodes(ctx, x1, y1, x2, y2, boardNumbers)
{
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(y1 * 150 + 125, x1 * 150 + 125);
  ctx.lineTo(y2 * 150 + 125, x2 * 150 + 125);
  ctx.stroke();

  // draws the value of the cap based on the cells on the board
  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  flowCap = "(" + 0 + ", " + (boardNumbers[x1][y1][0] + boardNumbers[x2][y2][0])/2 + ")";
  xcord = ((x1 + x2) / 2) * 150 + 125;
  ycord = ((y1 + y2) / 2) * 150 + 125;
  ctx.fillText(flowCap, ycord, xcord);

  ctx.restore();
}


// this function does a BFS on the graph to determine which path has the best flow per edge used
function DFS(boardArr, xindex, yindex, visited)
{
  // checks to see if the next search is out of bounds
  if(xindex < 0 || yindex < 0 || xindex > 9 || yindex > 9)
  {
    return false;
  }

  // checks to see if the amount of edges is all used up
  if(edges == max_edges)
  {
    return false;
  }

  /*if(isVisited(xindex, yindex, visited))
  {
    return 0;
  }*/
  
  if (isSink(xindex, yindex)) 
  {
	  return true;
  }
  
  // this is going to be where we check for the highest next nodes
  // if any of the nodes is the sink go directly to it/*
  /*console.log(visited);
  console.log(xindex);
  console.log(yindex);
  */
  visited[xindex][yindex] = 1;
  edges += 1;
  var temp = flowCapacity; // temperary variable to hold the flow up to the current node
  alreadyChecked = new Array(8).fill(0);
  do{
	  flowCapacity = temp;
	  nextMove = findNextEdge(boardArr, xindex, yindex, visited, alreadyChecked);
	  alreadyChecked.push(nextMove);
	  currentFlow = findFlow();
	  flowCapacity = Math.min(currentFlow, flowCapacity);
	  found = DFS (boardArr, nextMove[0], nextMove[1], visited)
  }
  while (!found && Math.min(...alreadyChecked) == 0)
	  if (!found)
  		{
  			visited[xindex][yindex] = 0;
			edges -= 1;
 	 	}
	if (found)
		{
		    drawNode(context, xindex, yindex);
		    connectNodes(context, xindex, yindex, nextMove[0], nextMove[1], board);
			return true
		}
  return false;
}

function findNextEdge(boardArray, xindex, yindex, visited, alreadyChecked)
{
	var maxValue = 0;
	var newX;
	var newY;
	var newIndex;

	//moves are done clockwise from 12 o'clock clockwise
	
	if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, 1, 2))
	{
		maxValue = boardArray[xindex + 1][yindex + 2][0];
		newX = xindex + 1;
		newY = yindex + 2;
		newIndex = 0;
	}
	if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, 2, 1))
	{
		maxValue = boardArray[xindex + 2][yindex + 1][0];
		newX = xindex + 2;
		newY = yindex + 1;
		newIndex = 1;
	}
	if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, 2, -1))
	{
		maxValue = boardArray[xindex + 2][yindex - 1][0];
		newX = xindex + 2;
		newY = yindex - 1;
		newIndex = 2;
	}
	if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, 1, -2))
	{
		maxValue = boardArray[xindex + 1][yindex - 2][0];
		newX = xindex + 1;
		newY = yindex - 2;
		newIndex = 3;
	}
	if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, -1, -2))
	{
		maxValue = boardArray[xindex - 1][yindex - 2][0];
		newX = xindex - 1;
		newY = yindex - 2;
		newIndex = 4;
	}
	if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, -2, -1))
	{
		maxValue = boardArray[xindex - 2][yindex - 1][0];
		newX = xindex - 2;
		newY = yindex - 1;
		newIndex = 5;
	}
	if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, -2, 1))
	{
		maxValue = boardArray[xindex - 2][yindex + 1][0];
		newX = xindex - 2;
		newY = yindex + 1;
		newIndex = 6;
	}
	if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, -1, 2))
	{
		maxValue = boardArray[xindex - 1][yindex + 2][0];
		newX = xindex - 1;
		newY = yindex + 2;
		newIndex = 7;
	}

	alreadyChecked[newIndex] = 1;
	var tempArr = new Array()
	tempArr[0] = newX;
	tempArr[1] = newY;

	//console.log(tempArr[0]);
	//console.log(tempArr[1]);
	
	return tempArr;
}

function goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, xoffset, yoffset)
{
	if(xindex + xoffset > 0)
		if (yindex + yoffset > 0)
			if (xindex + xoffset < 10 && yindex + yoffset < 10)
			if (maxValue <= boardArray[xindex + xoffset][yindex + yoffset][0])
				if (alreadyChecked[0] == 0)
					if (!isVisited(xindex + xoffset, yindex + yoffset, visited))
	{
		//console.log("good Move");
		return true;
	}
	return false;
}

// checks to see if the index was already visited. returns true if it has
function isVisited(xindex, yindex, visited)
{
	for (var i = 0; i < visited.length; ++i)
	{
		if (visited[xindex][yindex])
		{	
			return true;
		}
	}
  return false;
}

function isSink(xindex, yindex)
{
	if (xindex == 7 && yindex == 8)
	{
		return true;
	}
  return false;
}

// this functions gets the average flow per edge used
function findFlow(boardArr)
{
  return 1;
}
