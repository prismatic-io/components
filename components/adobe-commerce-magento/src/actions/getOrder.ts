import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { connectionInput, orderId } from "../inputs";

export const getOrder = action({
  display: {
    label: "Get Order",
    description: "Loads a specified order.",
  },
  perform: async (context, { connection, orderId }) => {
    const client = await getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(`/orders/${orderId}`);
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
});

export default { getOrder };
