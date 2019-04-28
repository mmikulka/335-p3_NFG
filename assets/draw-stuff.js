/*
Authors: Jonathan Ishii, Matthew Mikulka
Contact: jtishii@csu.fullerton.edu, mattmikulka@csu.fullerton.edu
Description: This program illustrates Knight Max Flow problem and solves it as best it can.
It also holds all the javascript that does all the computing to draw objects on the canvas.
*/
// Draw filled rect.

 //set maximum number of edgest to a random number between 15 and 30
max_edges = Math.floor((Math.random() * 16)) + 15;

var flowCapacity = 40; //set flow capaicty to a number higher than what the flow can be

edges = -1; //set edges to -1 to make up for when the source is added to the path.

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
      boardArray[i][j][0] = 0
      boardArray[i][j][0] = Math.floor((Math.random() * 16)) * 2; // assigns a random even number between 0 and 30 to each cell for the capacity
      boardArray[i][j][1] = 0; // current max flow through this nodes
      boardArray[i][j][2] = 0; // the amount of edges to took to get there
      boardArray[i][j][3] = 0; // the xindex of the last node that took to get there
      boardArray[i][j][4] = 0; // the yindex of the last node that took to get there
      // everything else after that will be current flow from previous iterations that have already been flown

    }
  }/*//Hard code values to check paths are being made correctly.
  boardArray[1][2][0] = 14;
  boardArray[2][4][0] = 14;
  boardArray[4][5][0] = 14;
  boardArray[6][6][0] = 14;
  boardArray[8][7][0] = 14;
  boardArray[3][6][0] = 16;
  boardArray[4][8][0] = 14;
  boardArray[6][7][0] = 14;
  boardArray[7][9][0] = 14;
    boardArray[0][4][0] = 16;
    boardArray[2][8][0] = 18;
    boardArray[0][9][0] = 14;*/
  //  boardArray[0][0][0] = 4;

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
  flowCap = "(" + flowCapacity + ", " + (boardNumbers[x1][y1][0] + boardNumbers[x2][y2][0])/2 + ")";
  xcord = ((x1 + x2) / 2) * 150 + 125;
  ycord = ((y1 + y2) / 2) * 150 + 125;
  ctx.fillText(flowCap, ycord, xcord);
  ctx.closePath();
  ctx.restore();
}


// this function does a BFS on the graph to determine which path has the best flow per edge used
function DFS(boardArr, xindex, yindex, visited)
{

    ++edges;
    if (isSink(xindex, yindex))
    {
      return true;
    }
  // checks to see if the next search is out of bounds
  if (xindex < 0 || yindex < 0 || xindex > 9 || yindex > 9)
  {
    return false;
  }

  // checks to see if the amount of edges is all used up
  if (edges >= max_edges)
  {
    return false;
  }

  if (isVisited(xindex, yindex, visited))
  {
    return false;
  }

  var initx = xindex;
  var inity = yindex;

  visited[xindex][yindex] = 1;
  var temp = flowCapacity; // temperary variable to hold the flow up to the current node
  var alreadyChecked = new Array(9).fill(0); //variable to keep track of moves we have already checked.
  alreadyChecked[8] = 1; //we set the array to one over the move just incase there are no moves to make
  var found = false; // keep track of wether we have found the sink with DFS search
  do{
    flowCapacity = temp; //set flow capacity to what it was at this location if DFS does not return that it found sink
    var nextMove = findNextEdge(boardArr, xindex, yindex, visited, alreadyChecked); // find the next best move
    var currentFlow = findFlow(boardArr, xindex, yindex, nextMove); //find the current flow for the next best move
    flowCapacity = Math.min(currentFlow, flowCapacity); //set the flowCapacity to the smallest value of path.
    //temp values that save the current next best move for this node.
    var movex = nextMove[0];
    var movey = nextMove[1];
    found = DFS (boardArr, nextMove[0], nextMove[1], visited) //recursive call.
	if(!found) // check to see if we found the sink if not erase the next best move node and remove 1 from edge count.
	{
    visited[movex][movey] = 0;
		flowCapacity = temp;
        edges--;
	}

  }
  while (!found && Math.min(...alreadyChecked) == 0)
  if (found) // if found start drawing the path and nodes we visit.
  {
    drawNode(context, xindex, yindex);
    connectNodes(context, initx, inity, movex, movey, board);
    return true
  }
  return false;
}

function findNextEdge(boardArray, xindex, yindex, visited, alreadyChecked) //find the next best edge
{
  var maxValue = 0;
  var newX = xindex;
  var newY = yindex;
  var newIndex = 8;

  //moves are done clockwise from 12 o'clock clockwise


  if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, 1, 2, 0))
  {
    maxValue = boardArray[xindex + 1][yindex + 2][0];
    newX = xindex + 1;
    newY = yindex + 2;
    newIndex = 0;
  }
  else { // need to mark that the move is invalid if the move goes outside the board or has been visited already.
    if (xindex + 1 < 0 || yindex + 2 < 0 || xindex + 1 > 9 || yindex + 2 > 9)
    {
      alreadyChecked[0] = 1;
    }
    else if (isVisited(xindex + 1, yindex + 2, visited))
    {
      alreadyChecked[0] = 1;
    }
  }

  if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, 2, 1, 1))
  {
    maxValue = boardArray[xindex + 2][yindex + 1][0];
    newX = xindex + 2;
    newY = yindex + 1;
    newIndex = 1;
  }
  else {
    if (xindex + 2 < 0 || yindex + 1 < 0 || xindex + 2 > 9 || yindex + 1 > 9)
    {
      alreadyChecked[1] = 1;
    }
    else if (isVisited(xindex + 2, yindex + 1, visited))
    {
      alreadyChecked[1] = 1;
    }
  }

  if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, 2, -1, 2))
  {
    maxValue = boardArray[xindex + 2][yindex - 1][0];
    newX = xindex + 2;
    newY = yindex - 1;
    newIndex = 2;
  }
  else {
    if (xindex + 2 < 0 || yindex - 1 < 0 || xindex + 2 > 9 || yindex - 1 > 9)
    {
      alreadyChecked[2] = 1;
    }
    else if (isVisited(xindex + 2, yindex - 1, visited))
    {
      alreadyChecked[2] = 1;
    }
  }

  if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, 1, -2, 3))
  {
    maxValue = boardArray[xindex + 1][yindex - 2][0];
    newX = xindex + 1;
    newY = yindex - 2;
    newIndex = 3;
  }
  else {
    if (xindex + 1 < 0 || yindex - 2 < 0 || xindex + 1 > 9 || yindex - 2 > 9)
    {
      alreadyChecked[3] = 1;
    }
    else if (isVisited(xindex + 1, yindex - 2, visited))
    {
      alreadyChecked[3] = 1;
    }
  }

  if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, -1, -2, 4))
  {
    maxValue = boardArray[xindex - 1][yindex - 2][0];
    newX = xindex - 1;
    newY = yindex - 2;
    newIndex = 4;
  }
  else {
    if (xindex - 1 < 0 || yindex - 2 < 0 || xindex - 1 > 9 || yindex - 2 > 9)
    {
      alreadyChecked[4] = 1;
    }
    else if (isVisited(xindex - 1, yindex - 2, visited))
    {
      alreadyChecked[4] = 1;
    }
  }

  if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, -2, -1, 5))
  {
    maxValue = boardArray[xindex - 2][yindex - 1][0];
    newX = xindex - 2;
    newY = yindex - 1;
    newIndex = 5;
  }
  else {
    if (xindex - 2 < 0 || yindex - 1 < 0 || xindex - 2 > 9 || yindex - 1 > 9)
    {
      alreadyChecked[5] = 1;
    }
    else if (isVisited(xindex - 2, yindex - 1, visited))
    {
      alreadyChecked[5] = 1;
    }
  }

  if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, -2, 1, 6))
  {
    maxValue = boardArray[xindex - 2][yindex + 1][0];
    newX = xindex - 2;
    newY = yindex + 1;
    newIndex = 6;
  }
  else {
    if (xindex - 2 < 0 || yindex + 1 < 0 || xindex - 2 > 9 || yindex + 1 > 9)
    {
      alreadyChecked[6] = 1;
    }
    else if (isVisited(xindex - 2, yindex + 1, visited))
    {
      alreadyChecked[6] = 1;
    }
  }

  if(goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, -1, 2, 7))
  {
    maxValue = boardArray[xindex - 1][yindex + 2][0];
    newX = xindex - 1;
    newY = yindex + 2;
    newIndex = 7;
  }
  else {
    if (xindex - 1 < 0 || yindex + 2 < 0 || xindex - 1 > 9 || yindex + 2 > 9)
    {
      alreadyChecked[7] = 1;
    }
    else if (isVisited(xindex - 1, yindex + 2, visited))
    {
      alreadyChecked[7] = 1;
    }
  }

  alreadyChecked[newIndex] = 1;
  var tempArr = new Array()
  tempArr[0] = newX;
  tempArr[1] = newY;

  //console.log(tempArr[0]);
  //console.log(tempArr[1]);

  return tempArr;
}

/*
check to see if the current proposed move is a valid move.
*/
function goodMove(boardArray, xindex, yindex, visited, alreadyChecked, maxValue, xoffset, yoffset, index)
{

  if (xindex + xoffset >= 0 && yindex + yoffset >= 0 && xindex + xoffset < 10 && yindex + yoffset < 10)
  {
    if (maxValue <= boardArray[xindex + xoffset][yindex + yoffset][0])
    {
      if (alreadyChecked[index] == 0)
      {
        if (!isVisited(xindex + xoffset, yindex + yoffset, visited))
        {
          //console.log("good Move");
          return true;
        }
      }
    }
  }
  else

  return false;
}

// checks to see if the index was already visited. returns true if it has
function isVisited(xindex, yindex, visited)
{
  if (visited[xindex][yindex])
    {
      return true;
    }
  return false;
}

//check to see if current node is the sink.
function isSink(xindex, yindex)
{
  if (xindex == 8 && yindex == 7)
  {
    return true;
  }
  return false;
}

// this functions gets the average flow per edge used
function findFlow(boardArr, xindex, yindex, nextMove)
{
  var currentFlow = boardArr[xindex][yindex][0];
  var nextMoveFlow = boardArr[nextMove[0]][nextMove[1]][0];
  return (currentFlow + nextMoveFlow)/ 2;
}
