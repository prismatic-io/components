import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, workspaceId } from "../../inputs";

export const listLibraryFolders = action({
  display: {
    label: "List Library Folders",
    description:
      "Use this endpoint to retrieve a list of public library folders.",
  },
  perform: async (context, { connection, workspaceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/library/folders`, {
      params: { workspaceId },
    });
    return { data };
  },
  inputs: {
    connection,
    workspaceId,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      folders: [
        {
          id: "3843152912968920037",
          name: "Sales Onboarding",
          parentFolderId: "295738305212375930",
          createdBy: "234599484848423",
          updated: 1584192600,
        },
      ],
    },
  },
});
