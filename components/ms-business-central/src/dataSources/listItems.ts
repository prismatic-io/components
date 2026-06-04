import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../inputs/general";
import type { Item, MultipleItemsResponse } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const listItems = dataSource({
  display: {
    label: "Select Items",
    description: "A picklist of item objects in your Business Central organization.",
  },
  perform: async (context, { connection, companyId, $filter }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<Item[]>>(
      `/companies(${companyId})/items`,
      { params: { $select: "id,displayName", $filter } },
    );

    return {
      result: toSortedPicklist(data.value, (item) => ({
        key: item.id,
        label: item.displayName,
      })),
    };
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
    $filter: odataParams.$filter,
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "ATHENS Desk", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
