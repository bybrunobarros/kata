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

test("when 10 spares the game should return a score with spare bonuses", (t) => {
  const score = play([
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5],
  ]);
  t.is(score, 150);
});
