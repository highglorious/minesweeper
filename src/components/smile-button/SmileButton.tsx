import { FC } from "react";
import { getSmileSprite } from "../../utils/getSprite";
import styles from "./SmileButton.module.css";
type SmyleButtonProps = {
  smile: number;
};
export const SmileButton: FC<SmyleButtonProps> = ({ smile }) => {
  return (
    <div
      className={styles.smile}
      style={{ backgroundPosition: getSmileSprite(smile) }}
    ></div>
  );
};
