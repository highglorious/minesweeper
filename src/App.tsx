import { MouseEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { SegmentDisplay } from "./components/segment-display";
import { SmileButton } from "./components/smile-button";
import {
  BOMBS,
  CellType,
  COLS,
  generateCells,
  logBoard,
  plantBombs,
  ROWS,
  showBombs,
  showSafetyCells,
} from "./utils/gameUtils";
import { Cell } from "./components/cell";
import { cellVariant, smileVariant } from "./utils/getSprite";

import "./App.css";

export const App = (): ReactElement => {
  const [cells, setCells] = useImmer<CellType[][]>(() => generateCells());
  const [bombCount, setBombCount] = useState(BOMBS);
  const [smile, setSmile] = useState(smileVariant.normal);
  const [stopwatch, setStopwatch] = useState(0);
  const [firstClick, setFirstClick] = useState(true);
  const [bombs, setBombs] = useState<number[]>([]);
  const [play, setPlay] = useState(true);
  const [checkedCells, setCheckedCells] = useState(0);

  const stopwatchRef = useRef<number>();

  useEffect(() => {
    if (checkedCells === ROWS * COLS - BOMBS) {
      setPlay(false);
      setSmile(smileVariant.glasses);
      handleStopwatchStop();
    }
  }, [checkedCells]);

  const handleStopwatchStart = () => {
    clearInterval(stopwatchRef.current);
    stopwatchRef.current = setInterval(() => {
      setStopwatch((sec) => sec + 1);
    }, 1000);
  };

  const handleStopwatchStop = () => {
    clearInterval(stopwatchRef.current);
  };

  if (stopwatch === 999) {
    handleStopwatchStop();
  }

  const handleCellClick =
    (row: number, col: number) => (e: MouseEvent<HTMLButtonElement>) => {
      let counter = 0;
      if (play) {
        setSmile(smileVariant.normal);

        setCells((draft) => {
          if (draft[row][col].value === cellVariant.bomb) {
            showBombs(draft, bombs);
            draft[row][col].state = cellVariant.redBomb;
            setSmile(smileVariant.dead);
            setPlay(false);
            handleStopwatchStop();
          }

          if (draft[row][col].state === cellVariant.pressed) {
            draft[row][col].state = cellVariant.opened;
            setCheckedCells((prev) => prev + 1);
          }

          if (draft[row][col].value === 0) {
            counter = showSafetyCells(row, col, draft);
            setCheckedCells((prev) => prev + counter);
          }
        });
      }
    };

  const handleRigthCellClick =
    (row: number, col: number) => (e: MouseEvent<HTMLButtonElement>) => {
      console.log("RIGHT CLICK");
      e.preventDefault();
      if (play) {
        setCells((draft) => {
          if (
            draft[row][col].state !== cellVariant.opened &&
            draft[row][col].state !== cellVariant.flag &&
            draft[row][col].state !== cellVariant.question &&
            bombCount !== 0
          ) {
            draft[row][col].state = cellVariant.flag;
            console.log("bomb-", bombCount);
            setBombCount((prev) => prev - 1);
          } else if (draft[row][col].state === cellVariant.flag) {
            draft[row][col].state = cellVariant.question;
            console.log("bomb+", bombCount);
            setBombCount((prev) => prev + 1);
          } else if (draft[row][col].state === cellVariant.question) {
            draft[row][col].state = cellVariant.hidden;
            //console.log("bomb+", bombCount);
            //setBombCount((prev) => prev + 1);
          }
        });
      }
    };

  const handleCellDown =
    (row: number, col: number) => (e: MouseEvent<HTMLButtonElement>) => {
      console.log("DOWN CLICK");
      if (e.buttons === 1) {
        if (
          play &&
          cells[row][col].state !== cellVariant.flag &&
          cells[row][col].state !== cellVariant.question
        ) {
          setCells((draft) => {
            if (draft[row][col].state !== cellVariant.opened) {
              setSmile(smileVariant.scary);
              draft[row][col].state = cellVariant.pressed;
            }

            if (firstClick) {
              setFirstClick(false);
              setBombs(plantBombs(row, col, draft));
              handleStopwatchStart();
              logBoard(draft);
            }
          });
        }
      }
    };

  const handleCellLeave =
    (row: number, col: number) => (e: MouseEvent<HTMLButtonElement>) => {
      //handleCellClick(row, col);
    };

  const handleResetGame = () => {
    setFirstClick(true);
    setSmile(smileVariant.normal);
    setCells(generateCells());
    handleStopwatchStop();
    setStopwatch(0);
    setPlay(true);
    setBombCount(BOMBS);
    setCheckedCells(0);
  };

  const handleSmileDown = () => {
    setSmile(smileVariant.pressed);
  };

  const board = cells.map((row, i) =>
    row.map(({ value, state }, j) => (
      <Cell
        key={i * 10 + j}
        value={value}
        state={state}
        row={i}
        col={j}
        handleClick={handleCellClick}
        handleDown={handleCellDown}
        handleLeave={handleCellLeave}
        handleRightClick={handleRigthCellClick}
      />
    ))
  );

  return (
    <div className="App">
      <div className="header">
        <SegmentDisplay value={bombCount} />
        <SmileButton
          smile={smile}
          handleClick={handleResetGame}
          handleDown={handleSmileDown}
        />
        <SegmentDisplay value={stopwatch} />
      </div>
      <div className="board">{board}</div>
    </div>
  );
};
