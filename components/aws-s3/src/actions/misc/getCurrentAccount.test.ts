const { stsSendMock, stsConstructorMock } = vi.hoisted(() => ({
  stsSendMock: vi.fn(),
  stsConstructorMock: vi.fn(),
}));
vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: input({ label: "AWS Region", type: "string", required: false }),
    dynamicAccessAllInputs: {},
  };
});
vi.mock("../../client", () => ({
  createS3Client: vi.fn(async () => ({
    send: vi.fn(),
    config: {
      credentials: { accessKeyId: "fakeKey", secretAccessKey: "fakeSecret" },
    },
  })),
}));
vi.mock("@aws-sdk/client-sts", async (importOriginal) => {
  const original = await importOriginal<typeof import("@aws-sdk/client-sts")>();
  class STSClient {
    send = stsSendMock;
    constructor(config: unknown) {
      stsConstructorMock(config);
    }
  }
  return { ...original, STSClient };
});
import {
  GetCallerIdentityCommand,
  STSServiceException,
} from "@aws-sdk/client-sts";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../../connections";
import { getCurrentAccountExamplePayload } from "../../examplePayloads";
import { getCurrentAccount } from "./getCurrentAccount";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const baseInputs = {
  accessKey: connection,
  dynamicAccessKeyId: "",
  dynamicSecretAccessKey: "",
  dynamicSessionToken: "",
};
describe("getCurrentAccount", () => {
  beforeEach(() => {
    stsSendMock.mockReset();
    stsConstructorMock.mockReset();
  });
  test("builds an STS client from the S3 credentials and returns the caller identity", async () => {
    stsSendMock.mockResolvedValue(getCurrentAccountExamplePayload.data);
    const { result } = await invoke(getCurrentAccount, baseInputs);
    expect(stsConstructorMock).toHaveBeenCalledWith({
      credentials: { accessKeyId: "fakeKey", secretAccessKey: "fakeSecret" },
    });
    const command = stsSendMock.mock.calls[0][0];
    expect(command).toBeInstanceOf(GetCallerIdentityCommand);
    expect(command.input).toEqual({});
    expect(result).toEqual(getCurrentAccountExamplePayload);
  });
  test("propagates an SDK service error", async () => {
    stsSendMock.mockRejectedValue(
      new STSServiceException({
        name: "ExpiredToken",
        $fault: "client",
        $metadata: { httpStatusCode: 403 },
        message: "ExpiredToken error",
      }),
    );
    await expect(invoke(getCurrentAccount, baseInputs)).rejects.toMatchObject({
      name: "ExpiredToken",
      $metadata: { httpStatusCode: 403 },
    });
  });
});
