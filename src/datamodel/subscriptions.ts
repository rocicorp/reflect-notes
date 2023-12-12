import type { Reflect } from "@rocicorp/reflect/client";
import { useSubscribe, usePresence } from "@rocicorp/reflect/react";
import { getClient, mustGetClient } from "./client-state";
import { getNote, listNoteIDs } from "./note";
import type { M } from "./mutators";

export function useNoteIDs(reflect: Reflect<M>) {
  return useSubscribe(reflect, listNoteIDs, []);
}

export function useNoteByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(reflect, (tx) => getNote(tx, id), null);
}

export function useCollaboratorIDs(reflect: Reflect<M>) {
  const clientIDs = usePresence(reflect);
  return clientIDs.filter((id) => id !== reflect.clientID);
}

export function useMyClient(reflect: Reflect<M>) {
  return useSubscribe(reflect, (tx) => mustGetClient(tx, tx.clientID), null);
}

export function useClient(reflect: Reflect<M>, clientID: string) {
  return useSubscribe(reflect, (tx) => getClient(tx, clientID), null);
}
