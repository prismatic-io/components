import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWarehouseReceivingOrderBoxLabelsExamplePayload } from "../../examplePayloads";
import { connectionInput, receivingId, version } from "../../inputs";

export const getWarehouseReceivingOrderBoxLabels = action({
  display: {
    label: "Get Warehouse Receiving Order Box Labels",
    description: "Retrieves Receiving Order Box Labels by Order ID",
  },
  perform: async (context, { connectionInput, version, receivingId }) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const { data } = await client.get(`/receiving/${receivingId}/labels`);
    return { data };
  },
  inputs: {
    connectionInput,
    version: { ...version, default: "2.0" },
    receivingId,
  },
  examplePayload: getWarehouseReceivingOrderBoxLabelsExamplePayload,
});
