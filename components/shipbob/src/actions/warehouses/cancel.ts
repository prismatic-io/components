import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { cancelWarehouseReceivingOrderExamplePayload } from "../../examplePayloads";
import { connectionInput, receivingId, version } from "../../inputs";

export const cancelWarehouseReceivingOrder = action({
  display: {
    label: "Cancel Warehouse Receiving Order",
    description: "Cancels a Warehouse Receiving Order by Order ID",
  },
  perform: async (context, { connectionInput, version, receivingId }) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const { data } = await client.post(`/receiving/${receivingId}/cancel`);
    return { data };
  },
  inputs: {
    connectionInput,
    version: { ...version, default: "2.0" },
    receivingId,
  },
  examplePayload: cancelWarehouseReceivingOrderExamplePayload,
});
