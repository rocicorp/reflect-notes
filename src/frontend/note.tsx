import type { Reflect } from "@rocicorp/reflect/client";
import React, { useEffect, useState } from "react";
import type { M } from "../datamodel/mutators";
import { useNoteByID } from "../datamodel/subscriptions";
import { Editor } from "./editor";

export function Note({ r, id }: { r: Reflect<M>; id: string }) {
  const note = useNoteByID(r, id);

  type Position = { x: number; y: number };
  const [dragOffset, setDragOffset] = useState<Position | null>(null);

  useEffect(() => {
    if (!note || !dragOffset) {
      return undefined;
    }

    const listener = (e: PointerEvent) => {
      void r.mutate.updateNote({
        id,
        x: e.pageX - dragOffset.x,
        y: e.pageY - dragOffset.y,
      });
      e.target && (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    window.addEventListener("pointermove", listener, { capture: true });

    return () =>
      window.removeEventListener("pointermove", listener, { capture: true });
  }, [dragOffset]);

  if (!note) {
    return null;
  }

  const { x, y, width, height } = note;
  const startDrag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDragOffset({
      x: e.pageX - x,
      y: e.pageY - y,
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        left: -1,
        top: -1,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        backgroundColor: "#ffeb3b",
        border: "1px solid #ffd54f",
        boxShadow: "3px 3px 7px rgba(0,0,0,0.2)",
        width: width + 2,
        height: height + 2,
      }}
      onPointerDown={(e) => startDrag(e)}
      onLostPointerCapture={() => setDragOffset(null)}
      onPointerUp={() => setDragOffset(null)}
    >
      <div
        className="container"
        {...{
          style: {
            width,
            height,
          },
        }}
      >
        <Editor r={r} note={note} />
      </div>
    </div>
  );
}
