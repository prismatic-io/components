vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: input({ label: "AWS Region", type: "string", required: false }),
    dynamicAccessAllInputs: {},
  };
});
import { getBucketLocation } from "../actions/buckets/getBucketLocation";
import { generatePresignedForMultiparUploads } from "../actions/multipartUploads/generatePresignedForMultiparUploads";
import { uploadPart } from "../actions/multipartUploads/uploadPart";
import { generatePresignedUrl } from "../actions/objects/generatePresignedUrl";
import { closeUploadStream } from "../actions/uploadStreams/closeUploadStream";
import { createUploadStream } from "../actions/uploadStreams/createUploadStream";
import { writeUploadStream } from "../actions/uploadStreams/writeUploadStream";
import {
  closeUploadStreamExamplePayload,
  createUploadStreamExamplePayload,
  generatePresignedForMultiparUploadsExamplePayload,
  generatePresignedUrlExamplePayload,
  getBucketLocationExamplePayload,
  uploadPartExamplePayload,
  writeUploadStreamExamplePayload,
} from "../examplePayloads";
type Schema = {
  type?: string | string[];
  properties?: Record<string, Schema>;
  items?: Schema;
  required?: string[];
};
const typeOf = (value: unknown): string => {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
};
const mismatches = (
  schema: Schema,
  value: unknown,
  path = "data",
): string[] => {
  const actual = typeOf(value);
  const allowed = schema.type === undefined ? [] : [schema.type].flat();
  if (allowed.length > 0 && !allowed.includes(actual)) {
    return [`${path}: expected ${allowed.join("|")}, got ${actual}`];
  }
  if (actual === "array" && schema.items) {
    const items = schema.items;
    return (value as unknown[]).flatMap((item, index) =>
      mismatches(items, item, `${path}[${index}]`),
    );
  }
  if (actual === "object") {
    const record = value as Record<string, unknown>;
    const missing = (schema.required ?? [])
      .filter((key) => !(key in record))
      .map((key) => `${path}.${key}: required but missing`);
    const nested = Object.entries(schema.properties ?? {})
      .filter(([key]) => record[key] !== undefined)
      .flatMap(([key, child]) =>
        mismatches(child, record[key], `${path}.${key}`),
      );
    return [...missing, ...nested];
  }
  return [];
};
const schemaOf = (definition: { outputSchema?: unknown }): Schema | undefined =>
  (
    definition.outputSchema as
      | {
          schema?: Schema;
        }
      | undefined
  )?.schema;
describe("perform-synthesized output schemas", () => {
  it.each([
    [
      "generatePresignedUrl",
      generatePresignedUrl,
      generatePresignedUrlExamplePayload,
    ],
    [
      "generatePresignedForMultiparUploads",
      generatePresignedForMultiparUploads,
      generatePresignedForMultiparUploadsExamplePayload,
    ],
    [
      "createUploadStream",
      createUploadStream,
      createUploadStreamExamplePayload,
    ],
    ["writeUploadStream", writeUploadStream, writeUploadStreamExamplePayload],
    ["closeUploadStream", closeUploadStream, closeUploadStreamExamplePayload],
    ["getBucketLocation", getBucketLocation, getBucketLocationExamplePayload],
    ["uploadPart", uploadPart, uploadPartExamplePayload],
  ])("%s declares a schema its example payload satisfies", (_name, definition, payload) => {
    const schema = schemaOf(definition);
    expect(schema).toBeDefined();
    expect(mismatches(schema as Schema, payload.data)).toEqual([]);
  });
  it("uploadPart describes the part object the perform adds", () => {
    const part = schemaOf(uploadPart)?.properties?.part;
    expect(part).toEqual({
      type: "object",
      properties: { ETag: { type: "string" }, PartNumber: { type: "number" } },
      required: ["PartNumber"],
    });
  });
  it("the mismatch check rejects a payload of the wrong shape", () => {
    const schema: Schema = {
      type: "array",
      items: {
        type: "object",
        properties: { url: { type: "string" } },
        required: ["partNumber"],
      },
    };
    expect(mismatches(schema, [{ url: 1 }])).toEqual([
      "data[0].partNumber: required but missing",
      "data[0].url: expected string, got number",
    ]);
  });
});
