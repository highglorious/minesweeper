import { cellVariant } from "./getSprite";

const ROWS = 16;
const COLS = 16;
const BOMBS = 40;
const AMBIENT = [
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

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
        value: cellVariant.normal,
        state: 0,
      };
    }
  }
  generateBombs().forEach(
    (value) =>
      (cells[Math.floor(value / ROWS)][value % ROWS] = {
        ...cells[Math.floor(value / ROWS)][value % ROWS],
        value: cellVariant.bomb,
      })
  );

  let ambientBombs: number;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      ambientBombs = 0;
      if (cells[i][j].value === cellVariant.bomb) {
        continue;
      }
      AMBIENT.forEach((v) => {
        let raw = i + v[0];
        let col = j + v[1];
        if (raw >= 0 && raw < ROWS && col >= 0 && col < COLS) {
          if (cells[raw][col].value === cellVariant.bomb) {
            ambientBombs++;
          }
        }
      });

      cells[i][j].value = ambientBombs;
    }
  }
  console.log("in func", cells);
  return cells;
};

const generateBombs = () => {
  const range = ROWS * COLS;

  var randoms = [];
  for (let i = 0; i < BOMBS; i++) {
    let random;
    let check = true;
    while (check === true) {
      random = Math.floor(Math.random() * range);
      check = randoms.includes(random);
      if (check === false) {
        randoms.push(random);
      }
    }
  }
  return randoms;
};
