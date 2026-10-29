import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getProductFieldV2ExamplePayload } from "../../examplePayloads";
import { getProductFieldV2OutputSchema } from "../../outputSchemas";

export const getProductFieldV2 = action({
  display: {
    label: "Get Product Field (V2)",
    description: "Gets one product field.",
  },
  performSafety: "safe",
  perform: async (context, { connection, fieldCode }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`productFields/${fieldCode}`);
    return { data };
  },
  inputs: getProductFieldV2Inputs,
  examplePayload: getProductFieldV2ExamplePayload,
  examplePerform: async () => getProductFieldV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductFieldV2OutputSchema,
  }),
});
