enum spriteYPosition {
  segment = 0,
  smile = 24,
  cell = 51,
  digit = 68,
}

enum spriteWidth {
  segment = 14,
  smile = 27,
  cell = 17,
  digit = 17,
}

enum smileVariant {
  normal,
  pressed,
  scary,
  glasses,
  dead,
}

enum cellVariant {
  normal,
  pressed,
  flag,
  question,
  questionPressed,
  bomb,
  redBomb,
  crossBomb,
}

export const getSegmentSprite = (segment: number) => {
  const spriteYPos = spriteYPosition.segment;
  let spriteXPos;
  if (segment === 0) {
    spriteXPos = -9 * spriteWidth.segment;
  } else {
    spriteXPos = (1 - segment) * spriteWidth.segment;
  }
  //console.log("x=", spriteXPos, "y=", spriteYPos);

  return `${spriteXPos}px ${spriteYPos}px`;
};

export const getDigitSprite = (digit: number) => {
  const spriteYPos = -spriteYPosition.digit;
  const spriteXPos = (1 - digit) * spriteWidth.digit;
  return `${spriteXPos}px ${spriteYPos}px`;
};

export const getSmileSprite = (smile: smileVariant) => {
  const spriteYPos = -spriteYPosition.smile;
  const spriteXPos = -(smile * spriteWidth.smile);
  return `${spriteXPos}px ${spriteYPos}px`;
};

export const getCellSprite = (cell: cellVariant) => {
  const spriteYPos = -spriteYPosition.cell;
  const spriteXPos = -(cell * spriteWidth.cell);
  return `${spriteXPos}px ${spriteYPos}px`;
};
