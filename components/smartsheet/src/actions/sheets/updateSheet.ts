import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateSheetExamplePayload } from "../../examplePayloads";
import { updateSheetInputs } from "../../inputs";

export const updateSheet = action({
  display: {
    label: "Update Sheet",
    description: "Updates the properties of a sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, name },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.put(`/sheets/${sheetId}`, { name });
    return { data };
  },
  inputs: updateSheetInputs,
  examplePayload: updateSheetExamplePayload,
});
