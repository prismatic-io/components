import { action } from "@prismatic-io/spectral";
import {
  awsRegion,
  query,
  tableName,
  connectionInput,
  expressionAttributeValues as queryParams, 
  expressionAttributeValueTypes as queryParamTypes,
  rangeKeyValue,
  value,
  conditionExpression,
} from "../inputs";
import { createDynamoClient } from "../auth";
import { convertDataType, getItemKeySearch } from "../util";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { updateItemExamplePayload } from "../examplePayloads";

export const updateItem = action({
  display: {
    label: "Update Item",
    description: "Update an existing item in a DynamoDB database",
  },
  perform: async (
    context,
    {
      awsConnection,
      awsRegion,
      tableName,
      value,
      rangeKeyValue,
      query,
      conditionExpression,
      queryParams,
      queryParamTypes,
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

    const command = new UpdateItemCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: query,
      ConditionExpression: conditionExpression,
      ExpressionAttributeValues: convertDataType(queryParams, queryParamTypes),
    });
    const data = await client.send(command);
    return { data };
  },
  inputs: {
    awsRegion,
    tableName,
    value,
    rangeKeyValue,
    query,
    conditionExpression,
    queryParams,
    queryParamTypes,
    awsConnection: connectionInput,
  },
  examplePayload: updateItemExamplePayload,
});
