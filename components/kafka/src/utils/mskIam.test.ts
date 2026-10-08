import { fromTemporaryCredentials } from "@aws-sdk/credential-providers";
import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { generateAuthTokenFromCredentialsProvider } from "aws-msk-iam-sasl-signer-js";
import { type Mock, vi } from "vitest";
import { awsAccessKeySecret } from "../connections/awsAccessKeySecret";
import { awsAssumeRole } from "../connections/awsAssumeRole";
import { basic } from "../connections/basic";
import { createMskOauthBearerProvider, isMskIamConnection } from "./mskIam";
vi.mock("aws-msk-iam-sasl-signer-js", () => ({
  generateAuthTokenFromCredentialsProvider: vi.fn(),
}));
vi.mock("@aws-sdk/credential-providers", () => ({
  fromTemporaryCredentials: vi.fn(),
}));
const mockedGenerateToken =
  generateAuthTokenFromCredentialsProvider as unknown as Mock;
const mockedFromTemporaryCredentials =
  fromTemporaryCredentials as unknown as Mock;
const accessKeyConnection = createConnection(awsAccessKeySecret, {
  accessKeyId: "  AKIAIOSFODNN7EXAMPLE  ",
  secretAccessKey: " wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY ",
});
const assumeRoleConnection = createConnection(awsAssumeRole, {
  roleARN: "arn:aws:iam::123456789012:role/msk-client",
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  externalId: "shared-common-secret",
});
const REGION = "us-east-1";
beforeEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});
describe("isMskIamConnection", () => {
  test("recognizes both Amazon MSK IAM connections", () => {
    expect(isMskIamConnection(accessKeyConnection)).toBe(true);
    expect(isMskIamConnection(assumeRoleConnection)).toBe(true);
  });
  test("does not recognize the basic connection", () => {
    const connection = createConnection(basic, {
      username: "user",
      password: "pass",
      authMechanism: "plain",
    });
    expect(isMskIamConnection(connection)).toBe(false);
  });
});
const providerHandedToSigner = () =>
  mockedGenerateToken.mock.calls[0][0].awsCredentialsProvider;
describe("createMskOauthBearerProvider credentials resolution", () => {
  beforeEach(() => {
    mockedGenerateToken.mockResolvedValue({
      token: "signed-token",
      expiryTime: Date.now() + 900000,
    });
  });
  test("hands the signer the trimmed static key pair for the access key connection", async () => {
    await createMskOauthBearerProvider(accessKeyConnection, REGION)();
    await expect(providerHandedToSigner()()).resolves.toEqual({
      accessKeyId: "AKIAIOSFODNN7EXAMPLE",
      secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    });
    expect(mockedFromTemporaryCredentials).not.toHaveBeenCalled();
  });
  test("hands the signer an STS assume-role provider for the Role ARN connection", async () => {
    const stsProvider = vi.fn();
    mockedFromTemporaryCredentials.mockReturnValue(stsProvider);
    await createMskOauthBearerProvider(assumeRoleConnection, REGION)();
    expect(providerHandedToSigner()).toBe(stsProvider);
    expect(mockedFromTemporaryCredentials).toHaveBeenCalledWith({
      masterCredentials: {
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      },
      params: {
        RoleArn: "arn:aws:iam::123456789012:role/msk-client",
        RoleSessionName: "integration-session",
        ExternalId: "shared-common-secret",
      },
      clientConfig: { region: REGION },
    });
  });
  test("omits ExternalId when the Role ARN connection leaves it blank", () => {
    mockedFromTemporaryCredentials.mockReturnValue(vi.fn());
    const connection = createConnection(awsAssumeRole, {
      roleARN: "arn:aws:iam::123456789012:role/msk-client",
      accessKeyId: "AKIAIOSFODNN7EXAMPLE",
      secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      externalId: "",
    });
    createMskOauthBearerProvider(connection, REGION);
    const [options] = mockedFromTemporaryCredentials.mock.calls[0];
    expect(options.params).toEqual({
      RoleArn: "arn:aws:iam::123456789012:role/msk-client",
      RoleSessionName: "integration-session",
    });
  });
  test("throws a ConnectionError when the key pair is missing", () => {
    const connection = createConnection(awsAccessKeySecret, {
      accessKeyId: "",
      secretAccessKey: "",
    });
    expect(() => createMskOauthBearerProvider(connection, REGION)).toThrow(
      ConnectionError,
    );
  });
  test("throws a ConnectionError when the Role ARN is missing", () => {
    const connection = createConnection(awsAssumeRole, {
      roleARN: "   ",
      accessKeyId: "AKIAIOSFODNN7EXAMPLE",
      secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    });
    expect(() => createMskOauthBearerProvider(connection, REGION)).toThrow(
      "Role ARN is required.",
    );
    expect(mockedFromTemporaryCredentials).not.toHaveBeenCalled();
  });
});
describe("createMskOauthBearerProvider", () => {
  test("returns the signed token in the kafkajs oauthbearer shape", async () => {
    mockedGenerateToken.mockResolvedValue({
      token: "signed-token",
      expiryTime: Date.now() + 900000,
    });
    const provider = createMskOauthBearerProvider(accessKeyConnection, REGION);
    await expect(provider()).resolves.toEqual({ value: "signed-token" });
    expect(mockedGenerateToken).toHaveBeenCalledTimes(1);
    const [options] = mockedGenerateToken.mock.calls[0];
    expect(options.region).toBe(REGION);
    await expect(options.awsCredentialsProvider()).resolves.toEqual({
      accessKeyId: "AKIAIOSFODNN7EXAMPLE",
      secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    });
  });
  test("signs once and reuses the token until it nears expiry", async () => {
    vi.useFakeTimers({ now: 1000000 });
    mockedGenerateToken.mockResolvedValue({
      token: "first-token",
      expiryTime: 1000000 + 900000,
    });
    const provider = createMskOauthBearerProvider(accessKeyConnection, REGION);
    await provider();
    await provider();
    expect(mockedGenerateToken).toHaveBeenCalledTimes(1);
    vi.setSystemTime(1000000 + 900000 - 30000);
    mockedGenerateToken.mockResolvedValue({
      token: "second-token",
      expiryTime: 1000000 + 900000 + 900000,
    });
    await expect(provider()).resolves.toEqual({ value: "second-token" });
    expect(mockedGenerateToken).toHaveBeenCalledTimes(2);
  });
  test("shares one in-flight signing request between concurrent handshakes", async () => {
    let resolveToken: (value: { token: string; expiryTime: number }) => void =
      () => {};
    mockedGenerateToken.mockReturnValue(
      new Promise((resolve) => {
        resolveToken = resolve;
      }),
    );
    const provider = createMskOauthBearerProvider(accessKeyConnection, REGION);
    const first = provider();
    const second = provider();
    resolveToken({ token: "shared-token", expiryTime: Date.now() + 900000 });
    await expect(first).resolves.toEqual({ value: "shared-token" });
    await expect(second).resolves.toEqual({ value: "shared-token" });
    expect(mockedGenerateToken).toHaveBeenCalledTimes(1);
  });
  test("retries signing on the next call after a failure", async () => {
    mockedGenerateToken
      .mockRejectedValueOnce(new Error("STS is down"))
      .mockResolvedValueOnce({
        token: "recovered-token",
        expiryTime: Date.now() + 900000,
      });
    const provider = createMskOauthBearerProvider(accessKeyConnection, REGION);
    await expect(provider()).rejects.toThrow("STS is down");
    await expect(provider()).resolves.toEqual({ value: "recovered-token" });
    expect(mockedGenerateToken).toHaveBeenCalledTimes(2);
  });
});
