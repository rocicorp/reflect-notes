import { initClient, updateClient } from "./client-state";
import { setShape, updateShape, deleteShape } from "./shape";
import { mutators as yjsMutators } from "@rocicorp/reflect-yjs";

export type M = typeof mutators;

export const mutators = {
  initClient,
  updateClient,
  setShape,
  updateShape,
  deleteShape,
  ...yjsMutators,
};
