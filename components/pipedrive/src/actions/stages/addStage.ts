import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addStageInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addStageExamplePayload } from "../../examplePayloads";
import { addStageOutputSchema } from "../../outputSchemas";
export const addStage = action({
  display: {
    label: "Add Stage",
    description: "Adds a new stage.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, name, pipelineId, dealProbability, rottenFlag, rottenDays },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post("/stages", {
      name,
      pipeline_id: pipelineId,
      deal_probability: dealProbability,
      is_deal_rot_enabled: rottenFlag,
      days_to_rotten: rottenDays,
    });
    return { data };
  },
  inputs: addStageInputs,
  examplePayload: addStageExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addStageOutputSchema,
  }),
});
