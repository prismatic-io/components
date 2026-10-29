import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getDealExamplePayload } from "../../examplePayloads";
import { getDealInputs } from "../../inputs";

export const getDeal = action({
  display: {
    label: "Get Deal",
    description: "Returns a single deal available to the user.",
  },
  perform: async (context, { connection, id, includes }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const params = {
        ...(includes && { includes }),
      };
      const { data } = await client.get(`/deals/${id}`, {
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
  inputs: getDealInputs,
  examplePayload: getDealExamplePayload,
});
export default { getDeal };
