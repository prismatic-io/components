import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getStageInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getStageExamplePayload } from "../../examplePayloads";
import { getStageOutputSchema } from "../../outputSchemas";
export const getStage = action({
  display: {
    label: "Get Stage",
    description: "Gets one stage.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/stages/${id}`);
    return { data };
  },
  inputs: getStageInputs,
  examplePayload: getStageExamplePayload,
  examplePerform: async () => getStageExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getStageOutputSchema,
  }),
});
