class Piece {
    constructor(posX, posY, side) {
        this.posX = posX;
        this.posY = 8 - posY;

        this.x = this.posX * TILE_SIZE;
        this.y = this.posY * TILE_SIZE;

        this.id = Math.random()*10000; 

        this.side = side;
        this.oppSide = side == Side.white ? Side.black : Side.white;

        this.moves = [];
        this.hasMoved = false;
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

    calculateLegalMoves() {
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
    checkNextPiece(currentPos, direction, pieces) {
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
        if (this.isOutOfBounds(newPos)) { return }

        this.moves.push(newPos);
        this.checkNextPiece(newPos, direction, pieces);
    }

    isOutOfBounds(move) {
        if (move.x > 7 || move.x < 0 || move.y > 7 || move.y < 0) {
            return true;
        } 
        return false;
    }

    remove(move) {
        this.moves.splice(this.moves.indexOf(move), 1);
    }

    calculateLegalMoves() {
        this.findControllingSquares();
        this.trimIllegalMoves();
    }

    trimIllegalMoves() {
        let legalMoves = [];
        for (const move of this.moves) {
            let backupPos = { x: this.posX, y: this.posY }
            this.posX = move.x;
            this.posY = move.y;

            let oppPieces = [];
            for (const piece of board.getPieces(this.oppSide)) {
                if (piece.posX != move.x || piece.posY != move.y) {
                    oppPieces.push(piece);
                }
            }

            let king = board.findPiece(King, this.side);
            if (!king.isCheck(oppPieces)) {
                legalMoves.push(move);
            }

            // Undo
            this.posX = backupPos.x;
            this.posY = backupPos.y;
        }

        this.moves = legalMoves;
    }

    isInOriginalPos() {
        return this.posX == this.originalPos.x && this.posY == this.originalPos.y
    }
}