import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listBomAttributesExamplePayload } from "../../examplePayloads";
import { listBomAttributesInputs } from "../../inputs";
import { attributeDefinitionFullRepListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listBomAttributes = action({
  display: {
    label: "List BOM Attributes",
    description:
      "List all attributes for item BOM in Arena PLM system with optional filtering.",
  },
  inputs: listBomAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeDefinitionFullRepListSchema,
  }),
  examplePayload: listBomAttributesExamplePayload,
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
      context.logger.info("Fetching BOM attributes from Arena", {
        queryParamNames: Object.keys(queryParams),
      });
      const { data } = await client.get("/settings/items/bom/attributes", {
        params: queryParams,
      });
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} BOM attributes`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List BOM Attributes");
    }
  },
});
