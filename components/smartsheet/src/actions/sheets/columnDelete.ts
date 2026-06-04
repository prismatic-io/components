import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { columnDeleteExamplePayload } from "../../examplePayloads";
import { columnDeleteInputs } from "../../inputs";

export const columnDelete = action({
  display: {
    label: "Delete Column",
    description: "Deletes a column from a sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, columnId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.delete(
      `/sheets/${sheetId}/columns/${columnId}`,
    );
    return { data };
  },
  inputs: columnDeleteInputs,
  examplePayload: columnDeleteExamplePayload,
});
