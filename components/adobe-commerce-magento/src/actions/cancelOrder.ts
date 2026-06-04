import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { cancelOrderExampleResponse } from "../examplePayloads";
import { connectionInput, orderId } from "../inputs";

export const cancelOrder = action({
  display: {
    label: "Cancel Order",
    description: "Cancels a specified order.",
  },
  perform: async (context, { connection, orderId }) => {
    const client = await getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.post(`/orders/${orderId}/cancel`);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    orderId,
  },
  examplePayload: cancelOrderExampleResponse,
});

export default { cancelOrder };
