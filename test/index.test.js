import test from "node:test";
import assert from "node:assert/strict";
import { fetch } from "../dist/index.node.js";

test("fetch() http works ok", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json = await response.json();
  console.log(json);
});

test("fetch() file works ok", async () => {
  const response = await fetch(new URL("./example.txt", import.meta.url));
  const text = await response.text();
  console.log(text);
});
