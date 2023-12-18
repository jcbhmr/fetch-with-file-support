# `fetch()` with `file:` support

## Installation

```sh
npm install fetch-with-file-support
```

## Usage

```js
import { fetch } from "fetch-with-file-support"

const response = await fetch(import.meta.resolve("./package.json"))
const json = await response.json()
```

```js
import * as undici from "undici"
import { fetch as fetchUnbound } from "fetch-with-file-support"
const fetch = fetchUnbound.bind(undici)

const response = await fetch(new URL("./package.json", import.meta.url))
const json = await response.json()
```

```js
const fetch = fetchWithFileSupport.bind({
  fetch: underlyingFetch,
  Request: ...,
  Response: ...,
  Headers: ..., // Unused in implementation
})
```
