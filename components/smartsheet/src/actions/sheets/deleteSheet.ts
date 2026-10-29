import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteSheetExamplePayload } from "../../examplePayloads";
import { deleteSheetInputs } from "../../inputs";

export const deleteSheet = action({
  display: {
    label: "Delete Sheet",
    description: "Deletes a sheet by its ID.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, sheetId }) => {
    const client = createClient(connection, debug);
    const { data } = await client.delete(`/sheets/${sheetId}`);
    return { data };
  },
  inputs: deleteSheetInputs,
  examplePayload: deleteSheetExamplePayload,
});
