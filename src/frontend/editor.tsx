"use client";
import type { Reflect } from "@rocicorp/reflect/client";
import { useEffect, useState } from "react";
import { Provider } from "@rocicorp/reflect-yjs";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as Y from "yjs";
import type { M } from "../datamodel/mutators";
import type { Mutators as YJSMutators } from "@rocicorp/reflect-yjs";
import { useMyClient } from "../datamodel/subscriptions";
import type { Note } from "src/datamodel/note";
import type { Client } from "src/datamodel/client-state";

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

  if (!doc || !provider || !client) {
    return null;
  }

  return <TiptapEditor doc={doc} provider={provider} client={client} />;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
  client: Client;
};

function TiptapEditor({ doc, provider, client }: EditorProps) {
  const { name, color, avatar } = client;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: doc,
      }),
      // Attach provider and user info
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name,
          color,
          picture: avatar,
        },
      }),
    ],
  });

  return <EditorContent editor={editor} />;
}
