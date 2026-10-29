import { action } from "@prismatic-io/spectral";
import { deleteGroupInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";

export const deleteGroup = action({
  display: {
    label: "Delete Group",
    description: "Deletes an existing group.",
  },
  inputs: deleteGroupInputs,
  perform: async (context, { connection, groupId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const { data } = await client.delete(`/groups/${groupId}`);

    return {
      data,
    };
  },
  examplePayload: {
    data: {},
  },
});
