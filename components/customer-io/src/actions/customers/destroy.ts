import { action } from "@prismatic-io/spectral";
import { destroyInputs } from "../../inputs";
import { createCustomerClient } from "../../client";
import { destroyExamplePayload } from "../../examplePayloads";

export const destroy = action({
  display: {
    label: "Destroy",
    description: "Delete a customer by unique ID.",
  },
  perform: async (context, { id, region, cioConnection }) => {
    const client = createCustomerClient(cioConnection, region);

    return {
      data: await client.destroy(id),
    };
  },
  inputs: destroyInputs,
  examplePayload: destroyExamplePayload,
});

export default destroy;
