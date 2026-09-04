import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementFilesExamplePayload } from "../../examplePayloads";
import { listRequirementFilesInputs } from "../../inputs";
import { listRequirementFilesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequirementFiles = action({
  display: {
    label: "List Requirement Files",
    description: "Get all file associations for a requirement.",
  },
  inputs: listRequirementFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequirementFilesOutputSchema,
  }),
  examplePayload: listRequirementFilesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/files`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Requirement Files");
    }
  },
});
