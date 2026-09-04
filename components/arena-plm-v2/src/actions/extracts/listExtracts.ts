import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listExtractsExamplePayload } from "../../examplePayloads";
import { listExtractsInputs } from "../../inputs";
import { listExtractsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listExtracts = action({
  display: {
    label: "List Extracts",
    description:
      "Search for extract definitions using filters like name or creator.",
  },
  inputs: listExtractsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listExtractsOutputSchema,
  }),
  examplePayload: listExtractsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        name: params.name,
        enabled: params.enabled,
        "creator.fullName": params.creatorFullName,
        offset: params.pagination?.offset,
        limit: params.pagination?.limit,
      };
      context.logger.info("Fetching extracts from Arena");
      const data = await fetchArenaList(
        client,
        "/extracts",
        queryParams,
        params.fetchAll,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} extracts`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Extracts");
    }
  },
});
