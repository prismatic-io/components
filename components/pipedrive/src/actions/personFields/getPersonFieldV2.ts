import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getPersonFieldV2ExamplePayload } from "../../examplePayloads";
import { getPersonFieldV2OutputSchema } from "../../outputSchemas";
export const getPersonFieldV2 = action({
  display: {
    label: "Get Person Field (V2)",
    description: "Gets one person field.",
  },
  performSafety: "safe",
  perform: async (context, { connection, fieldCode }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`personFields/${fieldCode}`);
    return { data };
  },
  inputs: getPersonFieldV2Inputs,
  examplePayload: getPersonFieldV2ExamplePayload,
  examplePerform: async () => getPersonFieldV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonFieldV2OutputSchema,
  }),
});
