import { action, outputSchema } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDrivesBySiteExamplePayload } from "../../examplePayloads";
import { listDrivesBySiteInputs } from "../../inputs";
import { listDrivesBySiteOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const listDrivesBySite = action({
  display: {
    label: "List Drives By Site",
    description: "Returns a list of all drives available to the given site.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, siteId, fetchAll, ...paging }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listDrivesBySiteExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/sites/${siteId}/drives`,
      fetchAll,
      ...resolvePagination(paging),
    });
  },
  examplePerform: async () => listDrivesBySiteExamplePayload,
  inputs: listDrivesBySiteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDrivesBySiteOutputSchema,
  }),
  examplePayload: listDrivesBySiteExamplePayload,
});
