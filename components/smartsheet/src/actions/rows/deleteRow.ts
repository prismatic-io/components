import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteRowExamplePayload } from "../../examplePayloads";
import { deleteRowInputs } from "../../inputs";

export const deleteRow = action({
  display: {
    label: "Delete Row",
    description: "Deletes a row from a sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, rowId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.delete(`/sheets/${sheetId}/rows`, {
      params: { ids: rowId },
    });
    return { data };
  },
  inputs: deleteRowInputs,
  examplePayload: deleteRowExamplePayload,
});
