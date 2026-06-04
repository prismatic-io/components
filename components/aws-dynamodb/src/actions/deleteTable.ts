import { action } from "@prismatic-io/spectral";
import { awsRegion, connectionInput, tableName } from "../inputs";
import { createDynamoClient } from "../auth";
import { DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import { deleteTableExamplePayload } from "../examplePayloads";

export const deleteTable = action({
  display: {
    label: "Delete Table",
    description: "Delete an existing DynamoDB Table",
  },
  perform: async (context, { awsConnection, awsRegion, tableName }) => {
    const client = await createDynamoClient({
      awsConnection,
      region: awsRegion,
      debug: context.debug.enabled,
      logger: context.logger,
    });
    const command = new DeleteTableCommand({ TableName: tableName });
    const data = await client.send(command);
    return { data };
  },
  inputs: { awsRegion, tableName, awsConnection: connectionInput },
  examplePayload: deleteTableExamplePayload,
});
