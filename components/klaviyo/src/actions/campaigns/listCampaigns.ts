import { action } from "@prismatic-io/spectral";
import { listCampaignsInputs as inputs } from "../../inputs/campaigns";
import { getApi } from "../../api";
import type { FieldsCampaign } from "../../types/FieldsCampaign";
import { fetchCampaigns } from "../../utils";
import { listCampaignsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const listCampaigns = action({
  display: {
    label: "List Campaigns",
    description: "Returns some or all campaigns based on filters.",
  },
  perform: async (context, { connection, filterCampaigns, fieldsCampaign }) => {
    const campaignsApi = getApi(connection, KlaviyoApi.Campaigns);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        filterCampaigns,
        fieldsCampaign,
        debug,
      });
    }
    const data = await fetchCampaigns(
      campaignsApi,
      fieldsCampaign as FieldsCampaign[],
      filterCampaigns!,
      [],
      undefined,
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload: listCampaignsExamplePayload,
});
