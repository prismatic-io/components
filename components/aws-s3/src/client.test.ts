const { s3Mock } = vi.hoisted(() => ({ s3Mock: vi.fn<new () => object>() }));
vi.mock("@aws-sdk/client-s3", () => {
  return {
    S3Client: s3Mock,
  };
});
vi.mock("aws-utils", () => {
  return {
    assumeRoleConnection: {
      key: "awsAssumeRole",
    },
    getClientParams: vi.fn(async () => ({
      region: "us-east-2",
      credentials: {
        accessKeyId: "fakeKey",
        secretAccessKey: "fakeKey",
        sessionToken: undefined,
      },
    })),
  };
});
import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createS3Client } from "./client";
import { accessKeySecretPair } from "./connections";
describe("createS3Client", () => {
  describe("invalid credentials", () => {
    beforeAll(() => {
      s3Mock.mockImplementationOnce(
        class {
          constructor() {
            throw new Error("!Invalid");
          }
        },
      );
    });
    test("throws error if invalid credentials provided", async () => {
      expect.assertions(1);
      const connection = createConnection(accessKeySecretPair, {
        accessKeyId: "fakeKey",
        secretAccessKey: "fakeKey",
      });
      try {
        await createS3Client({
          awsConnection: connection,
          awsRegion: "us-east-2",
          dynamicAccessKeyId: "",
          dynamicSecretAccessKey: "",
          dynamicSessionToken: undefined,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ConnectionError);
      }
    });
  });
  describe("valid credentials", () => {
    beforeAll(() => {
      s3Mock.mockImplementation(class {});
    });
    test("returns S3 client with api key secret credentials", async () => {
      await createS3Client({
        awsConnection: createConnection(accessKeySecretPair, {
          accessKeyId: "fakeKey",
          secretAccessKey: "fakeKey",
        }),
        awsRegion: "us-east-2",
        dynamicAccessKeyId: "",
        dynamicSecretAccessKey: "",
        dynamicSessionToken: undefined,
      });
      expect(s3Mock).toHaveBeenCalled();
    });
  });
});
