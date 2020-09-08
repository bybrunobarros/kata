type None = "None";
type Spare = "Spare";
type Strike = "Strike";
type Bonus = None | Spare | Strike;

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

export function play(frames: Game): number {
  return frames.reduce((acc: number, frame: Frame | undefined): number => {
    if (frame === undefined) return acc;

    const [firstTry, secondTry = 0] = frame;
    acc = acc + firstTry + secondTry;
    return acc;
  }, 0);
}
