import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
export const getPersonFieldV2 = action({
  display: {
    label: "Get Person Field (V2)",
    description: "Gets one person field.",
  },
  perform: async (context, { connection, fieldCode }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`personFields/${fieldCode}`);
    return { data };
  },
  inputs: getPersonFieldV2Inputs,
});
