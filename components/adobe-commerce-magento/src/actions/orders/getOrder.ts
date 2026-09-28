import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getOrderExamplePayload } from "../../examplePayloads";
import { getOrderInputs } from "../../inputs";
export const getOrder = action({
  display: {
    label: "Get Order",
    description: "Loads a specified order.",
  },
  examplePayload: getOrderExamplePayload,
  performSafety: "safe",
  perform: async (context, { connection, orderId }) => {
    const client = await getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.orders}/${encodeURIComponent(orderId)}`,
    );
    return { data };
  },
  inputs: getOrderInputs,
});
