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
}

export enum smileVariant {
  normal,
  pressed,
  scary,
  glasses,
  dead,
}

export enum cellVariant {
  normal = 10,
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

export const getSmileSprite = (smile: smileVariant) => {
  const spriteYPos = -spriteYPosition.smile;
  const spriteXPos = -(smile * spriteWidth.smile);
  return `${spriteXPos}px ${spriteYPos}px`;
};

export const getCellSprite = (cell: cellVariant | number) => {
  let spriteYPos = -spriteYPosition.digit;
  let spriteXPos = (1 - cell) * spriteWidth.cell;
  if (cell === 0) {
    spriteYPos = -spriteYPosition.cell;
    spriteXPos = -spriteWidth.cell;
  }
  if (cell > 9) {
    spriteYPos = -spriteYPosition.cell;
    spriteXPos = -(cell % 10) * spriteWidth.cell;
  }
  return `${spriteXPos}px ${spriteYPos}px`;
};
