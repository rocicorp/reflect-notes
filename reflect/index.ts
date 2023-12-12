import type { ReflectServerOptions } from "@rocicorp/reflect/server";
import { mutators, M } from "../src/datamodel/mutators.js";
import { initRoom } from "../src/datamodel/note.js";

function makeOptions(): ReflectServerOptions<M> {
  return {
    mutators,
    roomStartHandler: initRoom,
  };
}

export { makeOptions as default };
