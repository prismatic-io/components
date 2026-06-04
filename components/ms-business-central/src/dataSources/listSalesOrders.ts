import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { MultipleItemsResponse, SalesOrder } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const listSalesOrders = dataSource({
  display: {
    label: "Select Sales Orders",
    description: "A picklist of sales orders objects in your Business Central organization.",
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<SalesOrder[]>>(
      `/companies(${companyId})/salesOrders`,
    );

    return {
      result: toSortedPicklist(data.value, (so) => ({
        key: so.id,
        label: so.number,
      })),
    };
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "SO-001", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
