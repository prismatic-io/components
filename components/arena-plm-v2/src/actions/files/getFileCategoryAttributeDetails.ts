import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getFileCategoryAttributeDetailsExamplePayload } from "../../examplePayloads";
import { getFileCategoryAttributeDetailsInputs } from "../../inputs";
import { categoryAttributeDefinitionSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getFileCategoryAttributeDetails = action({
  display: {
    label: "Get File Category Attribute Details",
    description:
      "Get details of a specific attribute in a category in Arena PLM system.",
  },
  inputs: getFileCategoryAttributeDetailsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: categoryAttributeDefinitionSchema,
  }),
  examplePayload: getFileCategoryAttributeDetailsExamplePayload,
  perform: async (
    context,
    { connection, objectType, categoryGuid, attributeDefinitionGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Fetching category attribute details from Arena", {
        objectType,
        categoryGuid,
        attributeDefinitionGuid,
      });
      const { data } = await client.get(
        `/settings/${objectType}/categories/${categoryGuid}/attributes/${attributeDefinitionGuid}`,
      );
      context.logger.info("Successfully retrieved category attribute details");
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Get File Category Attribute Details",
      );
    }
  },
});
