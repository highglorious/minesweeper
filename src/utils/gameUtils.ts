const ROWS = 16;
const COLS = 16;

type CellType = {
  value: number;
  state: number;
};
export const generateCells = (): CellType[][] => {
  let cells: CellType[][] = [];

  for (let i = 0; i < ROWS; i++) {
    cells.push([]);
    for (let j = 0; j < COLS; j++) {
      cells[i][j] = {
        value: 0,
        state: 0,
      };
    }
  }
  console.log(cells);

  return cells;
};
