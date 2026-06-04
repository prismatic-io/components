import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { itemId, connectionInput } from "../../inputs";
import { getItemHistoryExamplePayload } from "../../examplePayloads";

export const getItemHistory = action({
  display: {
    label: "Get Item History",
    description: "Get the information and metadata of an items's history by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/items/${params.itemId}/history`);
    return { data };
  },
  inputs: { itemId, xeroConnection: connectionInput },

  examplePayload: getItemHistoryExamplePayload,
});
