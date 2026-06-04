import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_PATH } from "../../constants";
import { deleteContactExamplePayload } from "../../examplePayloads";
import { deleteContactInputs } from "../../inputs";

export const deleteContact = action({
  examplePayload: deleteContactExamplePayload,
  display: {
    label: "Delete Contact",
    description:
      "Delete one or more contacts by contact key. This operation is asynchronous and may take time to complete. Returns an operation ID for status tracking.",
  },
  inputs: deleteContactInputs,
  perform: async (context, { connection, deleteContactKeys }) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      values: deleteContactKeys,
      DeleteOperationType: "ContactAndAttributes",
    };

    const { data } = await client.post(
      `${CONTACTS_PATH}/actions/delete?type=keys`,
      body,
    );

    return { data };
  },
});
