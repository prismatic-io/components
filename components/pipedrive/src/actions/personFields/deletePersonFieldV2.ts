import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePersonFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
export const deletePersonFieldV2 = action({
  display: {
    label: "Delete Person Field (V2)",
    description: "Deletes a person field.",
  },
  perform: async (context, { connection, fieldCode }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`personFields/${fieldCode}`);
    return { data };
  },
  inputs: deletePersonFieldV2Inputs,
});
