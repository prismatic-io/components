import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPipelineInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getPipelineExamplePayload } from "../../examplePayloads";
import { getPipelineOutputSchema } from "../../outputSchemas";
export const getPipeline = action({
  display: {
    label: "Get Pipeline",
    description: "Gets one pipeline.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id, totalsConvertCurrency }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/pipelines/${id}`, {
      params: { totals_convert_currency: totalsConvertCurrency },
    });
    return { data };
  },
  inputs: getPipelineInputs,
  examplePayload: getPipelineExamplePayload,
  examplePerform: async () => getPipelineExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPipelineOutputSchema,
  }),
});
