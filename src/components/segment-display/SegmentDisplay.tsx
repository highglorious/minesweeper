import React, { FC } from "react";
import { getSegmentSprite } from "../../utils/getSprite";

import styles from "./SegmentDisplay.module.css";

type SegmentDisplayProps = {
  value: number;
};
type SegmentProps = {
  segment: number;
};

const Segment: FC<SegmentProps> = ({ segment }) => {
  return (
    <div
      className={styles.segment}
      style={{ backgroundPosition: getSegmentSprite(segment) }}
    ></div>
  );
};

export const SegmentDisplay: FC<SegmentDisplayProps> = ({ value }) => {
  const digits = Array.from(String(value), Number);
  while (digits.length < 3) {
    digits.unshift(0);
  }

  return (
    <div className={styles.display}>
      {digits.map((digit, i) => (
        <Segment key={i} segment={digit} />
      ))}
    </div>
  );
};
