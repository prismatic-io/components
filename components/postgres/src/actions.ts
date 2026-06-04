import merge from "lodash.merge";
import { createDB } from "./client";
import { action, util } from "@prismatic-io/spectral";
import { queryField, params, paramsObject, connectionInput } from "./inputs";
import { queryExamplePayload } from "./examplePayloads";

export const query = action({
  display: {
    label: "Query",
    description: "Performs a query on a PostgreSQL database.",
  },
  examplePayload: queryExamplePayload,
  perform: async (
    context,
    { queryField, postgresConnection, params, paramsObject },
  ) => {
    const db = createDB({ connection: postgresConnection });
    const query = util.types.toString(queryField);
    let variables: unknown[] | Record<string, unknown> | null = null;

    if (Array.isArray(paramsObject)) {
      if (Object.keys(params).length > 0) {
        throw new Error(
          "Cannot specify both named parameter inputs and supply an array as a reference parameter",
        );
      }
      variables = paramsObject;
    } else {
      variables = merge(params, paramsObject);
    }

    if (context.debug.enabled) {
      context.logger.debug("Query: ", query);
      context.logger.debug("Variables: ", variables);
    }

    try {
      const result = await db.tx(
        async (task) => await task.any(query, variables),
      );
      return { data: result };
    } finally {
      await db.$pool.end();
    }
  },
  inputs: {
    queryField,
    params,
    paramsObject,
    postgresConnection: connectionInput,
  },
});

export default { query };
