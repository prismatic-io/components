import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { paginateResults } from "../../util";
import { listContactsInputs } from "../../inputs";
import { listContactsExamplePayload } from "../../examplePayloads";
import type { Contact } from "../../types";
export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "List all contacts in your account.",
  },
  inputs: listContactsInputs,
  perform: async (context, { connection, fetchAll, pagination = {} }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<Contact>(client, "/contacts", fetchAll, {
      page: pagination.page,
      per_page: pagination.perPage,
    });
    return { data };
  },
  examplePayload: listContactsExamplePayload,
});
