import type { WriteTransaction } from "@rocicorp/reflect";
import {
  initClientState,
  setCursor,
  overShape,
  selectShape,
} from "./client-state";
import {
  setShape,
  deleteShape,
  moveShape,
  scanShape,

  initShapes,
} from "./shape";
import { mutators as yjsMutators } from "@rocicorp/reflect-yjs";

export type M = typeof serverMutators;

export const serverMutators = {
  createShape: setShape,
  deleteShape,
  moveShape,
  scanShape,

  initClientState,
  setCursor,
  overShape,
  selectShape,
  initShapes,
  nop: async (_: WriteTransaction) => {},
  ...yjsMutators
};

export const clientMutators: M = {
  ...serverMutators,
  initShapes: async () => {},
};
