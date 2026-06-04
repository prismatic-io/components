import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { columnsListOnSheetExamplePayload } from "../../examplePayloads";
import { columnsListOnSheetInputs } from "../../inputs";

export const columnsListOnSheet = action({
  display: {
    label: "List Columns",
    description: "Lists all columns on a sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, page, pageSize, includeAll },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/sheets/${sheetId}/columns`, {
      params: { level: 1, page, pageSize, includeAll },
    });
    return { data };
  },
  inputs: columnsListOnSheetInputs,
  examplePayload: columnsListOnSheetExamplePayload,
});
