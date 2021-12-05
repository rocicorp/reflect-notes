import { z } from "zod";
import { Patch } from "../protocol/poke";
import { Executor } from "./pg";
import { userValuePrefix, userValueSchema } from "./user-value";
import { NullableVersion } from "./version";

export async function getPatch(
  executor: Executor,
  roomID: string,
  fromCookie: NullableVersion
): Promise<Patch> {
  const t0 = Date.now();
  const vals = await executor(
    `select key, value from entry where
        starts_with(key, '${userValuePrefix}') and
        roomid = $1 and
        ((value->>'version')::integer) > $2`,
    [roomID, fromCookie ?? 0]
  );
  console.log(`Read ${vals.rows.length} entries in`, Date.now() - t0);

  const patch: Patch = [];
  for (let row of vals.rows) {
    const { key, value } = row;
    const validKey = z.string().parse(key);
    const validValue = userValueSchema.parse(value);
    const unwrappedKey = validKey.substring(userValuePrefix.length);
    const unwrappedValue = validValue.value;
    if (validValue.deleted) {
      patch.push({
        op: "del",
        key: unwrappedKey,
      });
    } else {
      patch.push({
        op: "put",
        key: unwrappedKey,
        value: unwrappedValue,
      });
    }
  }
  return patch;
}
