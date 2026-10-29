const buf = Buffer.from("sampleBuffer");
export const buildExampleResponse = buf.buffer.slice(
  buf.byteOffset,
  buf.byteOffset + buf.byteLength,
);

export const DELETE_CONTENT_RESPONSE = "DELETED SUCCESSFULLY";

export const CLEAR_CONTENT_RESPONSE = "CLEARED SUCCESSFULLY";
