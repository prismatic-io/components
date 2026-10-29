import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getOrdersStreamExamplePayload } from "../../examplePayloads";
import { getOrdersStreamInputs } from "../../inputs";

export const getOrdersStream = action({
  display: {
    label: "Get Orders Stream",
    description: "Reads the stream of order events.",
  },
  perform: async (context, { connection, position, limit }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled, true);
      const params = { position, ...(limit && { limit }) };
      const { data } = await client.get(`/orders/stream`, {
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
  inputs: getOrdersStreamInputs,
  examplePayload: getOrdersStreamExamplePayload,
});
export default { getOrdersStream };
