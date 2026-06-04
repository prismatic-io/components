import {
  type AttributeValue,
  DescribeTableCommand,
  type DynamoDBClient,
  paginateListTables,
} from "@aws-sdk/client-dynamodb";
import { util, type KeyValuePair } from "@prismatic-io/spectral";
import type { DynamoDBValue } from "./interfaces/Types";
// biome-ignore lint/suspicious/useIsArray: for backwards compatibility
const toSet = (input: unknown) => (input instanceof Array ? input : []);

const S = (input: unknown) => util.types.toString(input);
const B = (input: unknown) => Buffer.from(util.types.toString(input));

export const coerceValue = (
  key: string,
  value: unknown,
  type: string | undefined,
): AttributeValue => {
  switch (type) {
    case "S":
      return { S: S(value) };
    case "N":
      return { N: S(value) };
    case "BOOL":
      return { BOOL: util.types.toBool(value) };
    case "B":
      return { B: B(value) };
    case "SS":
      return { SS: toSet(value).map(S) };
    case "NS":
      return { NS: toSet(value).map(S) };
    case "BS":
      return { BS: toSet(value).map(B) };
    case "L":
      return { L: value as AttributeValue[] };
    case "M":
      return { M: value as Record<string, AttributeValue> };
    default:
      throw new Error(`You must specify a value type for key "${key}"`);
  }
};

export const convertDataType = (
  items: KeyValuePair<unknown>[],
  itemTypes: KeyValuePair<unknown>[],
) => {
  if (items.length !== itemTypes.length) {
    throw new Error("The number of items and item types must be the same. Check your inputs.");
  }
  if (items.length === 0) {
    return undefined;
  }
  const itemTypesMap = util.types.keyValPairListToObject(itemTypes);
  const itemsResult: Record<string, AttributeValue> = {};
  for (const item of items) {
    itemsResult[item.key] = coerceValue(
      item.key,
      item.value,
      util.types.toString(itemTypesMap[item.key]),
    );
  }
  return itemsResult;
};


interface GetItemKeySearchParams {
  client: DynamoDBClient;
  tableName: string;
  hashKeyValue: unknown;
  rangeKeyValue?: unknown;
}

export const getItemKeySearch = async ({
  client,
  tableName,
  hashKeyValue,
  rangeKeyValue,
}: GetItemKeySearchParams): Promise<Record<string, AttributeValue>> => {
  const keys: Record<string, AttributeValue> = {};

  
  const describeCommand = new DescribeTableCommand({ TableName: tableName });
  const { Table } = await client.send(describeCommand);

  const hashKey = util.types.toString(
    Table?.KeySchema?.filter((key) => key.KeyType === "HASH")[0].AttributeName,
  );
  const hashKeyType = util.types.toString(
    Table?.AttributeDefinitions?.filter((attribute) => attribute.AttributeName === hashKey)[0]
      .AttributeType,
  );

  keys[hashKey] = coerceValue(hashKey, hashKeyValue, hashKeyType);

  const rangeKey = util.types.toString(
    Table?.KeySchema?.filter((key) => key.KeyType === "RANGE")?.[0]?.AttributeName,
  );

  if (rangeKey && !rangeKeyValue) {
    throw new Error("Your table has a range key, but you did not provide a range key value");
  }

  if (!rangeKey && rangeKeyValue) {
    throw new Error("Your table does not have a range key, but you provided one");
  }

  if (rangeKey) {
    const rangeKeyType = util.types.toString(
      Table?.AttributeDefinitions?.filter((attribute) => attribute.AttributeName === rangeKey)[0]
        .AttributeType,
    );
    keys[rangeKey] = coerceValue(rangeKey, rangeKeyValue, rangeKeyType);
  }

  return keys;
};

export const cleanObject = (value: unknown) => (value ? util.types.toObject(value) : undefined);

export const cleanKeyValueListInput = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[], util.types.toObject)
    : undefined;

// biome-ignore lint/style/useConst: previously disabled for eslint
let transformDynamoDBValue: (value: DynamoDBValue) => unknown;
// biome-ignore lint/style/useConst: previously disabled for eslint
let transformDynamoDBObject: (item: Record<string, DynamoDBValue>) => Record<string, unknown>;

transformDynamoDBObject = (item: Record<string, DynamoDBValue>): Record<string, unknown> => {
  return Object.entries(item).reduce<Record<string, unknown>>((acc, [key, value]) => {
    acc[key] = transformDynamoDBValue(value);
    return acc;
  }, {});
};

transformDynamoDBValue = (value: DynamoDBValue): unknown => {
  if ("S" in value) {
    return value.S;
  }
  if ("N" in value) {
    return Number(value.N);
  }
  if ("BOOL" in value) {
    return value.BOOL;
  }
  if ("M" in value) {
    return transformDynamoDBObject(value.M);
  }
  if ("L" in value) {
    return value.L.map(transformDynamoDBValue);
  }
  return null;
};

export { transformDynamoDBObject };
