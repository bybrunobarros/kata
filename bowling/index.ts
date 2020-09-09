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

function isSpare(firstTry: number, secondTry: number): boolean {
  return firstTry < 10 && firstTry + secondTry === 10;
}

function getBonusType(firstTry: number, secondTry: number): Bonus {
  if (isSpare(firstTry, secondTry)) {
    return SPARE;
  }

  return NONE;
}

export function play(frames: Game): number {
  let bonus: Bonus = NONE;

  return frames.reduce(
    (acc: number, frame: Frame | undefined, index: number): number => {
      if (index >= 10 || frame === undefined) return acc;

      const [firstTry, secondTry = 0] = frame;
      bonus = getBonusType(firstTry, secondTry);

      if (bonus === NONE) {
        acc = acc + firstTry + secondTry;
      }
      if (bonus === SPARE) {
        const bonusScore = frames
          .slice(index + 1)
          .flat()
          .slice(0, 1)
          .reduce((acc, pins) => {
            if (acc !== undefined && pins !== undefined) {
              acc = acc + pins;
            }
            return acc;
          }, 0);
        acc = acc + firstTry + secondTry + (bonusScore || 0);
      }
      return acc;
    },
    0,
  );
}
