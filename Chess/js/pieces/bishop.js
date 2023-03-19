class Bishop extends Piece {
    constructor(posX, posY, side) {
        super(posX, posY, side);
    }

    draw(color) {
        let container = document.createElement("div");
        container.setAttribute('class', 'piece');
        container.setAttribute('id', this.id);

        let img = document.createElement("img");
        img.setAttribute('class', 'piece-img');

        if (color == WHITE_PIECE) {
            img.setAttribute('src', '/images/white-bishop.svg');
        } else {
            img.setAttribute('src', '/images/black-bishop.svg');
        }

        container.appendChild(img);

        // Position
        container.style.left = this.posX*12.5 + "%";
        container.style.top = this.posY*12.5 + "%";

        // Append
        let boardContainer = document.getElementById("board-container");
        boardContainer.appendChild(container);
    }

    calculateMoves() {
        this.moves = [];

        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.north_west);
        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.north_east);
        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.south_west);
        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.south_east);
    }
}