import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { createOrderExamplePayload } from "../../examplePayloads";
import { createOrderInputs } from "../../inputs";

export const createOrder = action({
  display: {
    label: "Create Order",
    description: "Creates a new order.",
  },
  perform: async (context, { connection, dealId, discount }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const body = {
        deal_id: util.types.toNumber(dealId),
        ...(discount && { discount: util.types.toNumber(discount) }),
      };
      const { data } = await client.post(
        `/orders`,
        { data: body },
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
  inputs: createOrderInputs,
  examplePayload: createOrderExamplePayload,
});
export default { createOrder };
