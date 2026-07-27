import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listSharedFilesExamplePayload } from "../../examplePayloads";
import { listSharedFilesInputs } from "../../inputs";
export const listSharedFiles = action({
  display: {
    label: "List Files Shared With Me (Deprecation Notice)",
    description:
      'Returns all files shared with your account. Deprecated: the underlying Microsoft Graph endpoint is degraded and scheduled for removal around November 2026, and may return incomplete results. Use the "List Shared" action instead.',
  },
  perform: async (context, { connection, fetchAll, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listSharedFilesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: "/me/drive/sharedWithMe",
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: listSharedFilesInputs,
  examplePayload: listSharedFilesExamplePayload,
});
