import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { discussionsCreateExamplePayload } from "../../examplePayloads";
import { discussionsCreateInputs } from "../../inputs";

export const discussionsCreate = action({
  display: {
    label: "Create Discussion",
    description: "Creates a discussion on a sheet or row.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, rowId, comment },
  ) => {
    const client = createClient(connection, debug);
    const endpoint = rowId
      ? `/sheets/${sheetId}/rows/${rowId}/discussions`
      : `/sheets/${sheetId}/discussions`;
    const { data } = await client.post(endpoint, {
      comment: { text: comment },
    });
    return { data };
  },
  inputs: discussionsCreateInputs,
  examplePayload: discussionsCreateExamplePayload,
});
