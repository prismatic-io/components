import { action } from "@prismatic-io/spectral";
import { awsRegion, value, tableName, connectionInput, rangeKeyValue } from "../inputs";
import { createDynamoClient } from "../auth";
import { getItemKeySearch } from "../util";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { getItemExamplePayload } from "../examplePayloads";

export const getItem = action({
  display: {
    label: "Get Item",
    description: "Retrieve an item from a DynamoDB database",
  },
  perform: async (context, { awsConnection, awsRegion, tableName, value, rangeKeyValue }) => {
    const client = await createDynamoClient({
      awsConnection,
      region: awsRegion,
      debug: context.debug.enabled,
      logger: context.logger,
    });

    const key = await getItemKeySearch({
      client,
      tableName,
      hashKeyValue: value,
      rangeKeyValue: rangeKeyValue,
    });

    const command = new GetItemCommand({
      TableName: tableName,
      Key: key,
    });

    const result = await client.send(command);
    const found = result?.Item != null;

    return {
      data: { result, found },
    };
  },
  inputs: {
    awsRegion,
    tableName,
    value,
    rangeKeyValue,
    awsConnection: connectionInput,
  },
  examplePayload: getItemExamplePayload,
});
