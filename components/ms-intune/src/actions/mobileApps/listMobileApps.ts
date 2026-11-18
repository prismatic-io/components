import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listMobileAppsExamplePayload } from "../../examplePayloads";
import { listMobileAppsInputs } from "../../inputs";
import { listMobileAppsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util";

export const listMobileApps = action({
  display: {
    label: "List Mobile Apps",
    description: "Retrieve a list of mobile apps.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMobileAppsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination, filters }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter: filters.$filter,
      $select: filters.$select,
      $expand: filters.$expand,
      $orderBy: filters.$orderBy,
      $top: pagination.$top,
      $skip: pagination.$skip,
      $count: filters.$count,
      $search: filters.$search,
      $format: filters.$format,
      $skipToken: pagination.$skipToken,
    };
    const data = await paginateResults(
      client,
      ENDPOINTS.MOBILE_APPS,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  examplePerform: async () => listMobileAppsExamplePayload,
  inputs: listMobileAppsInputs,
  examplePayload: listMobileAppsExamplePayload,
});
