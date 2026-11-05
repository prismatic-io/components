import {
  ListStatementsCommand,
  type StatementData,
  type ResultFormatString,
  type SqlParameter,
} from "@aws-sdk/client-redshift-data";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { assumeRoleConnection, paginateAwsResults } from "aws-utils";
import { accessKeySecretPair } from "../connections";
import type { GetAllStatementsParams } from "../types";

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalResultFormatString = (value: unknown) =>
  value ? (util.types.toString(value) as ResultFormatString) : undefined;

export const cleanSqlParameters = (sqlParameters: unknown) =>
  Array.isArray(sqlParameters) && sqlParameters.length > 0
    ? (sqlParameters.map(({ name, value }) => ({
        name,
        value,
      })) as SqlParameter[])
    : undefined;

export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const connectionKeys = [accessKeySecretPair.key, assumeRoleConnection.key];

export const validateConnection = (connection: Connection) => {
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}. Supported methods: ${connectionKeys.join(", ")}`,
    );
  }
};

export const getAllStatements = async ({
  client,
  databaseName,
  workgroupName,
  clusterIdentifier,
  status,
  statementName,
}: GetAllStatementsParams) => {
  const { allItems, lastResponse } = await paginateAwsResults({
    client,
    createCommand: (token) =>
      new ListStatementsCommand({
        Database: databaseName,
        WorkgroupName: workgroupName,
        ClusterIdentifier: clusterIdentifier,
        Status: status,
        StatementName: statementName,
        MaxResults: 100,
        NextToken: token,
      }),
    itemsKey: "Statements",
  });

  return {
    allStatements: allItems as StatementData[],
    lastResponse,
  };
};
