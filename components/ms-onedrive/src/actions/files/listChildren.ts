import { action, outputSchema } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listChildrenExamplePayload } from "../../examplePayloads";
import { listChildrenInputs } from "../../inputs";
import { listChildrenOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const listChildren = action({
  display: {
    label: "List Children",
    description: "Returns all child elements on a given drive item.",
  },
  inputs: listChildrenInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, driveId, itemId, fetchAll, ...paging },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listChildrenExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/drives/${driveId}/items/${itemId}/children`,
      fetchAll,
      ...resolvePagination(paging),
    });
  },
  examplePerform: async () => listChildrenExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChildrenOutputSchema,
  }),
  examplePayload: listChildrenExamplePayload,
});
