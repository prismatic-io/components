import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessTemplatesExamplePayload } from "../../examplePayloads";
import { listQualityProcessTemplatesInputs } from "../../inputs";
import { listQualityProcessTemplatesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityProcessTemplates = action({
  display: {
    label: "List Quality Process Templates",
    description:
      "List all quality process templates from Arena PLM system with optional filtering.",
  },
  inputs: listQualityProcessTemplatesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listQualityProcessTemplatesOutputSchema,
  }),
  examplePayload: listQualityProcessTemplatesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = { name: params.name, active: params.active };
      const { data } = await client.get(
        "/settings/qualityprocesses/templates",
        {
          params: queryParams,
        },
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Quality Process Templates");
    }
  },
});
