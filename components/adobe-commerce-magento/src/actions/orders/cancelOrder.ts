import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { cancelOrderExamplePayload } from "../../examplePayloads";
import { cancelOrderInputs } from "../../inputs";
export const cancelOrder = action({
  display: {
    label: "Cancel Order",
    description: "Cancels a specified order.",
  },
  performSafety: "notAllowed",
  examplePerform: async () => cancelOrderExamplePayload,
  perform: async (context, { connection, orderId }) => {
    const client = await getClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${ENDPOINTS.orders}/${encodeURIComponent(orderId)}/cancel`,
    );
    return { data };
  },
  inputs: cancelOrderInputs,
  examplePayload: cancelOrderExamplePayload,
});
