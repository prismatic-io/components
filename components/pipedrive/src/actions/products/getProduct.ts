import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getProductExamplePayload } from "../../examplePayloads";
import { getProductOutputSchema } from "../../outputSchemas";

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Gets one product.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/products/${id}`);
    return { data };
  },
  inputs: getProductInputs,
  examplePayload: getProductExamplePayload,
  examplePerform: async () => getProductExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductOutputSchema,
  }),
});
