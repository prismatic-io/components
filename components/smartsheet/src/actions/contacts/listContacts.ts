import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listContactsExamplePayload } from "../../examplePayloads";
import { listContactsInputs } from "../../inputs";
export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "Lists all contacts for the authenticated user.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, includeAll, pagination },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/contacts`, {
      params: {
        includeAll,
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
    });
    return { data };
  },
  inputs: listContactsInputs,
  examplePayload: listContactsExamplePayload,
});
