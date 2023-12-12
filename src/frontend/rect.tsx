import type { Reflect } from "@rocicorp/reflect/client";
import React, { useEffect, useState } from "react";
import type { M } from "../datamodel/mutators";
import { useShapeByID } from "../datamodel/subscriptions";
import { Editor } from "./editor";

export function Rect({ r, id }: { r: Reflect<M>; id: string }) {
  const shape = useShapeByID(r, id);

  type Position = { x: number; y: number };
  const [dragOffset, setDragOffset] = useState<Position | null>(null);

  useEffect(() => {
    if (!shape || !dragOffset) {
      return undefined;
    }

    const listener = (e: PointerEvent) => {
      void r.mutate.updateShape({
        id,
        x: e.pageX - dragOffset.x,
        y: e.pageY - dragOffset.y,
      });
      e.target && (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    window.addEventListener("pointermove", listener, { capture: true });
    window.addEventListener("lostpointercapture", () => setDragOffset(null), {
      capture: true,
    });

    return () =>
      window.removeEventListener("pointermove", listener, { capture: true });
  }, [dragOffset]);

  if (!shape) {
    return null;
  }

  const { x, y, width, height } = shape;
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
      onMouseDown={(e) => startDrag(e)}
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
        <Editor r={r} shape={shape} />
      </div>
    </div>
  );
}
