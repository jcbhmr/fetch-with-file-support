# `fetch()` with `file:` support

📂 `fetch()` but with support for `file:///my/file.txt` URLs

🔎 Works great for writing isomorphic `fetch(import.meta.resolve())` code \
✅ Uses streaming `openAsBlob()` if available \
🧰 Supports bringing your own `fetch()` function \
🦕 Mirrors Deno's implementation of `fetch()` for `file:` URLs

## Installation

You can install this package using your favorite npm package manager like npm,
[Yarn], [pnpm], or [Bun].

```sh
npm install fetch-with-file-support
```

You can import it straight from npm if you're using [Deno]:

```js
import { fetch } from "npm:fetch-with-file-support";
```

ℹ Deno already supports `fetch()`-ing `file:` URLs. This package will delegate
to the native `fetch()` implementation.

🛑 In browsers this will delegate to the global `fetch()` function. Some
browsers support `fetch()`-ing `file:` URLs while others do not. Some support
`file:` URLs only under special circumstances.

## Usage

The quickest way to get started is to import the `fetch()` function straight
from the module:

```js
import { fetch } from "fetch-with-file-support";

const response = await fetch(import.meta.resolve("./package.json"));
const json = await response.json();
```

This is very useful when writing code that imports configuration, data, or other
information from a file located right next to the `.js` source file. WASM is a
good example.

```js
import { fetch } from "fetch-with-file-support";

// Normally 'fetch("file:///mypkg/app_bg.wasm")' would fail!
const { module, instance } = await WebAssembly.instantiateStreaming(
  fetch(import.meta.resolve("./app_bg.wasm")),
  imports,
);
```

If you want to bring your own `fetch()` implementation, you can bind the `this`
context of the `fetch()` function to an object with `.fetch`, `.Request`,
`.Response`, and `.Headers` properties. The implementation will use these
instead of the globals.

```js
import * as undici from "undici";
import { fetch as fetchUnbound } from "fetch-with-file-support";
const fetch = fetchUnbound.bind(undici);

const response = await fetch(new URL("./package.json", import.meta.url));
const json = await response.json();
```
