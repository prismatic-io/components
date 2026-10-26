import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listTablesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { listTablesInputs } from "../../inputs";
import { listTablesOutputSchema } from "../../outputSchemas";
export const listTables = action({
  display: {
    label: "List Tables",
    description:
      "Retrieves a collection of tables created by the Workday REST API. Only tables or datasets permitted by the current user's security profile are returned.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, tenant, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.prismAnalytics}/${tenant}/tables`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => listTablesExamplePayload,
  inputs: listTablesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTablesOutputSchema,
  }),
  examplePayload: listTablesExamplePayload,
});
