import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getExtractExamplePayload } from "../../examplePayloads";
import { getExtractInputs } from "../../inputs";
import { extractSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getExtract = action({
  display: {
    label: "Get Extract",
    description: "Get details of a specific extract definition.",
  },
  inputs: getExtractInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: extractSchema,
  }),
  examplePayload: getExtractExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(`/extracts/${params.extractGuid}`);
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Extract");
    }
  },
});
