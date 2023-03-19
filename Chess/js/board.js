var board = {
    canvas: document.createElement("div"),
    black: [],
    white: [],
    create: function() {
        // Initializes context and inserts canvas into DOM
        document.getElementById("board-container").insertBefore(this.canvas, document.getElementById("board-container").childNodes[0]);

        this.canvas.width = BOARD_SIZE;
        this.canvas.height = BOARD_SIZE;

        this.canvas.setAttribute('class', 'canvas');
    },
    draw: function() {
        canvas.style.backgroundImage = "url(images/Board.svg)";
    },
    initPieces: function() {
        { // White Pieces
            for (let i=0; i<COLS; i++) {
                let pawn = new Pawn(i, 2, Side.white);
                board.white.push(pawn);
            }

            let rookA = new Rook(0, 1, Side.white);
            let rookH = new Rook(7, 1, Side.white);
            board.white.push(rookA);
            board.white.push(rookH);

            let knightB = new Knight(1, 1, Side.white);
            let knightE = new Knight(6, 1, Side.white);
            board.white.push(knightB);
            board.white.push(knightE);

            let bishopC = new Bishop(2, 1, Side.white);
            let bishopF = new Bishop(5, 1, Side.white);
            board.white.push(bishopC);
            board.white.push(bishopF);

            let queen = new Queen(3, 1, Side.white);
            board.white.push(queen);

            let king = new King(4, 1, Side.white);
            board.white.push(king);
        }
        
        { // Black Pieces
            for (let i=0; i<COLS; i++) {
                let pawn = new Pawn(i, 7, Side.black);
                board.black.push(pawn);
            }

            let rookA = new Rook(0, 8, Side.black);
            let rookH = new Rook(7, 8, Side.black);
            board.black.push(rookA);
            board.black.push(rookH);

            let knightB = new Knight(1, 8, Side.black);
            let knightE = new Knight(6, 8, Side.black);
            board.black.push(knightB);
            board.black.push(knightE);

            let bishopC = new Bishop(2, 8, Side.black);
            let bishopF = new Bishop(5, 8, Side.black);
            board.black.push(bishopC);
            board.black.push(bishopF);

            let queen = new Queen(3, 8, Side.black);
            board.black.push(queen);

            let king = new King(4, 8, Side.black);
            board.black.push(king);
        }
    }
}

function takePiece(piece) {
    let takenPiece = document.getElementById(piece.id);
    takenPiece.style.display = "none";
    if (piece.side == Side.white) {
        board.white.splice(board.white.indexOf(piece), 1);
    } else {
        board.black.splice(board.black.indexOf(piece), 1);
    }
}

const Side = {
    white: "white",
    black: "black"
}