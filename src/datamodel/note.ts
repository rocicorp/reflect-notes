import type { WriteTransaction } from "@rocicorp/reflect";
import { nanoid } from "nanoid";
import { randInt } from "../util/rand";
import { generate } from "@rocicorp/rails";

export type Note = {
  id: string;
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

export const {
  get: getNote,
  list: listNotes,
  listIDs: listNoteIDs,
  set: setNote,
  update: updateNote,
  delete: deleteNote,
} = generate<Note>("note");

export async function initRoom(tx: WriteTransaction) {
  if (await tx.has("initialized")) {
    return;
  }

  await setNote(tx, {
    id: nanoid(),
    type: "rect",
    x: 100,
    y: 100,
    width: 300,
    height: 300,
    fill: "yellow",
  });
}

export function randomNote() {
  return {
    id: nanoid(),
    type: "rect",
    x: randInt(0, 400),
    y: randInt(0, 400),
    width: 300,
    height: 300,
    fill: "yellow",
  } as Note;
}
