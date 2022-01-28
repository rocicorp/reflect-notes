import { expect } from "chai";
import { PeekIterator } from "./peek-iterator";
import { test } from "mocha";

test("PeekIterator", () => {
  const c = new PeekIterator("abc"[Symbol.iterator]());
  expect(c.peek().value).to.equal("a");
  expect(c.peek().value).to.equal("a");
  expect(c.next().value).to.equal("a");
  expect(c.peek().value).to.equal("b");
  expect(c.peek().value).to.equal("b");
  expect(c.next().value).to.equal("b");
  expect(c.peek().value).to.equal("c");
  expect(c.peek().value).to.equal("c");
  expect(c.next().value).to.equal("c");
  expect(c.peek().done).to.be.true;
  expect(c.peek().done).to.be.true;
  expect(c.next().done).to.be.true;
});