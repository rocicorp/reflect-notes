import type { WriteTransaction } from "@rocicorp/reflect";
import { nanoid } from "nanoid";
import { randInt } from "../util/rand";
import { generate } from "@rocicorp/rails";

export type Shape = {
  id: string;
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

export const {
  get: getShape,
  list: listShapes,
  listIDs: listShapeIDs,
  set: setShape,
  update: updateShape,
  delete: deleteShape,
} = generate<Shape>("shape");

export async function initShapes(tx: WriteTransaction) {
  if (await tx.has("initialized")) {
    return;
  }
  const shapes = Array.from({ length: 1 }, () => randomShape());
  await Promise.all([
    tx.set("initialized", true),
    ...shapes.map((s) => setShape(tx, s)),
  ]);
}

export function randomShape() {
  return {
    id: nanoid(),
    type: "rect",
    x: randInt(0, 400),
    y: randInt(0, 400),
    width: 300,
    height: 300,
    rotate: 90,
    fill: "yellow",
  } as Shape;
}
