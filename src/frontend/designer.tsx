import type { Reflect } from "@rocicorp/reflect/client";
import React, { useRef } from "react";
import { Collaborator } from "./collaborator";
import { touchToMouse } from "./events";
import { useShapeIDs, useCollaboratorIDs } from "../datamodel/subscriptions";
import type { M } from "../datamodel/mutators";
import { Rect } from "./rect";

export function Designer({ r }: { r: Reflect<M> }) {
  const ids = useShapeIDs(r);
  const collaboratorIDs = useCollaboratorIDs(r);

  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = ({ pageX, pageY }: { pageX: number; pageY: number }) => {
    if (ref && ref.current) {
      void r.mutate.updateClient({
        id: r.clientID,
        cursor: {
          x: pageX,
          y: pageY - ref.current.offsetTop,
        },
      });
    }
  };

  return (
    <div
      {...{
        ref,
        style: {
          position: "relative",
          display: "flex",
          flex: 1,
          overflow: "hidden",
        },
        onMouseMove,
        onTouchMove: (e) => touchToMouse(e, onMouseMove),
      }}
    >
      {ids.map((id) => (
        <Rect key={`shape-${id}`} r={r} id={id} />
      ))}

      {
        // collaborators
        // foreignObject seems super buggy in Safari, so instead we do the
        // text labels in an HTML context, then do collaborator selection
        // rectangles as their own independent svg content. Le. Sigh.
        [...collaboratorIDs].map((id) => (
          <Collaborator key={`key-${id}`} r={r} clientID={id} />
        ))
      }
    </div>
  );
}
