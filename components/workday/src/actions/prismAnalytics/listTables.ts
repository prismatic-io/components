import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listTablesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { listTablesInputs } from "../../inputs";
export const listTables = action({
  display: {
    label: "List Tables",
    description:
      "Retrieves a collection of tables created by the Workday REST API. Only tables or datasets permitted by the current user's security profile are returned.",
  },
  perform: async (
    context,
    { connection, tenant, params, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.prismAnalytics}/${tenant}/tables`,
      params,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  inputs: listTablesInputs,
  examplePayload: listTablesExamplePayload,
});
