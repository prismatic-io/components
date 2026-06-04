import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getOrderExamplePayload } from "../../examplePayloads";
import { getOrderInputs } from "../../inputs";

export const getOrder = action({
  display: {
    label: "Get Order",
    description: "Returns a single order available to the user.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.get(`/orders/${id}`, {
        headers: { Accept: "application/json" },
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: getOrderInputs,
  examplePayload: getOrderExamplePayload,
});
export default { getOrder };
