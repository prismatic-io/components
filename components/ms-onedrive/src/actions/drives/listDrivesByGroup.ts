import { action, outputSchema } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDrivesByGroupExamplePayload } from "../../examplePayloads";
import { listDrivesByGroupInputs } from "../../inputs";
import { listDrivesByGroupOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const listDrivesByGroup = action({
  display: {
    label: "List Drives By Group",
    description: "Returns a list of all drives available to the given group.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, groupId, fetchAll, ...paging }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listDrivesByGroupExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/groups/${groupId}/drives`,
      fetchAll,
      ...resolvePagination(paging),
    });
  },
  examplePerform: async () => listDrivesByGroupExamplePayload,
  inputs: listDrivesByGroupInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDrivesByGroupOutputSchema,
  }),
  examplePayload: listDrivesByGroupExamplePayload,
});
