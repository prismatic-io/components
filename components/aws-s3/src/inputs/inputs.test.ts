vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: input({ label: "AWS Region", type: "string", required: false }),
    dynamicAccessAllInputs: {},
  };
});
import {
  abortMultipartUploadInputs,
  bucketEventTriggerConfigurationInputs,
  closeUploadStreamInputs,
  copyObjectInputs,
  createTopicInputs,
  generatePresignedForMultiparUploadsInputs,
  generatePresignedUrlInputs,
  getObjectInputs,
  listObjectsInputs,
  putObjectLockConfigurationInputs,
  putObjectRetentionInputs,
  subscribeToTopicInputs,
  unsubscribeFromTopicInputs,
  uploadPartInputs,
} from ".";
type Clean = (value: unknown) => unknown;
const toStringCleaned: [string, Clean][] = [
  ["objectKey", getObjectInputs.objectKey.clean],
  ["bucket", getObjectInputs.bucket.clean],
  ["sourceBucket", copyObjectInputs.sourceBucket.clean],
  ["destinationBucket", copyObjectInputs.destinationBucket.clean],
  ["sourceKey", copyObjectInputs.sourceKey.clean],
  ["destinationKey", copyObjectInputs.destinationKey.clean],
  ["prefix", listObjectsInputs.prefix.clean],
  ["actionType", generatePresignedUrlInputs.actionType.clean],
  ["uploadId (multipart)", abortMultipartUploadInputs.uploadId.clean],
  ["uploadId (upload stream)", closeUploadStreamInputs.uploadId.clean],
  ["retainUntilDate", putObjectRetentionInputs.retainUntilDate.clean],
  ["name", createTopicInputs.name.clean],
  ["snsTopicArn", subscribeToTopicInputs.snsTopicArn.clean],
  ["endpoint", subscribeToTopicInputs.endpoint.clean],
  ["subscriptionArn", unsubscribeFromTopicInputs.subscriptionArn.clean],
  [
    "bucketOwnerAccountid",
    bucketEventTriggerConfigurationInputs.bucketOwnerAccountid.clean,
  ],
  [
    "eventNotificationName",
    bucketEventTriggerConfigurationInputs.eventNotificationName.clean,
  ],
];
describe.each(
  toStringCleaned,
)("%s clean (util.types.toString)", (_name, clean) => {
  test.each([
    ["path/to/file.txt", "path/to/file.txt"],
    [42, "42"],
    [undefined, ""],
    [null, ""],
  ])("normalizes %j to %j", (value, expected) => {
    expect(clean(value)).toBe(expected);
  });
  test("does not trim surrounding whitespace (characterized coercion)", () => {
    expect(clean(" my-bucket ")).toBe(" my-bucket ");
  });
  test("coerces an object to '[object Object]' rather than throwing (characterized coercion)", () => {
    expect(clean({ a: 1 })).toBe("[object Object]");
  });
});
const toIntCleaned: [string, Clean][] = [
  ["expirationSeconds", generatePresignedUrlInputs.expirationSeconds.clean],
  ["partNumber", uploadPartInputs.partNumber.clean],
  [
    "defaultRetentionDays",
    putObjectLockConfigurationInputs.defaultRetentionDays.clean,
  ],
  [
    "defaultRetentionYears",
    putObjectLockConfigurationInputs.defaultRetentionYears.clean,
  ],
];
describe.each(toIntCleaned)("%s clean (util.types.toInt)", (_name, clean) => {
  test.each([
    ["3600", 3600],
    [" 7 ", 7],
    [12, 12],
  ])("normalizes %j to %j", (value, expected) => {
    expect(clean(value)).toBe(expected);
  });
  test("throws for a non-numeric value", () => {
    expect(() => clean("abc")).toThrow("Value 'abc' cannot be coerced to int.");
  });
  test("coerces blank and fractional values instead of throwing (characterized coercion)", () => {
    expect(clean("")).toBe(0);
    expect(clean(undefined)).toBe(0);
    expect(clean("3.9")).toBe(3);
  });
});
describe("maxKeys clean (toOptionalInt)", () => {
  const clean: Clean = listObjectsInputs.pagination.inputs.maxKeys.clean;
  test.each([
    ["50", 50],
    [" 7 ", 7],
    [12, 12],
  ])("normalizes %j to %j", (value, expected) => {
    expect(clean(value)).toBe(expected);
  });
  test.each([
    [""],
    ["   "],
    [undefined],
    [null],
    ["0"],
  ])("returns undefined for %j so Amazon S3 applies its default", (value) => {
    expect(clean(value)).toBeUndefined();
  });
  test("throws for a non-numeric value", () => {
    expect(() => clean("abc")).toThrow("Value 'abc' cannot be coerced to int.");
  });
});
describe("urlsToGenerate clean (inline toInt wrapper, default 5)", () => {
  const clean: Clean =
    generatePresignedForMultiparUploadsInputs.urlsToGenerate.clean;
  test("normalizes a numeric string", () => {
    expect(clean("10")).toBe(10);
  });
  test("falls back to 5 for a blank value", () => {
    expect(clean("")).toBe(5);
    expect(clean(undefined)).toBe(5);
  });
  test("throws for a non-numeric value instead of substituting 5", () => {
    expect(() => clean("abc")).toThrow("must be a whole number greater than 0");
  });
});
