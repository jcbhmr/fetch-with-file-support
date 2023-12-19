import openAsBlob from "./lib/node-fs-openAsBlob.js";

export async function fetch(
  this:
    | undefined
    | any
    | {
        fetch: typeof globalThis.fetch;
        Request: typeof globalThis.Request;
        Response: typeof globalThis.Response;
        Headers: typeof globalThis.Headers;
      },
  input: RequestInfo,
  init: RequestInit | undefined = {},
) {
  const {
    fetch = globalThis.fetch,
    Request = globalThis.Request,
    Response = globalThis.Response,
    Headers = globalThis.Headers,
  } = this ?? globalThis;
  const request =
    input instanceof Request && !init ? input : new Request(input, init);
  if (request.url.startsWith("file:")) {
    if (request.method === "GET") {
      let blob: Blob;
      try {
        blob = await openAsBlob(new URL(request.url));
      } catch (error) {
        throw new TypeError("NetworkError when attempting to fetch resource");
      }
      return new Response(blob);
    } else {
      throw new TypeError(
        `Fetching files only supports the GET method. ` +
          `Recieved ${request.method}.`,
      );
    }
  } else {
    return await fetch(request);
  }
}
