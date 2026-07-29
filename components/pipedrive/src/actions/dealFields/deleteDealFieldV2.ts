import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDealFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
export const deleteDealFieldV2 = action({
  display: {
    label: "Delete Deal Field (V2)",
    description: "Deletes a deal field.",
  },
  perform: async (context, { connection, fieldCode }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`dealFields/${fieldCode}`);
    return { data };
  },
  inputs: deleteDealFieldV2Inputs,
});
