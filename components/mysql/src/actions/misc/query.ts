import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { queryExamplePayload } from "../../examplePayloads";
import { queryInputs } from "../../inputs";

export const query = action({
  display: {
    label: "Query Database",
    description:
      "Executes a query against a MySQL database and returns the results.",
  },
  perform: async (
    context,
    { queryField, params, referenceParams, mySQLConnection },
  ) => {
    const client = await createClient(mySQLConnection, context.debug.enabled);
    let queryParams: unknown[] = [];
    if (params.length > 0 && referenceParams) {
      throw new Error(
        "Use either parameters or reference parameters, not both.",
      );
    } else if (params.length) {
      queryParams = params;
    } else {
      queryParams = referenceParams;
    }
    try {
      const [results] = await client.query(queryField, queryParams);
      return { data: results as Record<string, unknown>[] };
    } finally {
      await client.end();
    }
  },
  inputs: queryInputs,
  examplePayload: queryExamplePayload,
});
