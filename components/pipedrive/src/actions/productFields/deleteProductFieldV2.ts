import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteProductFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteProductFieldV2ExamplePayload } from "../../examplePayloads";
import { deleteProductFieldV2OutputSchema } from "../../outputSchemas";
export const deleteProductFieldV2 = action({
  display: {
    label: "Delete Product Field (V2)",
    description: "Deletes a product field.",
  },
  performSafety: "notAllowed",
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
  examplePayload: deleteProductFieldV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteProductFieldV2OutputSchema,
  }),
});
