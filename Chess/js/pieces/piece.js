class Piece {
    constructor(posX, posY, side) {
        this.posX = posX;
        this.posY = 8 - posY;

        this.x = this.posX * TILE_SIZE;
        this.y = this.posY * TILE_SIZE;

        this.id = Math.random()*10000; 

        this.side = side;

        this.moves = [];
    }

    draw() {
        console.log("Attempted to draw piece");
    }

    update(x, y) {
        let pieceElement = document.getElementById(this.id);
        let size = pieceElement.getBoundingClientRect().width;

        let canvasBounds = canvas.getBoundingClientRect();

        pieceElement.style.left = ((x-size/2)/canvasBounds.width) * 100 + "%";
        pieceElement.style.top = ((y-size/2)/canvasBounds.height) * 100 + "%";
    }

    calculateMoves() {
        console.log("The moves for this piece cannot be calculated. You must create a method for this piece");
    }

    drawMoves() {
        for (const move of this.moves) {
            if (move.take) { continue }

            let dot = document.createElement('div');
            dot.setAttribute('class', 'dot');

            dot.style.left = move.x*12.5 + "%";
            dot.style.top = move.y*12.5 + "%";

            let boardContainer = document.getElementById("board-container");
            boardContainer.appendChild(dot);
        }
    }

    // Only used for recursive pieces
    checkNextPiece(currentPos, direction) {
        let pieces = board.white.concat(board.black);

        let newPos = { x: currentPos.x + direction.x, y: currentPos.y + direction.y, take: false };
        for (const piece of pieces) {
            if (newPos.x == piece.posX && newPos.y == piece.posY) {
                if (piece.side != this.side) {
                    newPos.take = true;
                    this.moves.push(newPos);
                }
                return;
            }
        }
        if (newPos.x > 7 || newPos.x < 0 || newPos.y > 7 || newPos.y < 0) { return }
        this.moves.push(newPos);
        this.checkNextPiece(newPos, direction);
    }
}