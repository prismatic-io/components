import { action } from "@prismatic-io/spectral";
import merge from "lodash.merge";
import { createConnectionPool } from "../../client";
import { queryExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  params,
  paramsObject,
  queryField,
  timeout,
} from "../../inputs";

export const query = action({
  display: {
    label: "Query",
    description: "Execute a SQL query against a Microsoft SQL Server database.",
  },
  examplePayload: queryExamplePayload,
  perform: async (
    _context,
    { queryField, sqlConnection, params, paramsObject, timeout },
  ) => {
    const connectionPool = createConnectionPool(sqlConnection, timeout);

    try {
      const connection = await connectionPool.connect();
      const request = connection.request();

      const queryParams = merge(params, paramsObject);
      Object.entries(queryParams).forEach(([key, value]) => {
        request.input(key, value);
      });

      const result = await request.query(queryField);
      return { data: result };
    } catch (err) {
      throw new Error(`Error connecting to, or querying, database: ${err}`);
    } finally {
      await connectionPool.close();
    }
  },
  inputs: {
    queryField,
    params,
    paramsObject,
    timeout,
    sqlConnection: connectionInput,
  },
});
