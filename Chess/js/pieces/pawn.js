class Pawn extends Piece {
    constructor(posX, posY, side) {
        super(posX, posY, side);
        this.originalPos = { x: posX, y: 8 - posY };
        this.offset = this.side == Side.black ? 1 : -1;
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

    findControllingSquares() {
        let pieces = board.white.concat(board.black);

        this.moves = [];

        this.moves.push({ x: this.posX, y: this.posY + this.offset });
        if (this.isInOriginalPos()) {
            this.moves.push({ x: this.posX, y: this.posY + 2*this.offset, twoSquareAdvance: true });
        }
        for (const piece of pieces) {
            if (this == piece) continue;

            for (const move of this.moves) {
                if (move.x == piece.posX && move.y == piece.posY) {
                    let index = this.moves.indexOf(move)
                    this.moves.splice(index, this.moves.length - index);
                    continue;
                }

                if (this.isOutOfBounds(move)) { this.remove(move) }
            }

            // Diagonal Taking and En Passant
            if (piece.side != this.side) {
                if (piece.posX == this.posX - 1 && piece.posY == this.posY + this.offset) {
                    this.moves.push({ x: this.posX - 1, y: this.posY + this.offset, take: true });
                } else if (piece.posX == this.posX + 1 && piece.posY == this.posY + this.offset) {
                    this.moves.push({ x: this.posX + 1, y: this.posY + this.offset, take: true });
                } else if ((piece.posX == this.posX - 1 || piece.posX == this.posX + 1) && 
                            piece.posY == this.posY) {

                    if (board.validEnPassantPiece == piece) {
                        this.moves.push({   x: piece.posX, 
                                            y: piece.posY + this.offset, 
                                            enPassant: true 
                                        });
                    }
                }
            }
        }
    }

    isInOriginalPos() {
        return this.posX == this.originalPos.x && this.posY == this.originalPos.y
    }
}