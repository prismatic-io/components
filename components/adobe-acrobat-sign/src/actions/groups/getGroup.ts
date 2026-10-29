import { action } from "@prismatic-io/spectral";
import { getGroupInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { Group } from "../../types";
import { getGroupExamplePayload } from "../../examplePayloads";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Retrieves detailed information about the group.",
  },
  inputs: getGroupInputs,
  perform: async (context, { connection, groupId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const { data } = await client.get<Group>(`/groups/${groupId}`);

    return {
      data,
    };
  },
  examplePayload: getGroupExamplePayload,
});
