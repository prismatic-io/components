import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteProductFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
export const deleteProductFieldV2 = action({
  display: {
    label: "Delete Product Field (V2)",
    description: "Deletes a product field.",
  },
  perform: async (context, { connection, fieldCode }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`productFields/${fieldCode}`);
    return { data };
  },
  inputs: deleteProductFieldV2Inputs,
});
