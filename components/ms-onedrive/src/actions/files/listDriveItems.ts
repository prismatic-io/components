import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDriveItemsExamplePayload } from "../../examplePayloads";
import { listDriveItemsInputs } from "../../inputs";
export const listDriveItems = action({
  display: {
    label: "List Items In Directory",
    description: "Returns a list of all items in the given directory",
  },
  inputs: listDriveItemsInputs,
  perform: async (
    context,
    { connection, dir, fetchAll, pageLimit, pageToken },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    const path =
      dir === "/"
        ? "/me/drive/root/children"
        : `/me/drive/root:${dir}:/children`;
    return await paginateResults<
      (typeof listDriveItemsExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: path,
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  examplePayload: listDriveItemsExamplePayload,
});
