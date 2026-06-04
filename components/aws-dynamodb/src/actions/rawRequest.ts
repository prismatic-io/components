import { action } from "@prismatic-io/spectral";
import type { AttributeValue } from "@aws-sdk/client-dynamodb";
import {
  ExecuteStatementCommand,
  type ExecuteStatementCommandInput,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { awsRegion, connectionInput, parameters, queryParameters, statement } from "../inputs";
import { createDynamoClient } from "../auth";
import { rawRequestExamplePayload } from "../examplePayloads";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Execute single PartiQL statements.",
  },
  inputs: {
    awsRegion,
    statement,
    parameters,
    queryParameters,
    awsConnection: connectionInput,
  },
  perform: async (
    context,
    { awsConnection, awsRegion, parameters, statement, queryParameters },
  ) => {
    const client = await createDynamoClient({
      awsConnection,
      region: awsRegion,
      debug: context.debug.enabled,
      logger: context.logger,
    });
    const docClient = DynamoDBDocumentClient.from(client);
    const statementCommand: ExecuteStatementCommandInput = {
      Statement: statement,
      Parameters: parameters as AttributeValue[],
      ...queryParameters,
    };

    const command = new ExecuteStatementCommand(statementCommand);
    const response = await docClient.send(command);

    return {
      data: response,
    };
  },
  examplePayload: rawRequestExamplePayload,
});
