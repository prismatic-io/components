import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { getFolderItemsInputs } from "../../inputs";
import { fetchGuruResults } from "../../util";
import { getFolderItemsPayload } from "../../examplePayloads";

export const getFolderItems = action({
  display: {
    label: "Get Folder Items",
    description:
      "Retrieve all items (cards and subfolders) in a specific folder",
  },
  perform: async (context, { connection, folderId, fetchAll }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const url = `/folders/${folderId}/items`;
    const data = await fetchGuruResults(client, url, fetchAll);

    return { data };
  },
  inputs: getFolderItemsInputs,
  examplePayload: getFolderItemsPayload,
});
