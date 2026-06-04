import { action } from "@prismatic-io/spectral";
import { createConnectionPool } from "../../client";
import { executeExamplePayload } from "../../examplePayloads";
import { connectionInput, storedProcedure, timeout } from "../../inputs";

export const execute = action({
  display: {
    label: "Execute Stored Procedure",
    description:
      "Execute a stored procedure on a Microsoft SQL Server database.",
  },
  examplePayload: executeExamplePayload,
  perform: async (_context, { storedProcedure, sqlConnection, timeout }) => {
    const connectionPool = createConnectionPool(sqlConnection, timeout);

    try {
      const connection = await connectionPool.connect();
      const request = connection.request();

      const result = await request.execute(storedProcedure);
      return { data: result };
    } catch (err) {
      throw new Error(`Error connecting to, or querying, database: ${err}`);
    } finally {
      await connectionPool.close();
    }
  },
  inputs: {
    storedProcedure,
    timeout,
    sqlConnection: connectionInput,
  },
});
