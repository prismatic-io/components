import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listChildrenExamplePayload } from "../../examplePayloads";
import { listChildrenInputs } from "../../inputs";
export const listChildren = action({
  display: {
    label: "List Children",
    description: "Returns all child elements on a given drive item",
  },
  inputs: listChildrenInputs,
  perform: async (
    context,
    { connection, driveId, itemId, fetchAll, pageLimit, pageToken },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listChildrenExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/drives/${driveId}/items/${itemId}/children`,
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  examplePayload: listChildrenExamplePayload,
});
