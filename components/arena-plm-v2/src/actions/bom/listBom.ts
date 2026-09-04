import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listBomExamplePayload } from "../../examplePayloads";
import { listBomInputs } from "../../inputs";
import { listBomOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listBom = action({
  display: {
    label: "List BOM",
    description:
      "Retrieve the BOM (Bill of Materials) collection for an item in Arena PLM system.",
  },
  inputs: listBomInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBomOutputSchema,
  }),
  examplePayload: listBomExamplePayload,
  perform: async (
    context,
    { connection, itemGuid, includeAdditionalAttributes },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        ...(includeAdditionalAttributes && { includeAdditionalAttributes }),
      };
      context.logger.info(`Fetching BOM for item ${itemGuid}`, {
        itemGuid,
        queryParamNames: Object.keys(queryParams),
      });
      const { data } = await client.get(`/items/${itemGuid}/bom`, {
        params: queryParams,
      });
      context.logger.info(
        `Successfully retrieved BOM with ${data?.count || 0} lines`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List BOM");
    }
  },
});
