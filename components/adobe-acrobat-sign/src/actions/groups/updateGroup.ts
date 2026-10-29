import { action } from "@prismatic-io/spectral";
import { updateGroupInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { UpdateGroupPayload, GenericCreate } from "../../types";
import { updateGroupExamplePayload } from "../../examplePayloads";

export const updateGroup = action({
  display: {
    label: "Update Group",
    description: "Updates an existing group.",
  },
  inputs: updateGroupInputs,
  perform: async (
    context,
    { connection, groupName, created, isDefaultGroup, groupId },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const payload: UpdateGroupPayload = {
      groupName,
      created,
      isDefaultGroup,
    };

    const { data } = await client.put<GenericCreate>(
      `/groups/${groupId}`,
      payload,
    );

    return {
      data,
    };
  },
  examplePayload: updateGroupExamplePayload,
});
