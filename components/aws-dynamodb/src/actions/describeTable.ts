import { action } from "@prismatic-io/spectral";
import { awsRegion, connectionInput, tableName } from "../inputs";
import { createDynamoClient } from "../auth";
import { DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { describeTableExamplePayload } from "../examplePayloads";

export const describeTable = action({
  display: {
    label: "Describe Table",
    description: "Fetch metadata about an existing DynamoDB Table",
  },
  perform: async (context, { awsConnection, awsRegion, tableName }) => {
    const client = await createDynamoClient({
      awsConnection,
      region: awsRegion,
      debug: context.debug.enabled,
      logger: context.logger,
    });
    const command = new DescribeTableCommand({ TableName: tableName });
    const data = await client.send(command);
    return { data };
  },
  inputs: { awsRegion, tableName, awsConnection: connectionInput },
  examplePayload: describeTableExamplePayload,
});
