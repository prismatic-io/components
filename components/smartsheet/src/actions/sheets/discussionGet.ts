import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { discussionGetExamplePayload } from "../../examplePayloads";
import { discussionGetInputs } from "../../inputs";

export const discussionGet = action({
  display: {
    label: "Get Discussion",
    description: "Retrieves a discussion by its ID.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, discussionId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(
      `/sheets/${sheetId}/discussions/${discussionId}`,
    );
    return { data };
  },
  inputs: discussionGetInputs,
  examplePayload: discussionGetExamplePayload,
});
