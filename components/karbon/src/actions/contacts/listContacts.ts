import { action } from "@prismatic-io/spectral";
import { createKarbonClient } from "../../client";
import listContactsInputs from "../../inputs/contacts/listContacts";
import { getPaginatedData } from "../../utils";
import { listContactsExamplePayload } from "../../examplePayloads";
import type { Contact } from "../../interfaces/Contact";

export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "List all Contacts",
  },
  inputs: {
    ...listContactsInputs,
  },
  perform: async (
    context,
    { connection, $filter, $top, $skip, $orderby, getAllData },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);

    const data = await getPaginatedData<Contact>({
      pagination: { $top, $skip },
      client,
      endpoint: "/v3/Contacts",
      getAllData,
      $orderby,
      $filter,
    });
    return { data };
  },
  examplePayload: listContactsExamplePayload,
});
