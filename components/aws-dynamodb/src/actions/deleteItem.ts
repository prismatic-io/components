import { action } from "@prismatic-io/spectral";
import {
  awsRegion,
  tableName,
  value,
  rangeKeyValue,
  connectionInput,
  conditionExpression,
  expressionAttributeValueTypes,
  expressionAttributeValues,
} from "../inputs";
import { createDynamoClient } from "../auth";
import { convertDataType, getItemKeySearch } from "../util";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { deleteItemExamplePayload } from "../examplePayloads";

export const deleteItem = action({
  display: {
    label: "Delete Item",
    description: "Delete an item from a DynamoDB database",
  },
  perform: async (
    context,
    {
      awsConnection,
      awsRegion,
      tableName,
      value,
      rangeKeyValue,
      conditionExpression,
      expressionAttributeValues,
      expressionAttributeValueTypes,
    },
  ) => {
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

    const command = new DeleteItemCommand({
      TableName: tableName,
      Key: key,
      ConditionExpression: conditionExpression,
      ExpressionAttributeValues: conditionExpression
        ? convertDataType(expressionAttributeValues, expressionAttributeValueTypes)
        : undefined,
    });
    const result = await client.send(command);
    return {
      data: result,
    };
  },
  inputs: {
    awsRegion,
    tableName,
    value,
    rangeKeyValue,
    conditionExpression,
    expressionAttributeValues: {
      ...expressionAttributeValues,
      required: false,
    },
    expressionAttributeValueTypes: {
      ...expressionAttributeValueTypes,
      required: false,
    },
    awsConnection: connectionInput,
  },
  examplePayload: deleteItemExamplePayload,
});
