import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getRequirementFileAssociationExamplePayload } from "../../examplePayloads";
import { getRequirementFileAssociationInputs } from "../../inputs";
import { requirementFileAssociationSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getRequirementFileAssociation = action({
  display: {
    label: "Get Requirement File Association",
    description: "Get a specific file association for a requirement.",
  },
  inputs: getRequirementFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementFileAssociationSchema,
  }),
  examplePayload: getRequirementFileAssociationExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/files/${params.fileAssociationGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Get Requirement File Association",
      );
    }
  },
});
