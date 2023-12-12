import type { Reflect } from "@rocicorp/reflect/client";
import { useSubscribe, usePresence } from "@rocicorp/reflect/react";
import { getClient, mustGetClient } from "./client-state";
import { getShape, listShapeIDs } from "./shape";
import type { M } from "./mutators";

export function useShapeIDs(reflect: Reflect<M>) {
  return useSubscribe(reflect, listShapeIDs, []);
}

export function useShapeByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(reflect, (tx) => getShape(tx, id), null);
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
