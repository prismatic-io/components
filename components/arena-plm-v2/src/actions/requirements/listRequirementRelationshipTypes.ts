import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementRelationshipTypesExamplePayload } from "../../examplePayloads";
import { listRequirementRelationshipTypesInputs } from "../../inputs";
import { listRequirementRelationshipTypesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequirementRelationshipTypes = action({
  display: {
    label: "List Requirement Relationship Types",
    description: "List all relationship types for requirements.",
  },
  inputs: listRequirementRelationshipTypesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequirementRelationshipTypesOutputSchema,
  }),
  examplePayload: listRequirementRelationshipTypesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        "/settings/requirements/relationshipTypes",
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Requirement Relationship Types",
      );
    }
  },
});
