import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { attachmentsListOnSheetExamplePayload } from "../../examplePayloads";
import { attachmentsListOnSheetInputs } from "../../inputs";

export const attachmentsListOnSheet = action({
  display: {
    label: "List Attachments on Sheet",
    description: "Lists all attachments on a sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, page, pageSize, includeAll },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/sheets/${sheetId}/attachments`, {
      params: { page, pageSize, includeAll },
    });
    return { data };
  },
  inputs: attachmentsListOnSheetInputs,
  examplePayload: attachmentsListOnSheetExamplePayload,
});
