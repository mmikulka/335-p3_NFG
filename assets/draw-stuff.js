/*
Authors: Jonathan Ishii, Matthew Mikulka
Contact: jtishii@csu.fullerton.edu, mattmikulka@csu.fullerton.edu
Description: This program illustrates Knight Max Flow problem and solves it as best it can.
              It also holds all the javascript that does all the computing to draw objects on the canvas.
*/
// Draw filled rect.

max_edges = Math.floor((Math.random() * 16)) + 15;

var SOURCE =
{
  yindex: 1,
  xindex: 2
};

var SINK =
{
  yindex: 8,
  xindex: 7
};

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
    return 0;
  }

  // checks to see if the amount of edges is all used up
  if(boardArr[xindex][yindex][2] == max_edges)
  {
    return 0;
  }

  if(isVisited(xindex, yindex, visited))
  {
    return 0;
  }

  // this is going to be where we check for the highest next nodes
  // if any of the nodes is the sink go directly to it



  return;
}

// checks to see if the index was already visited. returns true if it has
function isVisited(xindex, yindex, visited)
{
  return false;
}

function isSink(xindex, yindex)
{
  return false;
}

// this functions gets the average flow per edge used
function calcFlow(boardArr)
{
  return;
}
