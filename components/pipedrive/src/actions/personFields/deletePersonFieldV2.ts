import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePersonFieldV2Inputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deletePersonFieldV2ExamplePayload } from "../../examplePayloads";
import { deletePersonFieldV2OutputSchema } from "../../outputSchemas";

export const deletePersonFieldV2 = action({
  display: {
    label: "Delete Person Field (V2)",
    description: "Deletes a person field.",
  },
  performSafety: "notAllowed",
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
  examplePayload: deletePersonFieldV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePersonFieldV2OutputSchema,
  }),
});
