import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getGroupExamplePayload } from "../../examplePayloads";
import { getGroupInputs } from "../../inputs";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Retrieves a group by its ID.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, groupId }) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/groups/${groupId}`);
    return { data };
  },
  inputs: getGroupInputs,
  examplePayload: getGroupExamplePayload,
});
