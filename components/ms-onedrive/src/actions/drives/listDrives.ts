import { action, outputSchema } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDrivesExamplePayload } from "../../examplePayloads";
import { listDrivesInputs } from "../../inputs";
import { listDrivesOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const listDrives = action({
  display: {
    label: "List My Drives",
    description: "Returns a list of all drives available to the current user.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, ...paging }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listDrivesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: "/me/drives",
      fetchAll,
      ...resolvePagination(paging),
    });
  },
  examplePerform: async () => listDrivesExamplePayload,
  inputs: listDrivesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDrivesOutputSchema,
  }),
  examplePayload: listDrivesExamplePayload,
});
