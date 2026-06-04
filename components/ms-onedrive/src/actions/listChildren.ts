import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import {
  oneDriveConnection,
  driveId,
  itemId,
  pageLimit,
  pageToken,
} from "../inputs";
import { handleErrors } from "../errors";
import { listChildrenExamplePayload } from "../examplePayloads";

export const listChildren = action({
  display: {
    label: "List Children",
    description: "Returns all child elements on a given drive item",
  },
  inputs: {
    connection: oneDriveConnection,
    driveId,
    itemId,
    pageLimit,
    pageToken,
  },
  perform: async (context, params) => {
    const client = getOneDriveClient(params.connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get(
          `/drives/${params.driveId}/items/${params.itemId}/children`,
          {
            params:
              params.pageLimit || params.pageToken
                ? {
                    $top: util.types.toInt(params.pageLimit) || undefined,
                    $skipToken:
                      util.types.toString(params.pageToken) || undefined,
                  }
                : undefined,
          },
        ),
      ),
    };
  },
  examplePayload: listChildrenExamplePayload,
});
