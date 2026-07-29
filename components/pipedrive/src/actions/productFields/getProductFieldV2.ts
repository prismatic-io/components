import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
export const getProductFieldV2 = action({
  display: {
    label: "Get Product Field (V2)",
    description: "Gets one product field.",
  },
  perform: async (context, { connection, fieldCode }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`productFields/${fieldCode}`);
    return { data };
  },
  inputs: getProductFieldV2Inputs,
});
