import { action, outputSchema } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listSharedFilesExamplePayload } from "../../examplePayloads";
import { listSharedFilesInputs } from "../../inputs";
import { listSharedFilesOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const listSharedFiles = action({
  display: {
    label: "List Files Shared With Me (Deprecation Notice)",
    description:
      'Returns all files shared with the current account. Deprecated: the underlying Microsoft Graph endpoint is degraded and scheduled for removal around November 2026, and may return incomplete results. Use the "List Shared" action instead.',
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, ...paging }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listSharedFilesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: "/me/drive/sharedWithMe",
      fetchAll,
      ...resolvePagination(paging),
    });
  },
  examplePerform: async () => listSharedFilesExamplePayload,
  inputs: listSharedFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSharedFilesOutputSchema,
  }),
  examplePayload: listSharedFilesExamplePayload,
});
