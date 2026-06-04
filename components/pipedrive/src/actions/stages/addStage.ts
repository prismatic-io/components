import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanNumber } from "../../util";
import { WebhookVersion } from "../../constants";

export const addStage = action({
  display: {
    label: "Add Stage",
    description: "Adds a new stage.",
  },
  perform: async (
    context,
    { connection, name, pipelineId, dealProbability, rottenFlag, rottenDays },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.post("/stages", {
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
    name: input({
      label: "Name",
      type: "string",
      required: true,
      comments: "The name of the stage",
      clean: util.types.toString,
    }),
    pipelineId: input({
      label: "Pipeline ID",
      type: "string",
      required: true,
      comments: "The ID of the pipeline to add stage to",
      clean: util.types.toNumber,
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
      clean: util.types.toBool,
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
