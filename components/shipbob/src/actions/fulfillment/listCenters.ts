import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listFulfillmentCentersExamplePayload } from "../../examplePayloads";
import { connectionInput, version } from "../../inputs";

export const listFulfillmentCenters = action({
  display: {
    label: "List Fulfillment Centers",
    description: "Retrieves a list of Fulfillment Centers",
  },
  perform: async (context, { connectionInput, version }) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const { data } = await client.get(`/fulfillmentCenter`);
    return { data };
  },
  inputs: {
    connectionInput,
    version,
  },
  examplePayload: listFulfillmentCentersExamplePayload,
});
