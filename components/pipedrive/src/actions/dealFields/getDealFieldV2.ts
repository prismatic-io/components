import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
export const getDealFieldV2 = action({
  display: {
    label: "Get Deal Field (V2)",
    description: "Gets one deal field.",
  },
  perform: async (context, { connection, fieldCode }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`dealFields/${fieldCode}`);
    return { data };
  },
  inputs: getDealFieldV2Inputs,
});
