import { action, outputSchema } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listSitesExamplePayload } from "../../examplePayloads";
import { listSitesInputs } from "../../inputs";
import { listSitesOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const listSites = action({
  display: {
    label: "List Sites",
    description: "Returns a list of all sites available to the current user.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, ...paging }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listSitesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: "/sites",
      fetchAll,
      ...resolvePagination(paging),
    });
  },
  examplePerform: async () => listSitesExamplePayload,
  inputs: listSitesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSitesOutputSchema,
  }),
  examplePayload: listSitesExamplePayload,
});
