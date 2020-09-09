type NONE = "none";
type SPARE = "spare";
type STRIKE = "strike";
type Bonus = NONE | SPARE | STRIKE;

type Frame = [number, number?];

type Game = [
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame?,
  Frame?,
];

const NONE: NONE = "none";
const SPARE: SPARE = "spare";
const STRIKE: STRIKE = "strike";

function isSpare(firstTry: number, secondTry: number): boolean {
  return firstTry < 10 && firstTry + secondTry === 10;
}

function isStrike(firstTry: number): boolean {
  return firstTry === 10;
}

function getBonusType(firstTry: number, secondTry: number): Bonus {
  if (isSpare(firstTry, secondTry)) {
    return SPARE;
  }
  if (isStrike(firstTry)) {
    return STRIKE;
  }
  return NONE;
}

function getBonusScore(
  frames: Game,
  currentIndex: number,
  pinCount: number,
): number {
  const score = frames
    .slice(currentIndex + 1)
    .flat()
    .slice(0, pinCount)
    .reduce((acc, pins) => {
      if (acc !== undefined && pins !== undefined) {
        acc = acc + pins;
      }
      return acc;
    }, 0);

  return score || 0;
}

export function play(frames: Game): number {
  return frames.reduce(
    (acc: number, frame: Frame | undefined, index: number): number => {
      if (index >= 10 || frame === undefined) return acc;

      const [firstTry, secondTry = 0] = frame;
      const bonus = getBonusType(firstTry, secondTry);

      if (bonus === SPARE) {
        return acc + firstTry + secondTry + getBonusScore(frames, index, 1);
      }
      if (bonus === STRIKE) {
        return acc + firstTry + getBonusScore(frames, index, 2);
      }

      return acc + firstTry + secondTry;
    },
    0,
  );
}
