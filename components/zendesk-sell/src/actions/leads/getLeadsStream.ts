import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getLeadsStreamExamplePayload } from "../../examplePayloads";
import { getLeadsStreamInputs } from "../../inputs";

export const getLeadsStream = action({
  display: {
    label: "Get Leads Stream",
    description: "Reads the stream of lead events.",
  },
  perform: async (context, { connection, position, limit }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled, true);
      const params = { position, ...(limit && { limit }) };
      const { data } = await client.get(`/leads/stream`, {
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
  inputs: getLeadsStreamInputs,
  examplePayload: getLeadsStreamExamplePayload,
});
export default { getLeadsStream };
