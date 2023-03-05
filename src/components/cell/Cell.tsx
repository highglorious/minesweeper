import { FC, MouseEventHandler } from "react";
import { cellVariant, getCellSprite } from "../../utils/getSprite";
import styles from "./Cell.module.css";

type CellProps = {
  row: number;
  col: number;
  value: number;
  state: number;
  handleClick(row: number, col: number): MouseEventHandler;
  handleDown(row: number, col: number): MouseEventHandler;
  handleRightClick(row: number, col: number): MouseEventHandler;
};
export const Cell: FC<CellProps> = ({
  row,
  col,
  value,
  state,
  handleClick,
  handleDown,
  handleRightClick,
}) => {
  let cellSprite = {
    backgroundPosition: getCellSprite(state),
  };

  if (state === cellVariant.opened) {
    cellSprite.backgroundPosition = getCellSprite(value);
  }
  return (
    <div
      className={styles.cell}
      style={cellSprite}
      onClick={handleClick(row, col)}
      onMouseDown={handleDown(row, col)}
      onContextMenu={handleRightClick(row, col)}
    />
  );
};
