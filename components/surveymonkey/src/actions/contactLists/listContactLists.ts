import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { paginateResults } from "../../util";
import { listContactListsInputs } from "../../inputs";
import { listContactListsExamplePayload } from "../../examplePayloads";
import type { ContactList } from "../../types";
export const listContactLists = action({
  display: {
    label: "List Contact Lists",
    description: "List all contact lists in your account.",
  },
  inputs: listContactListsInputs,
  perform: async (context, { connection, fetchAll, pagination = {} }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<ContactList>(
      client,
      "/contact_lists",
      fetchAll,
      {
        page: pagination.page,
        per_page: pagination.perPage,
      },
    );
    return { data };
  },
  examplePayload: listContactListsExamplePayload,
});
