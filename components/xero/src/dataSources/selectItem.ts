import { dataSource, type Element } from "@prismatic-io/spectral";
import { getXeroClient } from "../client";
import { connectionInput } from "../inputs";
import { type Item } from "../interfaces/Item";
import { type XeroResponse } from "../interfaces/XeroResponse";

export const selectItem = dataSource({
  display: {
    label: "Select Item",
    description: "Select an item from the list",
  },
  inputs: { xeroConnection: connectionInput },
  dataSourceType: "picklist",
  perform: async (context, { xeroConnection }) => {
    const client = await getXeroClient(xeroConnection, false);
    const { data } = await client.get<XeroResponse<Item, "Items">>("/items");

    const result = (data.Items || []).map<Element>((item) => ({
      label: item.Name,
      key: item.ItemID,
    }));
    return { result };
  },
});
