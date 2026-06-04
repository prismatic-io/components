import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { MultipleItemsResponse, Vendor } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectVendor = dataSource({
  display: {
    label: "Select Vendor",
    description: "A picklist of vendors in your Business Central organization.",
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<Vendor[]>>(
      `/companies(${companyId})/vendors`,
    );

    return {
      result: toSortedPicklist(data.value, (vendor) => ({
        key: vendor.id,
        label: vendor.displayName,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "First Up Consultants", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
