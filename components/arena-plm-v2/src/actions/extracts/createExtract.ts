import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createExtractExamplePayload } from "../../examplePayloads";
import { createExtractInputs } from "../../inputs";
import { createExtractOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createExtract = action({
  display: {
    label: "Create Extract",
    description: "Create a new extract definition.",
  },
  inputs: createExtractInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createExtractOutputSchema,
  }),
  examplePayload: createExtractExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.post("/extracts", params.extractData);
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create Extract");
    }
  },
});
