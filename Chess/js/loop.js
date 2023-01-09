canvas = board.canvas

function start() {
    board.create();

    board.initPieces();

    // Drawing the board
    board.draw();
    for (const piece of board.white) {
        piece.draw(WHITE_PIECE);
    }
    for (const piece of board.black) {
        piece.draw(BLACK_PIECE);
    }
    
    requestAnimationFrame( loop );
}

function loop() {

    update();

    requestAnimationFrame( loop );
}

function update() {

}