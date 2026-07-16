import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listDataChangesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { listDataChangesInputs } from "../../inputs";
export const listDataChanges = action({
  display: {
    label: "List Data Changes",
    description:
      "Returns the collection of data changes accessible to the authenticated user. Supports offset and limit query parameters. Response type is determined by the 'type' query parameter. The default response includes id, name, and displayName.",
  },
  perform: async (
    context,
    { connection, tenant, params, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.prismAnalytics}/${tenant}/dataChanges`,
      params,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  inputs: listDataChangesInputs,
  examplePayload: listDataChangesExamplePayload,
});
