import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { getItemInputs } from "../../inputs";
import { getItemExamplePayload } from "../../examplePayloads";

export const getItem = action({
  display: {
    label: "Get Item",
    description: "Retrieve the information and metadata of an item by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/items/${params.itemId}`);
    return { data };
  },
  inputs: getItemInputs,
  examplePayload: getItemExamplePayload,
});
