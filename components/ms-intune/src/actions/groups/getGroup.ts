import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getGroupExamplePayload } from "../../examplePayloads";
import { getGroupInputs } from "../../inputs";
export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Retrieve a single group.",
  },
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`${ENDPOINTS.GROUPS}/${groupId}`);
    return {
      data,
    };
  },
  inputs: getGroupInputs,
  examplePayload: getGroupExamplePayload,
});
