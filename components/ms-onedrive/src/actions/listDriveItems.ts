import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, dir, pageLimit, pageToken } from "../inputs";
import { handleErrors } from "../errors";
import { listDriveItemsExamplePayload } from "../examplePayloads";

export const listDriveItems = action({
  display: {
    label: "List Items In Directory",
    description: "Returns a list of all items in the given directory",
  },
  inputs: {
    connection: oneDriveConnection,
    dir,
    pageLimit,
    pageToken,
  },
  perform: async (context, { connection, dir, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    const path =
      dir === "/"
        ? "/me/drive/root/children"
        : `/me/drive/root:${dir}:/children`;
    return {
      data: await handleErrors(
        client.get(path, {
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
  examplePayload: listDriveItemsExamplePayload,
});
