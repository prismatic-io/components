import { action } from "@prismatic-io/spectral";
import { createGroupInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { CreateGroupPayload, GenericCreate } from "../../types";
import { createGroupExamplePayload } from "../../examplePayloads";

export const createGroup = action({
  display: {
    label: "Create Group",
    description: "Creates a new group in an account.",
  },
  inputs: createGroupInputs,
  perform: async (
    context,
    { connection, groupName, created, isDefaultGroup },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const payload: CreateGroupPayload = {
      groupName: groupName!,
      created: created!,
      isDefaultGroup,
    };

    const { data } = await client.post<GenericCreate>(`/groups`, payload);

    return {
      data,
    };
  },
  examplePayload: createGroupExamplePayload,
});
