import { action } from "@prismatic-io/spectral";
import { createDataBricksClient } from "../client";
import { runSqlExamplePayload } from "../examplePayloads";
import {
  connectionInput,
  sqlParametersInput,
  sqlStatementInput,
  warehouseIdInput,
} from "../inputs";

const runSql = action({
  display: {
    label: "Execute SQL Statement",
    description:
      "Run a SQL query in the Databricks workspace. You can choose to wait for the result or asynchronously issue the request and return the statement ID.",
  },
  inputs: {
    connection: connectionInput,
    warehouseId: warehouseIdInput,
    sqlStatement: sqlStatementInput,
    sqlParameters: sqlParametersInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    const response = await client.post("sql/statements", {
      statement: params.sqlStatement,
      warehouse_id: params.warehouseId,
      parameters: params.sqlParameters,
      wait_timeout: "0s", 
    });

    do {
      const statusResponse = await client.get(
        `sql/statements/${response.data.statement_id}`,
      );

      const error = JSON.stringify(statusResponse.data?.status?.error);

      switch (statusResponse.data.status.state) {
        case "SUCCEEDED":
          return { data: statusResponse.data };
        case "PENDING":
        case "RUNNING":
          
          await new Promise((resolve) => setTimeout(resolve, 1000));
          break;
        default:
          throw new Error(
            `SQL statement failed with status: ${statusResponse.data.status.state}.${error ? ` Error: ${error}` : ""}`,
          );
      }
      // biome-ignore lint/correctness/noConstantCondition: Intentional polling loop with break conditions
    } while (true);
  },
  examplePayload: runSqlExamplePayload,
});

export default { runSql };
