# `fetch()` with `file:` support

📂 `fetch()` but with support for `file:///my/file.txt` URLs

<table align=center><td>

```js
// Native Node.js fetch
const response = await fetch(import.meta.resolve("./data.txt"));
const text = await response.text();
console.log(text);
// 🛑 TypeError: fetch failed
//   cause: Error: not implemented... yet...
```

<tr><td>

```js
// Using fetch-with-file-support in Node.js
import { fetch } from "fetch-with-file-support";
const response = await fetch(import.meta.resolve("./data.txt"));
const text = await response.text();
console.log(text);
// 'Hello from data.txt!'
```

</table>

🔎 Works great for writing isomorphic `fetch(import.meta.resolve())` code \
✅ Uses streaming `openAsBlob()` if available \
🧰 Supports bringing your own `fetch()` function \
🦕 Mirrors Deno's implementation of `fetch()` for `file:` URLs

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)

You can install this package using your favorite npm package manager like npm,
[Yarn], [pnpm], or [Bun].

```sh
npm install fetch-with-file-support
```

ℹ Deno already supports `fetch()`-ing `file:` URLs. This package will delegate
to the native `fetch()` implementation.

🛑 In browsers this will delegate to the global `fetch()` function. Some
browsers support `fetch()`-ing `file:` URLs while others do not. Some support
`file:` URLs only under special circumstances.

## Usage

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

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

// Normally 'fetch("file:///mypkg/app_bg.wasm")' would fail in Node.js!
const { module, instance } = await WebAssembly.instantiateStreaming(
  fetch(import.meta.resolve("./app_bg.wasm")),
  imports,
);
```

🌎 If you prefer global polyfills, you can import
`fetch-with-file-support/auto`.

```js
import "fetch-with-file-support/auto";
const response = await fetch(import.meta.resolve("./data.json"));
const json = await response.json();
```

## Development

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)

[![](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https://stackblitz.com/~/github.com/jcbhmr/fetch-with-file-support)

[deno]: https://deno.com/
[yarn]: https://yarnpkg.com/
[pnpm]: https://pnpm.io/
[bun]: https://bun.sh/
