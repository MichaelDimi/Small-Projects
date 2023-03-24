class King extends Piece {
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

        // TODO: Can't castle out of check
        // Check Rokada
        if (!this.hasMoved) { // Wrong Check (Should check if it hasn't moved)
            let oppPieces = board.getPieces(this.oppSide);
            let rooks = board.findPieces(Rook, this.side);
            for (const rook of rooks) {
                if (!rook.hasMoved) {
                    if (rook.posX < this.posX) {
                        // Queen Side
                        let canQueenSide = true;
                        for (let i = 1; i <= 3; i++) {
                            for (const piece of pieces) {
                                if (piece.posX == i && piece.posY == this.posY) {
                                    canQueenSide = false;
                                }
                            }
                            // Check if the move puts you in check
                            if (canQueenSide) {
                                let backupPos = this.posX;
                                this.posX = i;

                                if (this.isCheck(oppPieces)) {
                                    canQueenSide = false;
                                }

                                this.posX = backupPos;
                            }
                        }

                        if (canQueenSide) {
                            this.moves.push({ x: 2, y: this.posY, rokada: true, queenSide: true });
                        }
                    } else {
                        // King Side
                        let canKingSide = true;
                        for (let i = 5; i <= 6; i++) {
                            for (const piece of pieces) {
                                if (piece.posX == i && piece.posY == this.posY) {
                                    canKingSide = false;
                                }
                            }

                            // Check if the move puts you in check
                            if (canKingSide) {
                                let backupPos = this.posX;
                                this.posX = i;

                                let oppPieces = board.getPieces(this.oppSide);
                                if (this.isCheck(oppPieces)) {
                                    canKingSide = false;
                                }

                                this.posX = backupPos;
                            }
                        }
                        if (canKingSide) {
                            this.moves.push({ x: 6, y: this.posY, rokada: true, kingSide: true });
                        }
                    }
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