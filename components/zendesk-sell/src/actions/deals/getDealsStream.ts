import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getDealsStreamExamplePayload } from "../../examplePayloads";
import { getDealsStreamInputs } from "../../inputs";

export const getDealsStream = action({
  display: {
    label: "Get Deals Stream",
    description: "Reads the stream of deal events.",
  },
  perform: async (context, { connection, position, limit }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled, true);
      const params = { position, ...(limit && { limit }) };
      const { data } = await client.get(`/deals/stream`, {
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
  inputs: getDealsStreamInputs,
  examplePayload: getDealsStreamExamplePayload,
});
export default { getDealsStream };
