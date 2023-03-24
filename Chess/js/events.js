function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) { // checks for touch screen and only 1 finger
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else if (e.clientX && e.clientY) { // checks for x and y position of mouse
        return { x: e.clientX, y: e.clientY }
    }
}

let isDragging = false;
let isMouseDown = false;
let selectedPiece = null;
let canvasPos;

function onMouseDown(e) {

    isMouseDown = true;

    canvasPos = getCanvasPos(e);

    let element = document.getElementsByClassName("piece")[0]
    let size = element.getBoundingClientRect().width;
    let scaledPos = {x: Math.abs(Math.round((canvasPos.x - size/2) / size)), y: Math.abs(Math.round((canvasPos.y - size/2) / size))};

    let pieceElement;
    for (const piece of board.black) {
        if (piece.posX == scaledPos.x && piece.posY == scaledPos.y) {
            if (turn != Side.black) { break }
            console.log(piece);
            selectedPiece = piece;

            pieceElement = document.getElementById(selectedPiece.id);
            pieceElement.style.zIndex = 999;
            pieceElement.style.transform = "scale(1.1)";
        }
    }
    for (const piece of board.white) {
        if (piece.posX == scaledPos.x && piece.posY == scaledPos.y) {
            if (turn != Side.white) { break }
            console.log(piece);
            selectedPiece = piece;
            
            pieceElement = document.getElementById(selectedPiece.id);
            pieceElement.style.zIndex = 999;
            pieceElement.style.transform = "scale(1.04)";
        }
    }

    let selector = document.getElementById("selector");
    if (pieceElement == null) {
        selector.style.display = "none";
        if (selectedPiece != null) {
            dropPiece();
        }
    } else {
        selector.style.display = "block";
        selector.style.left = pieceElement.style.left;
        selector.style.top = pieceElement.style.top;

        // Show the pieces possible moves
        selectedPiece.calculateLegalMoves();
        // Draw the possible moves
        clearDots();
        selectedPiece.drawMoves();
    }   
}

function onMouseUp(e) {
    isMouseDown = false;

    let pieceElement;
    if (selectedPiece != null) {
        pieceElement = document.getElementById(selectedPiece.id);
        pieceElement.style.zIndex = 10;
        pieceElement.style.transform = "scale(0.96)";
    } else {
        
    }

    if (isDragging) {
        isDragging == false;
        
        dropPiece();

        selector.style.display = "block";
        selector.style.left = pieceElement.style.left;
        selector.style.top = pieceElement.style.top;

    } else {

    }
}

function onMouseMove(e) {
    if (isMouseDown) {

        if (selectedPiece == null) return;

        isDragging = true;

        canvasPos = getCanvasPos(e);

        selectedPiece.x = canvasPos.x;
        selectedPiece.y = canvasPos.y;

        selectedPiece.update(canvasPos.x, canvasPos.y);
    } else {
        isDragging = false;
    }
}

function dropPiece() {
    if (selectedPiece == null) { return }
    let pieceElement = document.getElementById(selectedPiece.id);

    let element = document.getElementsByClassName("piece")[0]
    let size = element.getBoundingClientRect().width;
    let scaledPos = {x: Math.abs(Math.round((canvasPos.x - size/2) / size)), y: Math.abs(Math.round((canvasPos.y - size/2) / size))};

    let pieces = board.white.concat(board.black);
    let shouldUpdate = false;
    let selectedMove = null;

    // If not a valid one of your moves
    for (const move of selectedPiece.moves) {
        if (move.x == scaledPos.x && move.y == scaledPos.y) {
            shouldUpdate = true;
            selectedMove = move;
        }
    }

    if (shouldUpdate == true) {
        // Is the piece one of your own or other side
        if (!selectedMove.rokada) {
            for (const piece of pieces) {
                if (piece.side == selectedPiece.side) {
                    if (piece.posX == scaledPos.x && piece.posY == scaledPos.y) {
                        // Move back (overlap your piece)
                        shouldUpdate = false;
                        break;
                    }
                } else {
                    if (selectedMove.enPassant) {
                        if (piece.posX == selectedMove.x && 
                            piece.posY == selectedMove.y - selectedPiece.offset) {

                            takePiece(piece);
                            break;
                        }
                    } else if (piece.posX == scaledPos.x && piece.posY == scaledPos.y) {
                        takePiece(piece);
                        break;
                    }
                }
            }
        } else {
            let rook;
            if (selectedMove.queenSide) {
                rook = board.findPieces(Rook, selectedPiece.side).find(r => r.posX == 0);
                rook.posX = selectedMove.x + 1;
            } else {
                rook = board.findPieces(Rook, selectedPiece.side).find(r => r.posX == 7);
                rook.posX = selectedMove.x - 1;
            }

            let rookElement = document.getElementById(rook.id);
            rookElement.style.transition = "250ms";
            rookElement.style.left = rook.posX*12.5 + "%";
            rookElement.style.top = rook.posY*12.5 + "%";
            rookElement.style.transition = "0";
        }
    }
    
    if (shouldUpdate) {
        selectedPiece.hasMoved = true;

        // Update valid EnPassant piece
        if (selectedMove.twoSquareAdvance) {
            board.validEnPassantPiece = selectedPiece;
        } else {
            board.validEnPassantPiece = null;
        }

        selectedPiece.posX = scaledPos.x;
        selectedPiece.posY = scaledPos.y;

        // Recompute the new position
        selectedPiece.calculateLegalMoves();

        turn = (turn == Side.black) ? Side.white : Side.black;

        pieceElement.style.transition = "250ms";
    }
    clearDots();

    pieceElement.style.left = selectedPiece.posX*12.5 + "%";
    pieceElement.style.top = selectedPiece.posY*12.5 + "%";
    pieceElement.style.transition = "0ms";

    selectedPiece = null;
}

function clearDots() {
    let dots = document.querySelectorAll("#board-container .dot");
    
    for (const dot of dots) {
        dot.remove();
    }
}

// HELPER FUNCTIONS
function getCanvasPos(e) {
    let pos = getEventLocation(e);
    let canvasBounds = canvas.getBoundingClientRect();

    return {x: pos.x - canvasBounds.x, y: pos.y - canvasBounds.y};
}


canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMouseMove);