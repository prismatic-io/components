import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";
import { deleteGroupExamplePayload } from "../../examplePayloads";
import { deleteGroupInputs } from "../../inputs";
export const deleteGroup = action({
  display: {
    label: "Delete Group",
    description: "Delete a single group.",
  },
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`${ENDPOINTS.GROUPS}/${groupId}`);
    return {
      data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
    };
  },
  inputs: deleteGroupInputs,
  examplePayload: deleteGroupExamplePayload,
});
