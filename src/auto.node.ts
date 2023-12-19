import { fetch as fetchUnbound } from "./index.node.js";

const fetch = fetchUnbound.bind({
  fetch: globalThis.fetch,
  Request,
  Response,
  Headers,
});
globalThis.fetch = fetch;
