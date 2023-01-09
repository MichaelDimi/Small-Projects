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
            let dot = document.createElement('div');
            dot.setAttribute('class', 'dot');

            dot.style.left = move.x*12.5 + "%";
            dot.style.top = move.y*12.5 + "%";

            let boardContainer = document.getElementById("board-container");
            boardContainer.appendChild(dot);
        }
    }
}