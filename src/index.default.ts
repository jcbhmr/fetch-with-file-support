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
  return await fetch(input, init);
}
