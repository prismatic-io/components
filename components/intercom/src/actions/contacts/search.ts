import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, startingAfterInput } from "../../inputs";
import {
  emailInput,
  jsonQuery,
  nameInput,
  roleInput,
} from "../../inputs/contacts";

export const searchContacts = action({
  display: {
    label: "Search Contacts",
    description: "Search through all Contacts",
  },
  inputs: {
    connection: connectionInput,
    role: { ...roleInput, required: false },
    name: { ...nameInput, required: false },
    email: { ...emailInput, required: false },
    jsonQuery,
    startingAfter: startingAfterInput,
  },
  perform: async (
    context,
    { connection, role, name, email, startingAfter, jsonQuery },
  ) => {
    const values = [];
    if (role) {
      values.push({ field: "role", operator: "=", value: role });
    }
    if (name) {
      values.push({ field: "name", operator: "=", value: name });
    }
    if (email) {
      values.push({ field: "email", operator: "=", value: email });
    }

    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      "/contacts/search",
      {
        query: jsonQuery ? jsonQuery : { operator: "AND", value: values },
      },
      { params: { startingAfter } },
    );
    return { data };
  },
});
