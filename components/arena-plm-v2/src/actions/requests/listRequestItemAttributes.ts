import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestItemAttributesExamplePayload } from "../../examplePayloads";
import { listRequestItemAttributesInputs } from "../../inputs";
import { attributeDefinitionFullRepListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestItemAttributes = action({
  display: {
    label: "List Request Item Attributes",
    description:
      "List all attributes for request items with optional filtering.",
  },
  inputs: listRequestItemAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeDefinitionFullRepListSchema,
  }),
  examplePayload: listRequestItemAttributesExamplePayload,
  perform: async (
    context,
    {
      connection,
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
      context.logger.info("Fetching request item attributes from Arena", {
        queryParamNames: Object.keys(queryParams),
      });
      const { data } = await client.get("/settings/requests/items/attributes", {
        params: queryParams,
      });
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} request item attributes`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Item Attributes");
    }
  },
});
