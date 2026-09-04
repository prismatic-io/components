import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeCategoryItemAttributesExamplePayload } from "../../examplePayloads";
import { listChangeCategoryItemAttributesInputs } from "../../inputs";
import { attributeDefinitionFullRepListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeCategoryItemAttributes = action({
  display: {
    label: "List Change Category Item Attributes",
    description:
      "List item attributes for a specific change category in Arena PLM system with optional filtering.",
  },
  inputs: listChangeCategoryItemAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeDefinitionFullRepListSchema,
  }),
  examplePayload: listChangeCategoryItemAttributesExamplePayload,
  perform: async (
    context,
    {
      connection,
      categoryGuid,
      includePossibleValues,
      creatableOnly,
      editableOnly,
      searchableOnly,
      includeDeleted,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        includePossibleValues,
        creatableOnly,
        editableOnly,
        searchableOnly,
        includeDeleted,
      };
      context.logger.info(
        "Fetching change category item attributes from Arena",
        {
          categoryGuid,
          queryParamNames: Object.keys(queryParams),
        },
      );
      const { data } = await client.get(
        `/settings/changes/categories/${categoryGuid}/items/attributes`,
        {
          params: queryParams,
        },
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} item attributes for change category ${categoryGuid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "List Change Category Item Attributes",
      );
    }
  },
});
