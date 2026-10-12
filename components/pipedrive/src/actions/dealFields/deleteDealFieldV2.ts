import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDealFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteDealFieldV2ExamplePayload } from "../../examplePayloads";
import { deleteDealFieldV2OutputSchema } from "../../outputSchemas";
export const deleteDealFieldV2 = action({
  display: {
    label: "Delete Deal Field (V2)",
    description: "Deletes a deal field.",
  },
  performSafety: "notAllowed",
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
  examplePayload: deleteDealFieldV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteDealFieldV2OutputSchema,
  }),
});
