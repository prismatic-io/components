import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateStageInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { updateStageExamplePayload } from "../../examplePayloads";
import { updateStageOutputSchema } from "../../outputSchemas";

export const updateStage = action({
  display: {
    label: "Update Stage",
    description: "Updates stage details.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      name,
      pipelineId,
      dealProbability,
      rottenFlag,
      rottenDays,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.patch(`/stages/${id}`, {
      name,
      pipeline_id: pipelineId,
      deal_probability: dealProbability,
      is_deal_rot_enabled: rottenFlag,
      days_to_rotten: rottenDays,
    });
    return { data };
  },
  inputs: updateStageInputs,
  examplePayload: updateStageExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateStageOutputSchema,
  }),
});
