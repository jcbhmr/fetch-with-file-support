import * as fs from "node:fs";
import { readFile } from "node:fs/promises";

let { openAsBlob } = fs;
openAsBlob ??= async (path, options) => {
  const buffer = await readFile(path);
  return new Blob([buffer], options);
};
export default openAsBlob;
