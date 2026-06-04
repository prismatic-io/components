import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { validGroupIdOrName } from "../../util";
import { createContactInputs } from "../../inputs/contacts";
import { createContactExamplePayload } from "../../examplePayloads/contacts";

export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Creates a new contact.",
  },
  perform: async (
    context,
    { connection, description, email, groupid, groupname, invite, name },
  ) => {
    validGroupIdOrName(groupid, groupname);

    const client = createClient(connection, context.debug.enabled);

    const body = {
      description,
      groupid,
      groupname,
      invite,
      name,
      email,
    };

    const { data } = await client.post(`/contacts`, body);

    return {
      data,
    };
  },
  inputs: createContactInputs,
  examplePayload: createContactExamplePayload,
});
