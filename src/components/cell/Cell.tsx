import { FC } from "react";
import { getCellSprite } from "../../utils/getSprite";
import styles from "./Cell.module.css";

type CellProps = {
  cell: number;
};
export const Cell: FC<CellProps> = ({ cell }) => {
  return (
    <div
      className={styles.cell}
      style={{ backgroundPosition: getCellSprite(cell) }}
    ></div>
  );
};
