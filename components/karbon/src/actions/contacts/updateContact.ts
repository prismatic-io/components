import { action } from "@prismatic-io/spectral";
import updateContactInputs from "../../inputs/contacts/updateContact";
import { createKarbonClient } from "../../client";
import { updateContactExamplePayload } from "../../examplePayloads";
import { SUCCESS_MESSAGE } from "../../constants";

export const updateContact = action({
  display: {
    label: "Update a Contact",
    description: "Partially update a contact by Contact key",
  },
  inputs: {
    ...updateContactInputs,
  },
  perform: async (
    context,
    {
      connection,
      contactkey,
      firstName,
      lastName,
      middleName,
      preferredName,
      salutation,
      suffix,
    },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    await client.patch(`/v3/Contacts/${contactkey}`, {
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      PreferredName: preferredName,
      Salutation: salutation,
      Suffix: suffix,
    });

    return { data: SUCCESS_MESSAGE };
  },
  examplePayload: updateContactExamplePayload,
});
