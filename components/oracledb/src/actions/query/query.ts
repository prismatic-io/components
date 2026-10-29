import { action } from "@prismatic-io/spectral";
import merge from "lodash.merge";
import { createOracleDbClient } from "../../client";
import { queryExamplePayload } from "../../examplePayloads";
import { queryInputs } from "../../inputs";

export const query = action({
  display: {
    label: "Query",
    description: "Returns the results of an OracleDB database query.",
  },
  inputs: queryInputs,
  perform: async (context, params) => {
    if (context.debug.enabled) {
      context.logger.debug(
        JSON.stringify({
          namedParameters: params.namedParameters,
          namedParametersObject: params.namedParametersObject,
          query: params.query,
        }),
      );
    }

    const client = await createOracleDbClient(params.connection);

    try {
      const namedParameters = merge(
        params.namedParameters,
        params.namedParametersObject,
      ) as Record<string, string>;
      const result = await client.execute(params.query, namedParameters);
      await client.commit();
      return { data: result.rows };
    } finally {
      await client.close();
    }
  },
  examplePayload: queryExamplePayload,
});
