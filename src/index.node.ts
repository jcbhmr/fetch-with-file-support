import openAsBlob from "./lib/node-fs-openAsBlob.js";

const { fetch: globalThisFetch, Request, Response, Headers } = globalThis

export async function fetch(
  input: RequestInfo,
  init: RequestInit | undefined = {},
) {
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
    return await globalThisFetch(request);
  }
}