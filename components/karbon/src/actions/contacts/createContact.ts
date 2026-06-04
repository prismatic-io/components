import { action } from "@prismatic-io/spectral";
import createContactInputs from "../../inputs/contacts/createContact";
import { createKarbonClient } from "../../client";
import { cleanOdata } from "../../utils";
import { createContactExamplePayload } from "../../examplePayloads";

export const createContact = action({
  display: {
    label: "Create a Contact",
    description: "Create a new contact",
  },
  inputs: {
    ...createContactInputs,
  },
  perform: async (
    context,
    { connection, firstName, lastName, additionalFields },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    const response = await client.post("/v3/Contacts", {
      FirstName: firstName,
      LastName: lastName,
      ...(additionalFields || {}),
    });
    return { data: cleanOdata(response.data) };
  },
  examplePayload: createContactExamplePayload,
});
