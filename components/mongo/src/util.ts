import {
  type ActionLogger,
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral";
import { type Document, MongoClient, ObjectId } from "mongodb";
import { MongoClient as MongoClientv4 } from "mongodb4";
import type { ComparisonQueryFilter } from "./interfaces/ComparisonQueryFilter";
import { mongoConnection } from "./connections";

export const toDocument = (value: unknown): Document => {
  if (typeof value === "string" && util.types.isJSON(value)) {
    return JSON.parse(value);
  }

  return value as Document;
};

export const toMongoDBObjectId = (value: unknown): ObjectId => {
  const regex = /ObjectId\('?([a-z0-9]*)'?\)/;
  if (typeof value === "string" && regex.test(value)) {
    
    return new ObjectId(regex.exec(value)?.[1]);
  }
  return new ObjectId(util.types.toString(value));
};

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const getComparisonQueryFilter = (
  operator: string,
  keyValuePair: Record<string, unknown>,
): ComparisonQueryFilter => {
  const queryFilter: ComparisonQueryFilter = {
    $and: [],
  };
  for (const key in keyValuePair) {
    queryFilter.$and.push({ [key]: { [operator]: keyValuePair[key] } });
  }

  return queryFilter;
};

export const detectAndConvertValuesToNumbers = (
  keyValuePair: Record<string, unknown>,
): void => {
  for (const key in keyValuePair) {
    const value = keyValuePair[key];
    if (typeof value === "string" && !isNaN(Number(value))) {
      keyValuePair[key] = Number(value);
    }
  }
};

export const validateConnection = (connection: Connection): void => {
  if (connection.key !== mongoConnection.key) {
    throw new ConnectionError(connection, "Unexpected connection provided");
  }
};

const throwCodeInputError = (inputLabel: string): void => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanCodeInput = (
  value: unknown,
  inputLabel: string,
): object | undefined => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};

export const clientConnect = async (
  connection: Connection,
  debug: boolean,
  logger: ActionLogger,
): Promise<MongoClient | MongoClientv4> => {
  validateConnection(connection);

  const connectionString = util.types.toString(
    connection.fields.connectionString,
  );

  const useV4 = util.types.toBool(connection.fields.useV4);

  const client = useV4
    ? new MongoClientv4(connectionString, {
        monitorCommands: debug,
      })
    : new MongoClient(connectionString, {
        monitorCommands: debug,
      });

  if (debug) {
    client.on("commandStarted", (event) => logger.debug(JSON.stringify(event)));
    client.on("commandSucceeded", (event) =>
      logger.debug(JSON.stringify(event)),
    );
    client.on("commandFailed", (event) => logger.debug(JSON.stringify(event)));
  }

  await client.connect();
  return client;
};
