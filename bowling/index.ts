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

function isSpare(firstTry: number, secondTry: number): boolean {
  return firstTry < 10 && firstTry + secondTry === 10;
}

function isStrike(firstTry: number): boolean {
  return firstTry === 10;
}

function getBonus(
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

      if (isSpare(firstTry, secondTry)) {
        return acc + firstTry + secondTry + getBonus(frames, index, 1);
      }
      if (isStrike(firstTry)) {
        return acc + firstTry + getBonus(frames, index, 2);
      }

      return acc + firstTry + secondTry;
    },
    0,
  );
}
