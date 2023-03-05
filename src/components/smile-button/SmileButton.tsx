import { FC } from "react";
import { getSmileSprite } from "../../utils/getSprite";
import styles from "./SmileButton.module.css";

type SmileButtonProps = {
  smile: number;
  handleClick: () => void;
  handleDown: () => void;
};
export const SmileButton: FC<SmileButtonProps> = ({
  smile,
  handleClick,
  handleDown,
}) => {
  return (
    <div
      className={styles.smile}
      style={{ backgroundPosition: getSmileSprite(smile) }}
      onClick={handleClick}
      onMouseDown={handleDown}
    ></div>
  );
};
