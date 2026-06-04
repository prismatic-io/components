import { action } from "@prismatic-io/spectral";
import {
  awsRegion,
  tableName,
  attributeDefinition,
  keySchema,
  billingMode,
  readCapacityUnits,
  writeCapacityUnits,
  connectionInput,
} from "../inputs";
import { createDynamoClient } from "../auth";
import {
  type AttributeDefinition,
  type BillingMode,
  CreateTableCommand,
  type KeySchemaElement,
} from "@aws-sdk/client-dynamodb";
import { createTableExamplePayload } from "../examplePayloads";

export const createTable = action({
  display: {
    label: "Create Table",
    description: "Create a new DynamoDB Table",
  },
  perform: async (
    context,
    {
      awsConnection,
      awsRegion,
      tableName,
      attributeDefinition,
      keySchema,
      billingMode,
      readCapacityUnits,
      writeCapacityUnits,
    },
  ) => {
    const client = await createDynamoClient({
      awsConnection,
      region: awsRegion,
      debug: context.debug.enabled,
      logger: context.logger,
    });
    const command = new CreateTableCommand({
      TableName: tableName,
      AttributeDefinitions: attributeDefinition as AttributeDefinition[],
      KeySchema: keySchema as KeySchemaElement[],
      BillingMode: billingMode as BillingMode,
      ProvisionedThroughput: {
        ReadCapacityUnits: readCapacityUnits,
        WriteCapacityUnits: writeCapacityUnits,
      },
    });
    const data = await client.send(command);
    return { data };
  },
  inputs: {
    awsRegion,
    tableName,
    attributeDefinition,
    keySchema,
    billingMode,
    readCapacityUnits,
    writeCapacityUnits,
    awsConnection: connectionInput,
  },
  examplePayload: createTableExamplePayload,
});
