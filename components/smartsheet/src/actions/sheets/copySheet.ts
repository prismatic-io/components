import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { copySheetExamplePayload } from "../../examplePayloads";
import { copySheetInputs } from "../../inputs";

export const copySheet = action({
  display: {
    label: "Copy Sheet",
    description: "Copies a sheet to a specified destination.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, destinationId, destinationType, newName },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.post(
      `/sheets/${sheetId}/copy`,
      { destinationId, destinationType, newName },
      {
        params: {
          include:
            "attachments,cellLinks,data,discussions,filters,forms,ruleRecipients,rules,shares",
        },
      },
    );
    return { data };
  },
  inputs: copySheetInputs,
  examplePayload: copySheetExamplePayload,
});
