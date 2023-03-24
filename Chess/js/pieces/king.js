class King extends Piece {
    constructor(posX, posY, side) {
        super(posX, posY, side);
        this.isInCheck = false;
    }

    draw(color) {
        let container = document.createElement("div");
        container.setAttribute('class', 'piece');
        container.setAttribute('id', this.id);

        let img = document.createElement("img");
        img.setAttribute('class', 'piece-img');

        if (color == WHITE_PIECE) {
            img.setAttribute('src', '/images/white-king.svg');
        } else {
            img.setAttribute('src', '/images/black-king.svg');
        }

        container.appendChild(img);

        // Position
        container.style.left = this.posX*12.5 + "%";
        container.style.top = this.posY*12.5 + "%";

        // Append
        let boardContainer = document.getElementById("board-container");
        boardContainer.appendChild(container);
    }

    // TODO: Rookada
    findControllingSquares() {
        let pieces = board.white.concat(board.black);

        this.moves = [];

        this.moves.push({x: this.posX - 1, y: this.posY - 1, take: false});
        this.moves.push({x: this.posX    , y: this.posY - 1, take: false});
        this.moves.push({x: this.posX + 1, y: this.posY - 1, take: false});
        this.moves.push({x: this.posX + 1, y: this.posY    , take: false});
        this.moves.push({x: this.posX + 1, y: this.posY + 1, take: false});
        this.moves.push({x: this.posX    , y: this.posY + 1, take: false});
        this.moves.push({x: this.posX - 1, y: this.posY + 1, take: false});
        this.moves.push({x: this.posX - 1, y: this.posY    , take: false});

        for (const piece of pieces) {
            if (this == piece) continue;

            for (const move of this.moves) {
                if (this.isOutOfBounds(move)) { this.remove(move) }

                if (move.x == piece.posX && move.y == piece.posY) {
                    if (piece.side != this.side) {
                        move.take = true;
                        continue;
                    }
                    this.remove(move);
                }
            }
        }
    }

    isCheck(oppPieces) {
        let oppMoves = [];
        for (const piece of oppPieces) {
            piece.findControllingSquares();
            oppMoves = oppMoves.concat(piece.moves);
        }

        for (const move of oppMoves) {
            if (move.x == this.posX && move.y == this.posY) {
                return true;
            }
        }

        return false;
    }
}