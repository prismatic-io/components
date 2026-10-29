import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { updateOrderExamplePayload } from "../../examplePayloads";
import { updateOrderInputs } from "../../inputs";

export const updateOrder = action({
  display: {
    label: "Update Order",
    description: "Updates order information.",
  },
  perform: async (context, { connection, id, discount }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.put(
        `/orders/${id}`,
        { data: { discount: util.types.toNumber(discount) } },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: updateOrderInputs,
  examplePayload: updateOrderExamplePayload,
});
export default { updateOrder };
