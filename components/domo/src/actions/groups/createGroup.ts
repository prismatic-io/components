import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createGroupInputs } from "../../inputs";
import type { CreateGroupBody } from "../types/CreateGroupBody";
import { createGroupExamplePayload } from "../../examplePayloads";

export const createGroup = action({
  display: {
    label: "Create Group",
    description: "Creates a new group in a Domo instance.",
  },
  examplePayload: createGroupExamplePayload,
  perform: async (context, { connection, name }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const body: CreateGroupBody = {
      name,
    };
    const { data } = await client.post(`/groups`, body);
    return { data };
  },
  inputs: createGroupInputs,
});

export default { createGroup };
