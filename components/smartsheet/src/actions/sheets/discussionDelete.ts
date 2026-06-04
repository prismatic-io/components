import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { discussionDeleteExamplePayload } from "../../examplePayloads";
import { discussionDeleteInputs } from "../../inputs";

export const discussionDelete = action({
  display: {
    label: "Delete Discussion",
    description: "Deletes a discussion from a sheet or row.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, discussionId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.delete(
      `/sheets/${sheetId}/discussions/${discussionId}`,
    );
    return { data };
  },
  inputs: discussionDeleteInputs,
  examplePayload: discussionDeleteExamplePayload,
});
