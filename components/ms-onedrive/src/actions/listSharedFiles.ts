import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, pageLimit, pageToken } from "../inputs";
import { handleErrors } from "../errors";
import { listSharedFilesExamplePayload } from "../examplePayloads";

export const listSharedFiles = action({
  display: {
    label: "List Files Shared With Me",
    description: "Returns all files shared with your account",
  },
  perform: async (context, { connection, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get("/me/drive/sharedWithMe", {
          params:
            pageLimit || pageToken
              ? {
                  $top: util.types.toInt(pageLimit) || undefined,
                  $skipToken: util.types.toString(pageToken) || undefined,
                }
              : undefined,
        }),
      ),
    };
  },
  inputs: {
    connection: oneDriveConnection,
    pageLimit,
    pageToken,
  },
  examplePayload: listSharedFilesExamplePayload,
});
