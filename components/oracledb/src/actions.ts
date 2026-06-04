import merge from "lodash.merge";
import { action, input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { createOracleDbClient } from "./client";
import { queryExamplePayload } from "./examplePayloads";

const query = action({
  display: {
    label: "Query",
    description: "Returns the results of an OracleDB database query",
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    query: input({
      label: "SQL Query",
      type: "code",
      language: "sql",
      required: true,
      default:
        "SELECT * FROM mytable WHERE name = :name AND company = :company_id",
      clean: util.types.toString,
    }),
    namedParameters: input({
      label: "Named Parameters",
      comments:
        "Optional named parameters to insert into a query. Ensure the keys of these parameters match parameters in your query. For example, if your query contains ':company_name', give this parameter the key 'company_name'. Values specified here are merged with values supplied from the 'Named Parameters Object' input.",
      type: "string",
      required: false,
      collection: "keyvaluelist",
      clean: (value: unknown) =>
        value
          ? util.types.keyValPairListToObject(value as KeyValuePair<unknown>[])
          : {},
    }),
    namedParametersObject: input({
      label: "Named Parameters Object",
      comments:
        "Optional named parameters to insert into a query. Ensure the keys of these parameters match parameters in your query. For example, if your query contains ':company_name', your object should contain a key 'company_name'. Values in this object are merged with values supplied from the 'Named Parameters' input.",
      type: "code",
      language: "json",
      required: false,
      example: JSON.stringify({ product_id: 123, customer_name: "Acme Corp" }),
      clean: (value) => (value ? util.types.toObject(value) : {}),
    }),
  },
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

export default { query };
