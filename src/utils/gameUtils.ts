import { cellVariant } from "./getSprite";

export const ROWS = 16;
export const COLS = 16;
export const BOMBS = 5;
export const AMBIENT = [
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export type CellType = {
  value: number;
  state: number;
};
export const generateCells = (): CellType[][] => {
  let cells: CellType[][] = [];

  for (let i = 0; i < ROWS; i++) {
    cells.push([]);
    for (let j = 0; j < COLS; j++) {
      cells[i][j] = {
        value: cellVariant.hidden,
        state: cellVariant.hidden,
      };
    }
  }

  return cells;
};

export const plantBombs = (
  row: number,
  col: number,
  cells: CellType[][]
): number[] => {
  let adjacentBombs: number;
  const startCell = row * COLS + col;
  const bombs = generateBombs(startCell);
  bombs.forEach(
    (value) =>
      (cells[Math.floor(value / ROWS)][value % ROWS] = {
        ...cells[Math.floor(value / ROWS)][value % ROWS],
        value: cellVariant.bomb,
      })
  );

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      adjacentBombs = 0;
      if (cells[i][j].value === cellVariant.bomb) {
        continue;
      }
      AMBIENT.forEach((v) => {
        let row = i + v[0];
        let col = j + v[1];
        if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
          if (cells[row][col].value === cellVariant.bomb) {
            adjacentBombs++;
          }
        }
      });

      cells[i][j].value = adjacentBombs;
    }
  }
  return bombs;
};

export const showBombs = (cells: CellType[][], arr: number[]) => {
  arr.forEach((value) => {
    if (
      cells[Math.floor(value / ROWS)][value % ROWS].state !== cellVariant.flag
    ) {
      cells[Math.floor(value / ROWS)][value % ROWS].state = cellVariant.bomb;
    }
  });
};

const generateBombs = (startCell: number) => {
  const range = ROWS * COLS;

  var randoms = [];
  for (let i = 0; i < BOMBS; i++) {
    let random;
    let check = true;
    while (check === true) {
      do {
        random = Math.floor(Math.random() * range);
      } while (random === startCell);

      check = randoms.includes(random);
      if (check === false) {
        randoms.push(random);
      }
    }
  }
  return randoms;
};

export const showSafetyCells = (
  i: number,
  j: number,
  cells: CellType[][]
): number => {
  let counter = 0;

  const cleanCells: number[][] = [];
  cleanCells.push([i, j]);

  const getAmbientCells = (i: number, j: number) => {
    AMBIENT.forEach((v) => {
      let row = i + v[0];
      let col = j + v[1];
      let temp = [];
      if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
        if (
          cells[row][col].value === 0 &&
          cells[row][col].state !== cellVariant.opened &&
          cells[row][col].state !== cellVariant.flag &&
          cells[row][col].state !== cellVariant.question
        ) {
          temp = [row, col];
          if (!cleanCells.includes(temp)) {
            cleanCells.push([row, col]);
          }
          if (cells[row][col].state !== cellVariant.opened) {
            cells[row][col].state = cellVariant.opened;
            counter++;
          }
        } else if (
          cells[row][col].value !== cellVariant.opened &&
          cells[row][col].value !== cellVariant.bomb &&
          cells[row][col].state !== cellVariant.flag &&
          cells[row][col].state !== cellVariant.question
        ) {
          if (cells[row][col].state !== cellVariant.opened) {
            cells[row][col].state = cellVariant.opened;
            counter++;
          }
        }
      }
    });
  };

  do {
    const item = cleanCells.shift();
    getAmbientCells(item![0], item![1]);
  } while (cleanCells.length > 0);

  return counter;
};

export const logBoard = (data: CellType[][]) => {
  let logRow;
  for (let row = 0; row < ROWS; row++) {
    logRow = `${row}: `;
    for (let col = 0; col < COLS; col++) {
      if (data[row][col].value === cellVariant.bomb) {
        logRow += "(x)";
      } else {
        logRow += ` ${data[row][col].value} `;
      }
    }
    console.log(logRow);
  }
};
