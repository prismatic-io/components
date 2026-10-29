import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listAccountDetailsExamplePayload } from "../../examplePayloads";
import { connection } from "../../inputs";

export const listAccountDetails = action({
  display: {
    label: "List Account Details",
    description: "Retrieves account details.",
  },
  perform: async (context, { connection }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.get(`/accounts/self`, {
        headers: { Accept: "application/json" },
      });
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection,
  },
  examplePayload: listAccountDetailsExamplePayload,
});
export default { listAccountDetails };
