import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { MultipleItemsResponse, SalesInvoice } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const listSalesInvoices = dataSource({
  display: {
    label: "Select Sales Invoices",
    description: "A picklist of sales invoices objects in your Business Central organization.",
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<SalesInvoice[]>>(
      `/companies(${companyId})/salesInvoices`,
    );

    return {
      result: toSortedPicklist(data.value, (si) => ({
        key: si.id,
        label: si.number,
      })),
    };
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "SI-001", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
