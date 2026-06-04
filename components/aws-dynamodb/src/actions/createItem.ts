import { action } from "@prismatic-io/spectral";
import {
  awsRegion,
  item,
  tableName,
  itemTypes,
  conditionExpression,
  connectionInput,
  expressionAttributeValues,
  expressionAttributeValueTypes,
} from "../inputs";
import { createDynamoClient } from "../auth";
import { convertDataType } from "../util";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { createItemExamplePayload } from "../examplePayloads";

export const createItem = action({
  display: {
    label: "Upsert Item",
    description: "Creates a new item, or replaces an existing item with a new item",
  },
  perform: async (
    context,
    {
      awsConnection,
      awsRegion,
      item,
      itemTypes,
      conditionExpression,
      expressionAttributeValues,
      expressionAttributeValueTypes,
      tableName,
    },
  ) => {
    const client = await createDynamoClient({
      awsConnection,
      region: awsRegion,
      debug: context.debug.enabled,
      logger: context.logger,
    });
    const command = new PutItemCommand({
      TableName: tableName,
      Item: convertDataType(item, itemTypes),
      ConditionExpression: conditionExpression,
      ExpressionAttributeValues: conditionExpression
        ? convertDataType(expressionAttributeValues, expressionAttributeValueTypes)
        : undefined,
    });
    const data = await client.send(command);
    return { data };
  },
  inputs: {
    awsRegion,
    tableName,
    item,
    itemTypes,
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
  examplePayload: createItemExamplePayload,
});
