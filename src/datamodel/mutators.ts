import { initClient, updateClient } from "./client-state";
import { setNote, updateNote, deleteNote } from "./note";
import { mutators as yjsMutators } from "@rocicorp/reflect-yjs";

export type M = typeof mutators;

export const mutators = {
  initClient,
  updateClient,
  setNote,
  updateNote,
  deleteNote,
  ...yjsMutators,
};
