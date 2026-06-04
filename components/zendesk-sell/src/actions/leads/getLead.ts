import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getLeadExamplePayload } from "../../examplePayloads";
import { getLeadInputs } from "../../inputs";

export const getLead = action({
  display: {
    label: "Get Lead",
    description: "Returns a single lead available to the user.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.get(`/leads/${id}`, {
        headers: { Accept: "application/json" },
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: getLeadInputs,
  examplePayload: getLeadExamplePayload,
});
export default { getLead };
