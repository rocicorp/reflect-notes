import styles from "./collaborator.module.css";
import type { M } from "../datamodel/mutators";
import { useClient } from "../datamodel/subscriptions";
import type { Reflect } from "@rocicorp/reflect/client";

export function Collaborator({
  r,
  clientID,
}: {
  r: Reflect<M>;
  clientID: string;
}) {
  const client = useClient(r, clientID);

  if (!client || !client.cursor) {
    return null;
  }

  const { cursor } = client;

  return (
    <div className={styles.collaborator}>
      <div
        className={styles.cursor}
        style={{
          left: cursor.x,
          top: cursor.y,
          overflow: "auto",
        }}
      >
        <div className={styles.pointer} style={{ color: client.color }}>
          ➤
        </div>
        <div
          className={styles.userinfo}
          style={{
            backgroundColor: client.color,
            color: "white",
          }}
        >
          {client.avatar}&nbsp;{client.name}
        </div>
      </div>
    </div>
  );
}
