import { GlueClient } from "@aws-sdk/client-glue";
import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import {
  assumeRole,
  assumeRoleConnection,
  type Credentials,
  toOptionalString,
  toTrimmedString,
} from "aws-utils";
import { accessKeySecretPair } from "./connections";
import type { GlueClientProps } from "./interfaces/GlueClientProps";

const validateConnection = (connection: Connection): void => {
  if (
    ![accessKeySecretPair.key, assumeRoleConnection.key].includes(
      connection.key,
    )
  ) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};

const getCredentials = (connection: Connection): Credentials => {
  validateConnection(connection);
  return {
    accessKeyId: toTrimmedString(connection.fields.accessKeyId),
    secretAccessKey: toTrimmedString(connection.fields.secretAccessKey),
  };
};

export const createClient = async ({
  awsRegion,
  awsConnection,
}: GlueClientProps): Promise<GlueClient> => {
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

  try {
    return new GlueClient({
      region,
      credentials,
    });
  } catch (err) {
    throw new ConnectionError(
      awsConnection,
      `Invalid AWS Credentials have been configured. This is sometimes caused by missing characters from a copy/paste. Original AWS error message: ${
        (err as Error).message
      }`,
    );
  }
};
