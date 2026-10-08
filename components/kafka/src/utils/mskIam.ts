import { fromTemporaryCredentials } from "@aws-sdk/credential-providers";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  type GenerateAuthTokenResponse,
  generateAuthTokenFromCredentialsProvider,
} from "aws-msk-iam-sasl-signer-js";
import type { OauthbearerProviderResponse } from "kafkajs";
import { awsAssumeRole } from "../connections/awsAssumeRole";
import {
  MSK_IAM_CONNECTION_KEYS,
  ROLE_SESSION_NAME,
  TOKEN_REFRESH_MARGIN_MS,
} from "../constants";
import type { AwsCredentialsProvider } from "../types";
export const isMskIamConnection = (connection: Connection): boolean =>
  MSK_IAM_CONNECTION_KEYS.includes(connection.key);
const createMskCredentialsProvider = (
  connection: Connection,
  region: string,
): AwsCredentialsProvider => {
  const accessKeyId = util.types.toString(connection.fields.accessKeyId).trim();
  const secretAccessKey = util.types
    .toString(connection.fields.secretAccessKey)
    .trim();
  if (!accessKeyId || !secretAccessKey) {
    throw new ConnectionError(
      connection,
      "Access Key ID and Secret Access Key are required.",
    );
  }
  if (connection.key !== awsAssumeRole.key) {
    return async () => ({ accessKeyId, secretAccessKey });
  }
  const roleArn = util.types.toString(connection.fields.roleARN).trim();
  if (!roleArn) {
    throw new ConnectionError(connection, "Role ARN is required.");
  }
  const externalId = util.types.toString(connection.fields.externalId).trim();
  return fromTemporaryCredentials({
    masterCredentials: { accessKeyId, secretAccessKey },
    params: {
      RoleArn: roleArn,
      RoleSessionName: ROLE_SESSION_NAME,
      ...(externalId && { ExternalId: externalId }),
    },
    clientConfig: { region },
  });
};
export const createMskOauthBearerProvider = (
  connection: Connection,
  region: string,
): (() => Promise<OauthbearerProviderResponse>) => {
  const awsCredentialsProvider = createMskCredentialsProvider(
    connection,
    region,
  );
  let current: GenerateAuthTokenResponse | undefined;
  let pending: Promise<GenerateAuthTokenResponse> | undefined;
  return async () => {
    if (current && Date.now() < current.expiryTime - TOKEN_REFRESH_MARGIN_MS) {
      return { value: current.token };
    }
    if (!pending) {
      pending = generateAuthTokenFromCredentialsProvider({
        region,
        awsCredentialsProvider,
      }).finally(() => {
        pending = undefined;
      });
    }
    current = await pending;
    return { value: current.token };
  };
};
