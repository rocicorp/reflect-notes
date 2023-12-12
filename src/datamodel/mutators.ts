import { initClient, updateClient } from "./client-state";
import { setShape, updateShape, deleteShape, initShapes } from "./shape";
import { mutators as yjsMutators } from "@rocicorp/reflect-yjs";

export type M = typeof serverMutators;

export const serverMutators = {
  initClient,
  updateClient,
  setShape,
  updateShape,
  deleteShape,
  // TODO: Use roomStartHandler
  initShapes,
  ...yjsMutators,
};

export const clientMutators: M = {
  ...serverMutators,
  initShapes: async () => {
    //
  },
};
