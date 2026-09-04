import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { changeRequirementStatusExamplePayload } from "../../examplePayloads";
import { changeRequirementStatusInputs } from "../../inputs";
import { requirementSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const changeRequirementStatus = action({
  display: {
    label: "Change Requirement Status",
    description: "Change the status of a requirement.",
  },
  inputs: changeRequirementStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementSchema,
  }),
  examplePayload: changeRequirementStatusExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.post("/requirements/statuschanges", {
        requirement: { guid: params.requirementGuid },
        status: params.status,
      });
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Change Requirement Status");
    }
  },
});
