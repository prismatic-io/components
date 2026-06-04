import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, folderId, workspaceId } from "../../inputs";

export const listCallsInFolder = action({
  display: {
    label: "List Calls in Folder",
    description:
      "Given a folder id, this endpoint retrieves a list of calls in it.",
  },
  perform: async (context, { connection, folderId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/library/folder-content`, {
      params: { folderId },
    });
    return { data };
  },
  inputs: {
    connection,
    workspaceId,
    folderId,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      id: "3843152912968920037",
      name: "Sales Onboarding",
      createdBy: "234599484848423",
      updated: 1584192600,
      calls: [
        {
          id: "7782342274025937895",
          title: "Example call",
          note: "sample note",
          addedBy: "234599484848423",
          created: 1578868200,
          url: "https://app.gong.io/call?id=3636865806219496180&highlights=%5B%7B%22to%22%3A+3240%2C+%22from%22%3A+1200%2C+%22type%22%3A+%22LIBRARY%22%7D%5D",
          snippet: {
            fromSec: 21,
            toSec: 132,
          },
        },
      ],
    },
  },
});
