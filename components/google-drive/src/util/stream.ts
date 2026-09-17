import type { Readable } from "node:stream";
export const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (c) => chunks.push(c));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", (err) => reject(err));
  });
};
