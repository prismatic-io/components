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
    { connection, customBody, customId, description, group },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    validGroupIdOrName(group.groupid, group.groupname);
    const body = {
      ...customBody,
      customId,
      description,
      groupid: group.groupid,
      groupname: group.groupname,
    };
    const { data } = await client.post(`/sessions`, body);
    return {
      data,
    };
  },
  inputs: createSessionInputs,
  examplePayload: createSessionExamplePayload,
});
