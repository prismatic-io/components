import { action } from "@prismatic-io/spectral";
import {
  awsRegion,
  tableName,
  connectionInput,
  expressionAttributeValues,
  keyConditionExpression,
  filterExpression,
  expressionAttributeValueTypes,
  queryParameters,
} from "../inputs";
import { createDynamoClient } from "../auth";
import { convertDataType, transformDynamoDBObject } from "../util";
import type { DynamoDBValue } from "../interfaces/Types";
import { QueryCommand, type QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { queryItemsExamplePayload } from "../examplePayloads";

export const queryItems = action({
  display: {
    label: "Query Items",
    description: "Query a DynamoDB table",
  },
  inputs: {
    awsRegion,
    tableName,
    expressionAttributeValues: {
      ...expressionAttributeValues,
      required: false,
    },
    expressionAttributeValueTypes: {
      ...expressionAttributeValueTypes,
      required: false,
    },
    keyConditionExpression,
    filterExpression,
    queryParameters,
    awsConnection: connectionInput,
  },
  perform: async (
    context,
    {
      awsConnection,
      awsRegion,
      expressionAttributeValues,
      expressionAttributeValueTypes,
      filterExpression,
      keyConditionExpression,
      queryParameters,
      tableName,
    },
  ) => {
    const client = await createDynamoClient({
      awsConnection: awsConnection,
      region: awsRegion,
      debug: context.debug.enabled,
      logger: context.logger,
    });
    const commandInput: QueryCommandInput = {
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues:
        expressionAttributeValues && expressionAttributeValueTypes
          ? convertDataType(expressionAttributeValues, expressionAttributeValueTypes)
          : undefined,
      FilterExpression: filterExpression,
      ...queryParameters,
    };
    const command = new QueryCommand(commandInput);
    const result = await client.send(command);
    const transformedData = result.Items?.map((item) =>
      transformDynamoDBObject(item as unknown as Record<string, DynamoDBValue>),
    );

    return {
      data: {
        ...result,
        Items: transformedData,
      },
    };
  },
  examplePayload: queryItemsExamplePayload,
});
