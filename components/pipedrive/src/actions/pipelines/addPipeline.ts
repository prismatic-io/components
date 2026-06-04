import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const addPipeline = action({
  display: {
    label: "Add Pipeline",
    description: "Adds a new pipeline.",
  },
  perform: async (context, { connection, name, isDealProbabilityEnabled }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.post("/pipelines", {
      name,
      is_deal_probability_enabled: isDealProbabilityEnabled,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    name: input({
      label: "Name",
      type: "string",
      required: true,
      clean: util.types.toString,
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
