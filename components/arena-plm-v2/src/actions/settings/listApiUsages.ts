import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listApiUsagesExamplePayload } from "../../examplePayloads";
import { listApiUsagesInputs } from "../../inputs";
import { listApiUsagesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listApiUsages = action({
  display: {
    label: "List API Usage",
    description: "Get API usage information from Arena PLM system.",
  },
  inputs: listApiUsagesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listApiUsagesOutputSchema,
  }),
  examplePayload: listApiUsagesExamplePayload,
  perform: async (
    context,
    { connection, dateTimeFrom, dateTimeTo, pagination = {}, fetchAll },
  ) => {
    try {
      context.logger.info("Getting API usage information");
      const client = await createArenaClient(context, connection);
      const params = {
        dateTimeFrom,
        dateTimeTo,
        limit: pagination.limit,
        offset: pagination.offset,
      };
      const data = await fetchArenaList(
        client,
        "/settings/recentactivities/apiusages",
        params,
        fetchAll,
      );
      context.logger.info("Retrieved API usage information");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List API Usage");
    }
  },
});
