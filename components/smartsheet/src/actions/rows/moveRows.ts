import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { moveRowsExamplePayload } from "../../examplePayloads";
import { moveRowsInputs } from "../../inputs";

export const moveRows = action({
  display: {
    label: "Move Rows",
    description: "Moves rows to another sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, rowIds, toSheetId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.post(
      `/sheets/${sheetId}/rows/move`,
      { rowIds, to: { sheetId: toSheetId } },
      { params: { include: "attachments,discussions" } },
    );
    return { data };
  },
  inputs: moveRowsInputs,
  examplePayload: moveRowsExamplePayload,
});
