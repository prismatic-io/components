import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createSheetExamplePayload } from "../../examplePayloads";
import { createSheetInputs } from "../../inputs";

export const createSheet = action({
  display: {
    label: "Create Sheet",
    description: "Creates a new sheet with specified columns.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, folderId, workspaceId, name, columns },
  ) => {
    const client = createClient(connection, debug);
    const endpoint = workspaceId
      ? `/workspaces/${workspaceId}/sheets`
      : folderId
        ? `/folders/${folderId}/sheets`
        : "/sheets";
    const { data } = await client.post(
      endpoint,
      { name, columns },
      {
        params: {
          include:
            "attachments,cellLinks,data,discussions,filters,forms,ruleRecipients,rules",
        },
      },
    );
    return { data };
  },
  inputs: createSheetInputs,
  examplePayload: createSheetExamplePayload,
});
