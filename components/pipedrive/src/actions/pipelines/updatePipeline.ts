import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, pipelineIdInput } from "../../inputs";
import { cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const updatePipeline = action({
  display: {
    label: "Update Pipeline",
    description: "Updates a pipeline.",
  },
  perform: async (context, { connection, id, name, isDealProbabilityEnabled }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.patch(`/pipelines/${id}`, {
      name,
      is_deal_probability_enabled: isDealProbabilityEnabled,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: pipelineIdInput,
    name: input({
      label: "Name",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The name of the pipeline",
    }),
    isDealProbabilityEnabled: input({
      label: "Deal Probability",
      type: "boolean",
      required: false,
      clean: util.types.toBool,
      comments: "Whether deal probability is disabled or enabled for this pipeline",
    }),
  },
});
