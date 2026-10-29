import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { getItemHistoryInputs } from "../../inputs";
import { getItemHistoryExamplePayload } from "../../examplePayloads";

export const getItemHistory = action({
  display: {
    label: "Get Item History",
    description:
      "Retrieve the information and metadata of an item's history by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/items/${params.itemId}/history`);
    return { data };
  },
  inputs: getItemHistoryInputs,

  examplePayload: getItemHistoryExamplePayload,
});
