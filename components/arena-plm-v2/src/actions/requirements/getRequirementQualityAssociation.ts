import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getRequirementQualityAssociationExamplePayload } from "../../examplePayloads";
import { getRequirementQualityAssociationInputs } from "../../inputs";
import { referencedQualitySchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getRequirementQualityAssociation = action({
  display: {
    label: "Get Requirement Quality Association",
    description:
      "Get details of a specific quality process linked to a requirement.",
  },
  inputs: getRequirementQualityAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: referencedQualitySchema,
  }),
  examplePayload: getRequirementQualityAssociationExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/quality/${params.associationGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Get Requirement Quality Association",
      );
    }
  },
});
