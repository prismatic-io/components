import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getDealFieldV2ExamplePayload } from "../../examplePayloads";
import { getDealFieldV2OutputSchema } from "../../outputSchemas";

export const getDealFieldV2 = action({
  display: {
    label: "Get Deal Field (V2)",
    description: "Gets one deal field.",
  },
  performSafety: "safe",
  perform: async (context, { connection, fieldCode }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`dealFields/${fieldCode}`);
    return { data };
  },
  inputs: getDealFieldV2Inputs,
  examplePayload: getDealFieldV2ExamplePayload,
  examplePerform: async () => getDealFieldV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealFieldV2OutputSchema,
  }),
});
