import { useEffect, useRef, useState } from "react";
import type { Reflect } from "@rocicorp/reflect/client";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./nav.module.css";
import { randomShape } from "../datamodel/shape";
import type { M } from "../datamodel/mutators";
import { OnlineStatus } from "./online-status";
import { useMyClient } from "src/datamodel/subscriptions";

type NavProps = {
  r: Reflect<M>;
  online: boolean;
};

export function Nav({ r, online }: NavProps) {
  const [aboutVisible, showAbout] = useState(false);
  const [shareVisible, showShare] = useState(false);
  const urlBox = useRef<HTMLInputElement>(null);
  const client = useMyClient(r);

  useEffect(() => {
    if (shareVisible) {
      urlBox.current && urlBox.current.select();
    }
  });

  const onRectangle = () => {
    void r.mutate.setShape(randomShape());
  };

  return (
    <>
      <div className={styles.nav} style={{}}>
        <div
          onClick={() => onRectangle()}
          className={styles.button}
          title="Square"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1h16v16H1V1zm1 1h14v14H2V2z"
              fillRule="evenodd"
              fill="white"
            ></path>
          </svg>
          <div
            style={{
              paddingLeft: "10px",
            }}
          >
            New Note
          </div>
        </div>
        {/*
        <div
          className={styles.button}
          title="Clear All"
          onClick={() => rep.mutate.deleteAllShapes()}
        >
          <svg
            width="18"
            height="18"
            viewBox="1 1 14 14"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(45deg)" }}
          >
            <path
              d="M15 8V7H9V1H8v6H2v1h6v6h1V8h6z"
              fillRule="nonzero"
              fillOpacity="1"
              fill="white"
              stroke="none"
            ></path>
          </svg>
        </div>*/}
        <div className={`${styles.button}`} onClick={() => showShare(true)}>
          Share
        </div>
        <div
          className={`${styles.button} ${styles.about}`}
          onClick={() => showAbout(true)}
        >
          About this Demo
        </div>
        <div className={styles.spacer}></div>
        <OnlineStatus online={online} />
        {client && (
          <div
            className={styles.user}
            style={{
              backgroundColor: client.color,
            }}
          >
            {client.avatar} {client.name}
          </div>
        )}
      </div>
      <Modal show={aboutVisible} onHide={() => showAbout(false)} centered>
        <Modal.Header closeButton placeholder>
          <Modal.Title>About StickyNotes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This is a demonstration of{" "}
            <a href="https://reflect.net" target="_blank">
              <u>Reflect</u>
            </a>{" "}
            — a JS library and web service for building multiplayer web apps.
          </p>
          <p>
            Try{" "}
            <a href={location.href} target="_blank">
              <u>opening this page</u>
            </a>{" "}
            in two browser windows and create stickynotes collboratively.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            href="https://github.com/rocicorp/reflect-stickynotes"
            target="_blank"
          >
            Demo Source
          </Button>
          <Button variant="primary" href="https://reflect.net/" target="_blank">
            Reflect Homepage
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={shareVisible} onHide={() => showShare(false)} centered>
        <Modal.Header closeButton placeholder>
          <Modal.Title>Share Stickynotes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Text>Copy this URL and send to anyone:</Form.Text>
            <Form.Control
              ref={urlBox}
              type="url"
              value={location.href}
              readOnly
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => showShare(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
