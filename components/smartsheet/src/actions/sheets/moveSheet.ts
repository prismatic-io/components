import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { moveSheetExamplePayload } from "../../examplePayloads";
import { moveSheetInputs } from "../../inputs";

export const moveSheet = action({
  display: {
    label: "Move Sheet",
    description: "Moves a sheet to a specified destination.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, destinationId, destinationType },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.post(`/sheets/${sheetId}/move`, {
      destinationId,
      destinationType,
    });
    return { data };
  },
  inputs: moveSheetInputs,
  examplePayload: moveSheetExamplePayload,
});
