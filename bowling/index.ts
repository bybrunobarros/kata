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
