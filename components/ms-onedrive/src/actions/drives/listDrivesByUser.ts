import { action, outputSchema } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDrivesByUserExamplePayload } from "../../examplePayloads";
import { listDrivesByUserInputs } from "../../inputs";
import { listDrivesByUserOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const listDrivesByUser = action({
  display: {
    label: "List Drives By User",
    description: "Returns a list of all drives available to the given user.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, userId, fetchAll, ...paging }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listDrivesByUserExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/users/${userId}/drives`,
      fetchAll,
      ...resolvePagination(paging),
    });
  },
  examplePerform: async () => listDrivesByUserExamplePayload,
  inputs: listDrivesByUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDrivesByUserOutputSchema,
  }),
  examplePayload: listDrivesByUserExamplePayload,
});
