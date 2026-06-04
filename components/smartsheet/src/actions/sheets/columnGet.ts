import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { columnGetExamplePayload } from "../../examplePayloads";
import { columnGetInputs } from "../../inputs";

export const columnGet = action({
  display: {
    label: "Get Column",
    description: "Retrieves a column by its ID.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, columnId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(
      `/sheets/${sheetId}/columns/${columnId}`,
      { params: { level: 1 } },
    );
    return { data };
  },
  inputs: columnGetInputs,
  examplePayload: columnGetExamplePayload,
});
