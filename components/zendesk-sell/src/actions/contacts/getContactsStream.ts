import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getContactsStreamExamplePayload } from "../../examplePayloads";
import { getContactsStreamInputs } from "../../inputs";

export const getContactsStream = action({
  display: {
    label: "Get Contacts Stream",
    description: "Reads the stream of contact events.",
  },
  perform: async (context, { connection, position, limit }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled, true);
      const params = { position, ...(limit && { limit }) };
      const { data } = await client.get(`/contacts/stream`, {
        params,
        headers: { Accept: "application/json" },
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: getContactsStreamInputs,
  examplePayload: getContactsStreamExamplePayload,
});
export default { getContactsStream };
