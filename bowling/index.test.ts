import test from "ava";
import { play } from "./index";

test("when 10 frames the game should return a score", (t) => {
  const score = play([
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
  ]);
  t.is(score, 20);
});
