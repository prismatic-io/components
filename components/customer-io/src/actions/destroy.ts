import { action, util } from "@prismatic-io/spectral";
import { id, region, connectionInput } from "../inputs";
import { createCustomerClient } from "../client";
import { destroyExamplePayload } from "../examplePayloads";

export const destroy = action({
  display: {
    label: "Destroy",
    description: "Delete a customer by unique ID",
  },
  perform: async (context, { id, region, cioConnection }) => {
    const client = createCustomerClient(cioConnection, region);

    return {
      data: await client.destroy(util.types.toString(id)),
    };
  },
  inputs: { id, region, cioConnection: connectionInput },
  examplePayload: destroyExamplePayload,
});

export default destroy;
