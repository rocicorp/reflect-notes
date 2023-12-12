"use client";
import type { Reflect } from "@rocicorp/reflect/client";
import { useEffect, useState } from "react";
import { Provider } from "@rocicorp/reflect-yjs";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { Editor as NovelEditor } from "novel";
import * as Y from "yjs";
import type { M } from "../datamodel/mutators";
import type { Mutators as YJSMutators } from "@rocicorp/reflect-yjs";
import { useMyClient } from "../datamodel/subscriptions";
import type { Note } from "src/datamodel/note";

export function Editor({
  r,
  note,
}: {
  r: Reflect<M & YJSMutators>;
  note: Note;
}) {
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<Provider>();
  const client = useMyClient(r);

  useEffect(() => {
    if (!provider) {
      return;
    }
    const userField = client ? { ...client, picture: client.avatar } : null;
    provider.awareness.setLocalStateField("user", userField);
  }, [client, provider, note]);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new Provider(r, note.id, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, []);

  if (!doc || !provider) {
    return null;
  }

  return (
    client && (
      <NovelEditor
        extensions={[
          Collaboration.configure({
            document: doc,
          }),
          CollaborationCursor.configure({
            provider,
            user: { ...client, picture: client?.avatar },
          }),
        ]}
        defaultValue=""
        className="editor"
        disableLocalStorage={true}
      />
    )
  );
}
