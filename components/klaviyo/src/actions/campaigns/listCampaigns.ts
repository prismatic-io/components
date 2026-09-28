import { action, outputSchema } from "@prismatic-io/spectral";
import { listCampaignsOutputSchema } from "../../outputSchemas";
import { listCampaignsInputs as inputs } from "../../inputs";
import { getApi } from "../../api";
import { fetchCampaigns } from "../../util";
import { listCampaignsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsCampaign } from "../../types";
export const listCampaigns = action({
  display: {
    label: "List Campaigns",
    description: "Returns some or all campaigns based on filters.",
  },
  performSafety: "notAllowed",
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
      filterCampaigns,
      [],
      undefined,
    );
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCampaignsOutputSchema,
  }),
  examplePayload: listCampaignsExamplePayload,
});
