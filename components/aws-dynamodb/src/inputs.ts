import { util, input } from "@prismatic-io/spectral";
import { toOptionalString } from "aws-utils";
import { cleanKeyValueListInput, cleanObject } from "./util";

const valueTypes = {
  S: "String",
  N: "Number",
  B: "Buffer",
  L: "List/Array",
  M: "Map/Object",
  SS: "String Set",
  NS: "Number Set",
  BS: "Buffer Set",
  BOOL: "Boolean",
};

export { awsRegion } from "aws-utils";

export const item = input({
  label: "Value",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  placeholder: "Enter key-value pairs",
  comments:
    "Key-value pairs representing the item to insert into the table. Each key corresponds to an attribute name.",
  example: "customerId",
});

export const itemTypes = input({
  label: "Value Types",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  model: Object.entries(valueTypes).map(([value, label]) => ({ label, value })),
  example: "N",
  placeholder: "Select data types for each value",
  comments:
    "The DynamoDB data type for each item attribute. Must specify a type for each key in the Value field. See [DynamoDB data types](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes).",
});

export const dataType = input({
  label: "Value Type",
  type: "string",
  required: true,
  example: "N",
  placeholder: "Select data type",
  model: Object.entries(valueTypes).map(([value, label]) => ({ label, value })),
  comments:
    "The DynamoDB data type for the hash key attribute. See [DynamoDB data types](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes).",
});

export const expressionAttributeValues = input({
  label: "Expression Attribute Values",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  placeholder: "Enter attribute values (e.g., :price)",
  example: ":limit",
  comments:
    "Expression attribute values are substitutes for actual values in expressions. Each key must begin with a colon (:) followed by alphanumeric characters. Learn more about [expression attribute values](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeValues.html).",
});

export const expressionAttributeValueTypes = input({
  label: "Expression Attribute Value Types",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  model: Object.entries(valueTypes).map(([value, label]) => ({ label, value })),
  placeholder: "Select data types for each attribute value",
  comments:
    "The DynamoDB data type for each expression attribute value. Must specify a type for each value provided in Expression Attribute Values.",
});

export const query = input({
  label: "Update Expression",
  type: "string",
  required: true,
  example: "set Title = :t, Subtitle = :s",
  placeholder: "Enter update expression",
  comments:
    "An update expression specifying how to modify item attributes. Learn more about [update expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html).",
  clean: util.types.toString,
});

export const value = input({
  label: "Hash / Primary Key Value",
  type: "string",
  required: true,
  example: "cust_1234",
  placeholder: "Enter primary key value",
  comments: "The value of the hash key (primary key) to match.",
  clean: util.types.toString,
});

export const rangeKeyValue = input({
  label: "Range / Sort Key Value",
  type: "string",
  required: false,
  example: "Acme Inc",
  placeholder: "Enter sort key value",
  comments:
    "The value of the optional range key (sort key) to match. <strong>Required</strong> if your table has a range key.",
  clean: toOptionalString,
});

export const tableName = input({
  label: "Table Name",
  type: "string",
  required: true,
  example: "Customers",
  placeholder: "Enter table name",
  comments: "The name of the DynamoDB table to interact with.",
  dataSource: "selectTable",
  clean: util.types.toString,
});

export const attributeDefinition = input({
  label: "Attribute Definition",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      {
        AttributeName: "customerId",
        AttributeType: "N",
      },
      {
        AttributeName: "customerName",
        AttributeType: "S",
      },
    ],
    null,
    2,
  ),
  comments:
    "Array of attribute definitions. Each object must contain an AttributeName and AttributeType. See [DynamoDB data types](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes).",
  clean: cleanObject,
});

export const keySchema = input({
  label: "Key Schema",
  type: "code",
  required: true,
  language: "json",
  default: JSON.stringify(
    [
      {
        KeyType: "HASH",
        AttributeName: "customerId",
      },
      {
        KeyType: "RANGE",
        AttributeName: "customerName",
      },
    ],
    null,
    2,
  ),
  comments:
    "Array of key schema elements. Each object must contain a KeyType (HASH or RANGE) and an AttributeName. Learn more about [key schemas](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey).",
  clean: cleanObject,
});

export const billingMode = input({
  label: "Billing Mode",
  type: "string",
  required: true,
  default: "PROVISIONED",
  model: [
    { label: "Provisioned", value: "PROVISIONED" },
    { label: "Pay Per Request", value: "PAY_PER_REQUEST" },
  ],
  placeholder: "Select billing mode",
  comments:
    "The billing mode for the table. Learn more about [billing modes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html).",
});

export const readCapacityUnits = input({
  label: "Read Capacity Units",
  type: "string",
  required: true,
  example: "6000",
  default: "5",
  placeholder: "Enter read capacity units",
  comments:
    "The number of read capacity units. One unit = one strongly consistent read/sec or two eventually consistent reads/sec for items up to 4 KB. Learn more about [read capacity](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ProvisionedThroughput.html).",
  clean: (val) => util.types.toInt(val, 5),
});

export const writeCapacityUnits = input({
  label: "Write Capacity Units",
  type: "string",
  required: true,
  example: "6000",
  default: "5",
  placeholder: "Enter write capacity units",
  comments:
    "The number of write capacity units. One unit = one write/sec for items up to 1 KB. Larger items consume additional units. Learn more about [write capacity](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ProvisionedThroughput.html).",
  clean: (val) => util.types.toInt(val, 5),
});

export const conditionExpression = input({
  label: "Condition Expression",
  type: "string",
  required: false,
  example: "Price > :limit",
  placeholder: "Enter condition expression",
  comments:
    "A condition that must be satisfied for the operation to succeed. Learn more about [condition expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html).",
  clean: toOptionalString,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The AWS DynamoDB connection to use.",
});

export const parameters = input({
  label: "Parameters",
  type: "code",
  required: false,
  language: "json",
  default: JSON.stringify(["Rose"], null, 2),
  comments:
    "Array of parameter values for the PartiQL statement. Parameters are referenced using ? placeholders in the statement. Learn more about [PartiQL parameters](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html).",
  clean: cleanObject,
});

export const statement = input({
  label: "Statement",
  type: "string",
  required: true,
  example: "INSERT INTO Flowers value {'Name':?}",
  placeholder: "Enter PartiQL statement",
  comments:
    "The PartiQL statement to execute. Use ? for parameters. Learn more about [PartiQL for DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html).",
  clean: toOptionalString,
});

export const queryParameters = input({
  label: "Query Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  placeholder: "Enter additional query parameters",
  comments:
    "Additional parameters to pass to the query operation. These are merged with the command input.",
  clean: cleanKeyValueListInput,
});

export const keyConditionExpression = input({
  label: "Key Condition Expression",
  type: "string",
  required: false,
  example: "Season = :s and Episode > :e",
  placeholder: "Enter key condition expression",
  comments:
    "The condition specifying key values for the query. Must specify the partition key and optionally a sort key condition. Learn more about [key condition expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.KeyConditionExpressions).",
  clean: toOptionalString,
});

export const filterExpression = input({
  label: "Filter Expression",
  type: "string",
  required: false,
  example: "contains (Subtitle, :topic)",
  placeholder: "Enter filter expression",
  comments:
    "A condition to filter query results after they're retrieved. Cannot filter on partition or sort keys. Learn more about [filter expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.FilterExpression).",
  clean: toOptionalString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetch all pages of results using pagination. When false, return only the first page.",
  clean: util.types.toBool,
});
