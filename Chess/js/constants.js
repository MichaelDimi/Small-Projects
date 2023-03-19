let BOARD_SIZE = 500;

let COLS = 8;
let ROWS = 8;

let TILE_SIZE = BOARD_SIZE / 8;

let BLACK_PIECE = "#2B2A2A";
let WHITE_PIECE = "#F4F4F4";

let BLACK_TILE = "#B7C0D8";
let WHITE_TILE = "#E8EDF9";

const Direction = {
    north: { x:  0, y: -1 },
    south: { x:  0, y:  1 },
    east:  { x: -1, y:  0 },
    west:  { x:  1, y:  0 },

    north_west: { x: -1, y: -1 },
    north_east: { x:  1, y: -1 },
    south_west: { x: -1, y:  1 },
    south_east: { x:  1, y:  1 },
}