vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  const stringInput = (label: string) =>
    input({ label, type: "string", required: false });
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: stringInput("AWS Region"),
    dynamicAccessAllInputs: {
      dynamicAccessKeyId: stringInput("Dynamic Access Key ID"),
      dynamicSecretAccessKey: stringInput("Dynamic Secret Access Key"),
      dynamicSessionToken: stringInput("Dynamic Session Token"),
    },
  };
});
import {
  pollChangesFilesTriggerInputs,
  pollNewBucketsTriggerInputs,
} from "./triggers";
describe("input order (connection first, awsRegion last)", () => {
  test("pollChangesFilesTriggerInputs", () => {
    expect(Object.keys(pollChangesFilesTriggerInputs)).toEqual([
      "accessKey",
      "dynamicAccessKeyId",
      "dynamicSecretAccessKey",
      "dynamicSessionToken",
      "bucket",
      "lookBackDate",
      "awsRegion",
    ]);
  });
  test("pollNewBucketsTriggerInputs", () => {
    expect(Object.keys(pollNewBucketsTriggerInputs)).toEqual([
      "accessKey",
      "dynamicAccessKeyId",
      "dynamicSecretAccessKey",
      "dynamicSessionToken",
      "lookBackDate",
      "awsRegion",
    ]);
  });
});
