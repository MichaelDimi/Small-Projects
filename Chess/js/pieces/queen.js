class Queen extends Piece {
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
            img.setAttribute('src', '/images/white-queen.svg');
        } else {
            img.setAttribute('src', '/images/black-queen.svg');
        }

        container.appendChild(img);

        // Position
        container.style.left = this.posX*12.5 + "%";
        container.style.top = this.posY*12.5 + "%";

        // Append
        let boardContainer = document.getElementById("board-container");
        boardContainer.appendChild(container);
    }

    findControllingSquares() {
        this.moves = [];

        let pieces = board.white.concat(board.black);

        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.north, pieces);
        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.south, pieces);
        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.east, pieces);
        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.west, pieces);

        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.north_west, pieces);
        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.north_east, pieces);
        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.south_west, pieces);
        this.checkNextPiece({ x: this.posX, y: this.posY }, Direction.south_east, pieces);
    }


}