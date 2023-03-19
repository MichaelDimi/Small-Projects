class Pawn extends Piece {
    constructor(posX, posY, side) {
        super(posX, posY, side);
        this.originalPos = { x: posX, y: 8 - posY };
    }

    draw(color) {
        let container = document.createElement("div");
        container.setAttribute('class', 'piece');
        container.setAttribute('id', this.id);

        let img = document.createElement("img");
        img.setAttribute('class', 'piece-img');

        if (color == WHITE_PIECE) {
            img.setAttribute('src', '/images/white-pawn.svg');
        } else {
            img.setAttribute('src', '/images/black-pawn.svg');
        }

        container.appendChild(img);

        // Position
        container.style.left = this.posX*12.5 + "%";
        container.style.top = this.posY*12.5 + "%";

        // Append
        let boardContainer = document.getElementById("board-container");
        boardContainer.appendChild(container);
    }

    // TODO: TAKING DIAGONALLY
    calculateMoves() {
        let pieces = (this.side == Side.white) ? board.white : board.black;

        this.moves = [];
        let offset;
        if (this.side == Side.black) {
            offset = 1;
        } else {
            offset = -1;
        }

        this.moves.push({ x: this.posX, y: this.posY + offset });
        if (this.posX == this.originalPos.x && this.posY == this.originalPos.y) {
            this.moves.push({ x: this.posX, y: this.posY + 2*offset });
        }
        for (const piece of pieces) {
            if (this == piece) continue;

            for (const move of this.moves) {
                if (move.x == piece.posX && move.y == piece.posY) {
                    let index = this.moves.indexOf(move)
                    this.moves.splice(index, this.moves.length - index);
                    continue;
                }

                if (move.y > 7 || move.y < 0) {
                    this.moves.splice(this.moves.indexOf(move), 1);
                    continue;
                }
            }
        }
    }
}