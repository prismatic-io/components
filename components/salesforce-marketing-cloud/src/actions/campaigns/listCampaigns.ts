import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CAMPAIGNS_PATH } from "../../constants";
import { listCampaignsExamplePayload } from "../../examplePayloads";
import { listCampaignsInputs } from "../../inputs";
import { paginateResults } from "../../util/pagination";

export const listCampaigns = action({
  examplePayload: listCampaignsExamplePayload,
  display: {
    label: "List Campaigns",
    description: "List campaigns with optional pagination.",
  },
  inputs: listCampaignsInputs,
  perform: async (context, { connection, fetchAll, pageSize, page }) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $pageSize: pageSize,
      $page: page,
    };

    const data = await paginateResults(
      client,
      CAMPAIGNS_PATH,
      fetchAll,
      params,
    );

    return { data };
  },
});
