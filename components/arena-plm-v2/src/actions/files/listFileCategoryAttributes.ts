import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listFileCategoryAttributesExamplePayload } from "../../examplePayloads";
import { listFileCategoryAttributesInputs } from "../../inputs";
import { categoryAttributeDefinitionListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listFileCategoryAttributes = action({
  display: {
    label: "List File Category Attributes",
    description:
      "Get attributes for a specific file category in Arena PLM system with optional filtering.",
  },
  inputs: listFileCategoryAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: categoryAttributeDefinitionListSchema,
  }),
  examplePayload: listFileCategoryAttributesExamplePayload,
  perform: async (
    context,
    {
      connection,
      categoryGuid,
      includePossibleValues,
      creatableOnly,
      editableOnly,
      searchableOnly,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        includePossibleValues,
        creatableOnly,
        editableOnly,
        searchableOnly,
      };
      context.logger.info("Fetching file category attributes from Arena", {
        categoryGuid,
        queryParamNames: Object.keys(queryParams),
      });
      const { data } = await client.get(
        `/settings/files/categories/${categoryGuid}/attributes`,
        {
          params: queryParams,
        },
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} file category attributes`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List File Category Attributes");
    }
  },
});
