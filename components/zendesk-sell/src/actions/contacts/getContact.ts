import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getContactExamplePayload } from "../../examplePayloads";
import { getContactInputs } from "../../inputs";

export const getContact = action({
  display: {
    label: "Get Contact",
    description:
      "Returns a single contact available to the user, according to the unique contact ID provided.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.get(`/contacts/${id}`, {
        headers: { Accept: "application/json" },
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: getContactInputs,
  examplePayload: getContactExamplePayload,
});
export default { getContact };
