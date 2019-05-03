----------------------------------------------------------------------------------------------------------
|| Knights Max Flow                                                                                        ||
----------------------------------------------------------------------------------------------------------
The program displays Knights Max Flow in 1550x1550 canvas in a web browser using Javascript and CSS.

Features: Displays the Knights Max Flow in a 1550x1550 canvas in a web browser.
          Presumes that cells outside the grid are empty.

Intro:

Implementation - We created a 1550x1550 canvas that we set up a grid we broke down into a
          150 by 150 squares and labeled accordingly. we then used a 2D array in Javascript to record the
          placement of nodes. When we find a node that should be place, we mark in the 2d array where we
          have been we eventually end up drawing a node and a connecting edge.

----------------------------------------------------------------------------------------------------------
|| External Requirements                                                                                ||
----------------------------------------------------------------------------------------------------------
A web browser

----------------------------------------------------------------------------------------------------------
|| Team Information                                                                                     ||
----------------------------------------------------------------------------------------------------------

Team Members: Jonathan Ishii, Matthew Mikulka
Team Name: NFG
Class Number: CSPC 335
Project Name: Knights Max Flow
Project Number: 3

----------------------------------------------------------------------------------------------------------
|| Contents                                                                                             ||
----------------------------------------------------------------------------------------------------------

Setup and Installation: None
Bugs: None

Files:
Knights Max Flow.html
README.txt
assets/draw-stuff.js
assets/styles.css
Tasks.PDF
Complexity_Order_335-p3_NFG.PDF
Algorithm_Analysis_335-p3_NFG.PDF

----------------------------------------------------------------------------------------------------------
|| How to execute program                                                                               ||
----------------------------------------------------------------------------------------------------------

How to handle the JS-1 files to get results:

1. Main HTML file is js-1.html, a web page.
2. Sibling folder (at same level as .html) is "assets".
  (You can move this folder elsewhere if so, move js-1.html accordingly.
    They need to be in the same directory.)
3. Web page links to (loads) assets/styles.css, a very simple CSS file.
4. Web page has some HTML markup for title, header and text.
5. After body, web page loads a script file from assets with functions.
6. After that, another Script section defines another function.
7. And then runs some "loose" Javascript commands.

How to show (and run) the web page:
1. Drag and drop the "Knights Max Flow.html" file onto a browser to see what it does,
    or double click on it and it will launch in your default browser.
