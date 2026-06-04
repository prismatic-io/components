import { RedshiftDataClient } from "@aws-sdk/client-redshift-data";
import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { getClientParams } from "aws-utils";
import { connectionKeys, validateConnection } from "./util";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import type { RedshiftDataApiClientResult } from "./types";







export const createRedshiftClient = async (
  connection: Connection,
  region: string,
  debug: boolean,
): Promise<RedshiftDataClient> => {
  validateConnection(connection);

  try {
    const { region: awsRegion, credentials } = await getClientParams({
      awsConnection: connection,
      awsRegion: region,
      validConnectionKeys: connectionKeys,
      dynamicAccessKeyId: "",
      dynamicSecretAccessKey: "",
      dynamicSessionToken: undefined,
    });

    const client = new RedshiftDataClient({
      region: awsRegion,
      credentials,
    });

    if (debug) {
      client.middlewareStack.add(
        (next, context) => async (args) => {
          console.log("Request:", {
            input: args.input,
            commandName: context.commandName,
          });

          try {
            const result = await next(args);
            console.log("Response:", result.output);
            return result;
          } catch (error) {
            console.error("Error:", error);
            throw error;
          }
        },
        {
          step: "initialize",
          name: "logRequestResponseMiddleware",
        },
      );
    }

    return client;
  } catch (error) {
    throw new ConnectionError(
      connection,
      `Failed to create AWS Redshift Data API client: ${(error as Error).message}`,
    );
  }
};

export const getRedshiftDataApiClient = async (
  connection: Connection,
  region: string,
  debug: boolean,
): Promise<RedshiftDataApiClientResult> => {
  validateConnection(connection);

  const { region: awsRegion, credentials } = await getClientParams({
    awsConnection: connection,
    awsRegion: region,
    validConnectionKeys: connectionKeys,
    dynamicAccessKeyId: "",
    dynamicSecretAccessKey: "",
    dynamicSessionToken: undefined,
  });

  const host = `redshift-data.${awsRegion}.amazonaws.com`;
  const client = createClient({
    baseUrl: `https://${host}`,
    debug,
  });

  return { client, credentials, host };
};
