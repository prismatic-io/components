import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPipelinesInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getPipelinesExamplePayload } from "../../examplePayloads";
import { getPipelinesOutputSchema } from "../../outputSchemas";

export const getPipelines = action({
  display: {
    label: "Get Pipelines",
    description: "Gets all pipelines.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { connection, sortBy, sortDirection, pagination: { limit, cursor } = {} },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/pipelines", {
      params: { sort_by: sortBy, sort_direction: sortDirection, limit, cursor },
    });
    return { data };
  },
  inputs: getPipelinesInputs,
  examplePayload: getPipelinesExamplePayload,
  examplePerform: async () => getPipelinesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPipelinesOutputSchema,
  }),
});
