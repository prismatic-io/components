import { type ActionContext, action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  ACCEPTED,
  ASYNCHRONOUS_BRANCH,
  SLEEP_TIME_BETWEEN_POLL_REQUESTS,
  SYNCHRONOUS_BRANCH,
} from "../constants";
import { executeSqlSynchronousExamplePayload } from "../examplePayloads";
import { cleanSqlString } from "../helpers";
import {
  accountLocator,
  bindings,
  database,
  nStatementsToExecute,
  parameters,
  role,
  schema,
  shouldPoll,
  snowflakeConnectionInput,
  snowflakeUrl,
  sqlInput,
  timeout,
  warehouse,
} from "../inputs";
import { pollForResults } from "../util";

export const executeSql = action({
  display: {
    label: "Execute SQL",
    description: "Executes one or more SQL statements in your Snowflake DB.",
  },
  perform: async (
    context: ActionContext,
    {
      snowflakeConnectionInput,
      sqlInput,
      snowflakeUrl,
      accountLocator,
      nStatementsToExecute,
      timeout,
      database,
      schema,
      warehouse,
      role,
      bindings,
      parameters,
      shouldPoll,
    },
  ) => {
    const snowflakeClient = getClient(
      snowflakeConnectionInput,
      snowflakeUrl,
      accountLocator,
      context.debug.enabled,
    );

    sqlInput = cleanSqlString(sqlInput);
    const { data, status } = await snowflakeClient.post("/api/v2/statements", {
      statement: sqlInput,
      timeout: timeout || undefined,
      database: database || undefined,
      schema: schema || undefined,
      warehouse: warehouse || undefined,
      role: role || undefined,
      bindings: bindings || undefined,
      parameters: {
        MULTI_STATEMENT_COUNT: nStatementsToExecute || undefined,
        parameters: parameters || undefined,
      },
    });

    if (status === ACCEPTED) {
      
      

      
      
      if (!shouldPoll) {
        return {
          data,
          branch: ASYNCHRONOUS_BRANCH,
        };
      }

      
      
      
      const { statementHandles, statementHandle } = data;
      const handlers = statementHandles || [statementHandle];
      const results = await pollForResults(
        snowflakeClient,
        context.logger,
        handlers,
        SLEEP_TIME_BETWEEN_POLL_REQUESTS,
      );

      return {
        data: results,
        branch: ASYNCHRONOUS_BRANCH,
      };
    }

    return Promise.resolve({ data, branch: SYNCHRONOUS_BRANCH });
  },
  allowsBranching: true,
  staticBranchNames: [ASYNCHRONOUS_BRANCH, SYNCHRONOUS_BRANCH],
  inputs: {
    snowflakeConnectionInput,
    sqlInput,
    snowflakeUrl,
    accountLocator,
    nStatementsToExecute,
    timeout,
    database,
    schema,
    warehouse,
    role,
    bindings,
    parameters,
    shouldPoll,
  },
  examplePayload: executeSqlSynchronousExamplePayload,
});
