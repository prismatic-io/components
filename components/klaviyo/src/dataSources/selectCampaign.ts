import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getApi } from "../api";
import { fetchCampaigns } from "../utils";
import { KlaviyoApi } from "../enums/KlaviyoApi";

export const selectCampaign = dataSource({
  display: {
    label: "Select Campaign",
    description: "Select a campaign to use.",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
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
});
