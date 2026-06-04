import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { defaultListActionsInputs } from "../../inputs/general";
import { listContactsExamplePayload } from "../../examplePayloads/contacts";

export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "Returns a list of contacts.",
  },
  perform: async (context, { connection, queryParams }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/contacts`, {
      params: queryParams,
    });

    return {
      data,
    };
  },
  inputs: defaultListActionsInputs,
  examplePayload: listContactsExamplePayload,
});
