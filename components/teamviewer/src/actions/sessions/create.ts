import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createSessionInputs } from "../../inputs/sessions";
import { createSessionExamplePayload } from "../../examplePayloads/sessions";
import { validGroupIdOrName } from "../../util";

export const createSession = action({
  display: {
    label: "Create Session",
    description: "Creates a new session.",
  },
  perform: async (
    context,
    {
      connection,
      customBody,
      customId,
      description,
      groupid,
      groupname,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    validGroupIdOrName(groupid, groupname);

    const body = {
      ...customBody,
      customId,
      description,
      groupid,
      groupname,
    };

    const { data } = await client.post(`/sessions`, body);

    return {
      data,
    };
  },
  inputs: createSessionInputs,
  examplePayload: createSessionExamplePayload,
});
