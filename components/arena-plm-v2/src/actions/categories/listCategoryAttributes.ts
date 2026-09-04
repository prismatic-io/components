import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listCategoryAttributesExamplePayload } from "../../examplePayloads";
import { listCategoryAttributesInputs } from "../../inputs";
import { categoryAttributeDefinitionListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listCategoryAttributes = action({
  display: {
    label: "List Category Attributes",
    description:
      "Get attributes for a specific category and object type in Arena PLM system with optional filtering.",
  },
  inputs: listCategoryAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: categoryAttributeDefinitionListSchema,
  }),
  examplePayload: listCategoryAttributesExamplePayload,
  perform: async (
    context,
    {
      connection,
      objectType,
      categoryGuid,
      includePossibleValues,
      creatableOnly,
      editableOnly,
      searchableOnly,
      user,
      action,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        includePossibleValues,
        creatableOnly,
        editableOnly,
        searchableOnly,
        user,
        action,
      };
      context.logger.info("Fetching category attributes from Arena", {
        objectType,
        categoryGuid,
        queryParamNames: Object.keys(queryParams),
      });
      const { data } = await client.get(
        `/settings/${objectType}/categories/${categoryGuid}/attributes`,
        {
          params: queryParams,
        },
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} category attributes`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Category Attributes");
    }
  },
});
