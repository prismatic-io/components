const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: input({ label: "AWS Region", type: "string", required: false }),
    dynamicAccessAllInputs: {},
  };
});
vi.mock("../../client", () => ({
  createS3Client: vi.fn(async () => ({ send: sendMock })),
}));
import { S3ServiceException } from "@aws-sdk/client-s3";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../../connections";
import { getObject } from "./getObject";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const baseInputs = {
  awsRegion: "us-east-2",
  accessKey: connection,
  bucket: "example-bucket",
  objectKey: "example/object.txt",
  dynamicAccessKeyId: "",
  dynamicSecretAccessKey: "",
  dynamicSessionToken: "",
};
describe("getObject", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({
      Body: { transformToByteArray: async () => new Uint8Array([1, 2, 3]) },
      ContentType: "text/plain",
    });
  });
  test("sends VersionId when a version ID is provided", async () => {
    await invoke(getObject, {
      ...baseInputs,
      versionId: "AMn71WZYnWqbvfy0unBOdtaBC.DRiN_r",
    });
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].input).toMatchObject({
      Bucket: "example-bucket",
      Key: "example/object.txt",
      VersionId: "AMn71WZYnWqbvfy0unBOdtaBC.DRiN_r",
    });
  });
  test("omits VersionId when the version ID input is blank", async () => {
    await invoke(getObject, {
      ...baseInputs,
      versionId: getObject.inputs.versionId.clean(""),
    });
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].input.VersionId).toBeUndefined();
  });
  test("propagates an SDK service error", async () => {
    sendMock.mockReset();
    sendMock.mockRejectedValue(
      new S3ServiceException({
        name: "NoSuchKey",
        $fault: "client",
        $metadata: { httpStatusCode: 404 },
        message: "NoSuchKey error",
      }),
    );
    await expect(
      invoke(getObject, { ...baseInputs, versionId: undefined }),
    ).rejects.toMatchObject({
      name: "NoSuchKey",
      $metadata: { httpStatusCode: 404 },
    });
  });
});
