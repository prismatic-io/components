import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementTemplatesExamplePayload } from "../../examplePayloads";
import { listRequirementTemplatesInputs } from "../../inputs";
import { listRequirementTemplatesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequirementTemplates = action({
  display: {
    label: "List Requirement Templates",
    description: "List all requirement templates.",
  },
  inputs: listRequirementTemplatesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequirementTemplatesOutputSchema,
  }),
  examplePayload: listRequirementTemplatesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = { name: params.name, active: params.active };
      const { data } = await client.get("/settings/requirements/templates", {
        params: queryParams,
      });
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Requirement Templates");
    }
  },
});
