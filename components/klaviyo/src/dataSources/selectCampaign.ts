import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectCampaignInputs } from "../inputs";
import { selectCampaignExamplePayload } from "../examplePayloads";
import { getApi } from "../api";
import { fetchCampaigns } from "../util";
import { KlaviyoApi } from "../constants";
export const selectCampaign = dataSource({
  display: {
    label: "Select Campaign",
    description: "Select a campaign to use.",
  },
  inputs: selectCampaignInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const campaignsApi = getApi(connection, KlaviyoApi.Campaigns);
    const data = await fetchCampaigns(
      campaignsApi,
      ["name"],
      "equals(messages.channel,'email')",
      [],
      undefined,
    );
    const objects = data.data.map<Element>((response) => ({
      key: response.id,
      label: response.attributes.name,
    }));
    return { result: objects };
  },
  examplePayload: selectCampaignExamplePayload,
});
