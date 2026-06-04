import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { getFolderInputs } from "../../inputs";
import { getFolderPayload } from "../../examplePayloads";

export const getFolder = action({
  display: {
    label: "Get Folder",
    description: "Retrieve details of a specific folder by ID",
  },
  perform: async (context, { connection, folderId }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const { data } = await client.get(`/folders/${folderId}`);

    return { data };
  },
  inputs: getFolderInputs,
  examplePayload: getFolderPayload,
});
