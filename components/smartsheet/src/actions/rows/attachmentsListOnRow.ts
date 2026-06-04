import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { attachmentsListOnRowExamplePayload } from "../../examplePayloads";
import { attachmentsListOnRowInputs } from "../../inputs";

export const attachmentsListOnRow = action({
  display: {
    label: "List Attachments on Row",
    description: "Lists attachments on a row of a sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, rowId, page, pageSize, includeAll },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(
      `/sheets/${sheetId}/rows/${rowId}/attachments`,
      {
        params: { page, pageSize, includeAll },
      },
    );
    return { data };
  },
  inputs: attachmentsListOnRowInputs,
  examplePayload: attachmentsListOnRowExamplePayload,
});
