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
function draw_board( rctx, sSize, rstroke, rfill1, rfill2  ) 
{
    rctx.save( );
    rctx.strokeStyle = "black";
	rctx.lineWidth = 1;
	for (var iy = 0; iy < 10; iy += 1) 
	{
    	for ( var ix = 0; ix < 10; ix += 1)
    	{
			var fill;
			if ((iy + ix) % 2 == 0) {fill = rfill1;}
			else {fill = rfill2}
			draw_rect (rctx, sSize, fill, ix * sSize, iy * sSize);
   	 	}
	}
}

function asignNumbers()
{
	
}
