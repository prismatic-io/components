import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { deleteContactExamplePayload } from "../../examplePayloads";
import { deleteContactInputs } from "../../inputs";

export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description:
      "Deletes an existing contact. This operation cannot be undone.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.delete(`/contacts/${id}`);

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: deleteContactInputs,
  examplePayload: deleteContactExamplePayload,
});
export default { deleteContact };
