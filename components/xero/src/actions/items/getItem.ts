import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { itemId, connectionInput } from "../../inputs";
import { getItemExamplePayload } from "../../examplePayloads";

export const getItem = action({
  display: {
    label: "Get Item",
    description: "Get the information and metadata of an item by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/items/${params.itemId}`);
    return { data };
  },
  inputs: { itemId, xeroConnection: connectionInput },
  examplePayload: getItemExamplePayload,
});
