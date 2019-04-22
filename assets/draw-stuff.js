/*
Authors: Jonathan Ishii, Matthew Mikulka
Contact: jtishii@csu.fullerton.edu, mattmikulka@csu.fullerton.edu
Description: This program illustrates Wolfram's Rule-90 is based on a 1D array where each cell is active.
            We will illustate on a webpage visually how this works. This file holds all the functions to be called by the Cela Rule 90.html file
*/
// Draw filled rect.
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
			boardArray[i][j][0] = Math.floor((Math.random() * 16)) * 2; // assigns a random even number between 0 and 30 to each cell
			boardArray[i][j][1] = 0; // indicator to see if spot was accessed before.
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

function drawNode(ctx, x, y)
{
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.arc(y * 150 + 125, x * 150 + 125, 30, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

function DFS(board_arr, path_ammount, current_y, current_x, sink_y, sink_x) {
	if ( current_x == sink_x && current_y == sink_y) return 0;
	var paths = new Array();
	var tempX = current_x -1;
	var tempY = current_y -2;

}
