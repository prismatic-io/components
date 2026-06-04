



import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createFolderExamplePayload } from "../../examplePayloads";
import { createFolderInputs } from "../../inputs";

export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Creates a new folder in a specified location.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, folderId, workspaceId, folderName },
  ) => {
    const client = createClient(connection, debug);
    const endpoint = workspaceId
      ? `/workspaces/${workspaceId}/folders`
      : folderId
        ? `/folders/${folderId}/folders`
        : "/home/folders";
    const { data } = await client.post(endpoint, { name: folderName });
    return { data };
  },
  inputs: createFolderInputs,
  examplePayload: createFolderExamplePayload,
});
