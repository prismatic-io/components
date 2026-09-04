import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestsExamplePayload } from "../../examplePayloads";
import { listRequestsInputs } from "../../inputs";
import { listRequestsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listRequests = action({
  display: {
    label: "List Requests",
    description:
      "Search for requests in Arena PLM system using filters like number, title, or status.",
  },
  inputs: listRequestsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequestsOutputSchema,
  }),
  examplePayload: listRequestsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        number: params.number,
        title: params.title,
        resolutionCode: params.resolutionCode,
        requestCode: params.requestCode,
        "lifecycleStatus.type": params.lifecycleStatus,
        deferralCode: params.deferralCode,
        "creator.guid": params.creatorGuid,
        "category.guid": params.categoryGuid,
        includeChildCategories: params.includeChildCategories,
        offset: params.pagination?.offset,
        limit: params.pagination?.limit,
      };
      const url = "/requests";
      context.logger.info("Fetching requests from Arena");
      const data = await fetchArenaList(
        client,
        url,
        queryParams,
        params.fetchAll,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} requests`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Requests");
    }
  },
});
