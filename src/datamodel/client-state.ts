import { randInt } from "../util/rand";
import { generate } from "@rocicorp/rails";
import type { WriteTransaction } from "@rocicorp/reflect";

const colors = [
  "#f94144",
  "#f3722c",
  "#f8961e",
  "#f9844a",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#4d908e",
  "#577590",
  "#277da1",
];
const avatars = [
  ["🐶", "Puppy"],
  ["🐱", "Kitty"],
  ["🐭", "Mouse"],
  ["🐹", "Hamster"],
  ["🐰", "Bunny"],
  ["🦊", "Fox"],
  ["🐻", "Bear"],
  ["🐼", "Panda"],
  ["🐻‍❄️", "Polar Bear"],
  ["🐨", "Koala"],
  ["🐯", "Tiger"],
  ["🦁", "Lion"],
  ["🐮", "Cow"],
  ["🐷", "Piggy"],
  ["🐵", "Monkey"],
  ["🐣", "Chick"],
];

export type UserInfo = {
  avatar: string;
  name: string;
  color: string;
};

export type ClientState = {
  id: string;
  cursor: { x: number; y: number } | null;
  overID: string;
  selectedID: string;
  userInfo: UserInfo;
};

export const {
  init: initClientState,
  get: getClientState,
  mustGet: mustGetClientState,
  put: putClientState,
  update: updateClientState,
} = generate<ClientState>("client-state");

export async function setCursor(
  tx: WriteTransaction,
  { x, y }: { x: number; y: number }
): Promise<void> {
  await updateClientState(tx, { id: tx.clientID, cursor: { x, y } });
}

export async function overShape(
  tx: WriteTransaction,
  shapeID: string
): Promise<void> {
  await updateClientState(tx, { id: tx.clientID, overID: shapeID });
}

export async function selectShape(
  tx: WriteTransaction,
  shapeID: string
): Promise<void> {
  await updateClientState(tx, { id: tx.clientID, selectedID: shapeID });
}

export function randUserInfo(): UserInfo {
  const [avatar, name] = avatars[randInt(0, avatars.length - 1)];
  return {
    avatar,
    name,
    color: colors[randInt(0, colors.length - 1)],
  };
}
