import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_PATH } from "../../constants";
import { deleteContactExamplePayload } from "../../examplePayloads";
import { deleteContactInputs } from "../../inputs";
import { deleteContactOutputSchema } from "../../outputSchemas";
export const deleteContact = action({
  examplePayload: deleteContactExamplePayload,
  display: {
    label: "Delete Contact",
    description:
      "Delete one or more contacts by contact key. This operation is asynchronous and may take time to complete. Returns an operation ID for status tracking.",
  },
  inputs: deleteContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteContactOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteContactExamplePayload.data,
  }),
});
