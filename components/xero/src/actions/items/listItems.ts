import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { connectionInput, modifiedAfter, where } from "../../inputs";
import { type XeroResponse } from "../../interfaces/XeroResponse";
import { type Item } from "../../interfaces/Item";
import { listItemsExamplePayload } from "../../examplePayloads";

export const listItems = action({
  display: {
    label: "List Items",
    description: "List all items",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get<XeroResponse<Item, "Items">>("/items", {
      headers: {
        "If-Modified-Since": util.types.toString(params.modifiedAfter),
      },
      params: {
        where: util.types.toString(params.where) || undefined,
      },
    });
    return { data };
  },
  inputs: { xeroConnection: connectionInput, modifiedAfter, where },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  examplePayload: listItemsExamplePayload as any,
});
