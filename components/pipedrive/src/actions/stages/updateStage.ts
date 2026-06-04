import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, stageIdInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const updateStage = action({
  display: {
    label: "Update Stage",
    description: "Updates stage details.",
  },
  perform: async (
    context,
    { connection, id, name, pipelineId, dealProbability, rottenFlag, rottenDays },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.patch(`/stages/${id}`, {
      name,
      pipeline_id: pipelineId,
      deal_probability: dealProbability,
      is_deal_rot_enabled: rottenFlag,
      days_to_rotten: rottenDays,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: stageIdInput,
    name: input({
      label: "Name",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The name of the stage",
    }),
    pipelineId: input({
      label: "Pipeline ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the pipeline to add stage to",
    }),
    dealProbability: input({
      label: "Deal Probability",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The success probability percentage of the deal",
    }),
    rottenFlag: input({
      label: "Rotten Flag",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether deals in this stage can become rotten",
    }),
    rottenDays: input({
      label: "Rotten Days",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The number of days the deals not updated in this stage would become rotten",
    }),
  },
});
