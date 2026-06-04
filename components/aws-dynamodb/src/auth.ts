import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import {
  type Credentials,
  assumeRole,
  assumeRoleConnection,
  toOptionalString,
  toTrimmedString,
} from "aws-utils";
import { accessKeySecretPair } from "./connections";
import type { CreateDynamoClientParams } from "./interfaces/CreateDynamoClientParams";

const validateConnection = (connection: Connection): void => {
  if (![accessKeySecretPair.key, assumeRoleConnection.key].includes(connection.key)) {
    throw new ConnectionError(connection, `Unsupported connection method ${connection.key}.`);
  }
};

const getCredentials = (connection: Connection): Credentials => {
  validateConnection(connection);
  return {
    accessKeyId: toTrimmedString(connection.fields.accessKeyId),
    secretAccessKey: toTrimmedString(connection.fields.secretAccessKey),
  };
};

export const createDynamoClient = async ({
  awsConnection,
  region: awsRegion,
  debug,
  logger,
}: CreateDynamoClientParams): Promise<DynamoDBClient> => {
  const { accessKeyId, secretAccessKey } = getCredentials(awsConnection);
  const shouldAssumeRole = awsConnection.key === assumeRoleConnection.key;

  const credentials = shouldAssumeRole
    ? await assumeRole(
        awsRegion,
        accessKeyId,
        secretAccessKey,
        toTrimmedString(awsConnection.fields.roleARN),
        toOptionalString(awsConnection.fields?.externalId),
      )
    : {
        accessKeyId,
        secretAccessKey,
      };

  const region = awsRegion.length > 0 ? awsRegion : undefined;

  return new DynamoDBClient({
    region,
    credentials,
    logger: debug ? logger : undefined,
  });
};
