import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CAMPAIGNS_PATH } from "../../constants";
import { listCampaignsExamplePayload } from "../../examplePayloads";
import { listCampaignsInputs } from "../../inputs";
import { listCampaignsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";
export const listCampaigns = action({
  examplePayload: listCampaignsExamplePayload,
  display: {
    label: "List Campaigns",
    description: "List campaigns with optional pagination.",
  },
  inputs: listCampaignsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCampaignsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $pageSize: pagination.pageSize,
      $page: pagination.page,
    };
    const data = await paginateResults(
      client,
      CAMPAIGNS_PATH,
      fetchAll,
      params,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listCampaignsExamplePayload.data,
  }),
});
