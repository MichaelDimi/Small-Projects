class Knight extends Piece {
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
            img.setAttribute('src', '/images/white-knight.svg');
        } else {
            img.setAttribute('src', '/images/black-knight.svg');
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
        let pieces = board.white.concat(board.black);

        this.moves = [];

        this.moves.push({ x: this.posX - 1, y: this.posY - 2});
        this.moves.push({ x: this.posX + 1, y: this.posY - 2});
        this.moves.push({ x: this.posX - 1, y: this.posY + 2});
        this.moves.push({ x: this.posX + 1, y: this.posY + 2});
        
        this.moves.push({ x: this.posX - 2, y: this.posY - 1});
        this.moves.push({ x: this.posX + 2, y: this.posY - 1});
        this.moves.push({ x: this.posX - 2, y: this.posY + 1});
        this.moves.push({ x: this.posX + 2, y: this.posY + 1});

        for (const piece of pieces) {
            if (this == piece) continue;

            for (const move of this.moves) {
                if (move.x == piece.posX && move.y == piece.posY) {
                    if (piece.side != this.side) {
                        move.take = true;
                        continue;
                    }
                    this.moves.splice(this.moves.indexOf(move), 1);
                    continue;
                }

                if (move.x > 7 || move.x < 0 || move.y > 7 || move.y < 0) {
                    this.moves.splice(this.moves.indexOf(move), 1);
                    continue;
                }
            }
        }


    }
}