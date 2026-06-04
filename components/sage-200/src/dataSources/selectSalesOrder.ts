import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { company, connection, site } from "../inputs/general";

export const selectSalesOrder = dataSource({
  display: {
    label: "Select Sales Order",
    description: "Select a sales order from a dropdown list.",
  },
  perform: async (_context, { connection, site, company }) => {
    const client = getClient(connection, false, site, company);
    const { data } = await client.get<{ id: number; document_no: string }[]>("/sop_orders");

    const objects = data.map<Element>((order) => ({
      key: util.types.toString(order.id),
      label: order.document_no,
    }));

    return { result: objects.sort((a, b) => (a.label ?? "").localeCompare(b.label ?? "")) };
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: {
    result: [{ label: "0000000001", key: "38294" }],
  },
});
