import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, pipelineIdInput } from "../../inputs";
import { cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const getPipeline = action({
  display: {
    label: "Get Pipeline",
    description: "Gets one pipeline.",
  },
  perform: async (context, { connection, id, totalsConvertCurrency }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/pipelines/${id}`, {
      params: { totals_convert_currency: totalsConvertCurrency },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: pipelineIdInput,
    totalsConvertCurrency: input({
      label: "Totals Convert Currency",
      type: "string",
      clean: cleanString,
      comments: "The 3-letter currency code of any of the supported currencies",
    }),
  },
});
