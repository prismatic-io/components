import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listFileAttributesExamplePayload } from "../../examplePayloads";
import { listFileAttributesInputs } from "../../inputs";
import { attributeDefinitionFullRepListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listFileAttributes = action({
  display: {
    label: "List File Attributes",
    description:
      "Get all attributes for files in Arena PLM system with optional filtering.",
  },
  inputs: listFileAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeDefinitionFullRepListSchema,
  }),
  examplePayload: listFileAttributesExamplePayload,
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
      context.logger.info("Fetching file attributes from Arena", {
        queryParamNames: Object.keys(queryParams),
      });
      const { data } = await client.get("/settings/files/attributes", {
        params: queryParams,
      });
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} file attributes`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List File Attributes");
    }
  },
});
