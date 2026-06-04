import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { company, connection, site } from "../inputs/general";

export const selectCustomerDeliveryAddress = dataSource({
  display: {
    label: "Select Customer Delivery Address",
    description: "Select a customer delivery address from a dropdown list.",
  },
  perform: async (_context, { connection, site, company }) => {
    const client = getClient(connection, false, site, company);
    const { data } = await client.get<{ id: number; description: string; postal_name: string }[]>(
      "/customer_delivery_addresses",
    );

    const objects = data.map<Element>((address) => ({
      key: util.types.toString(address.id),
      label: address.postal_name
        ? `${address.description} (${address.postal_name})`
        : address.description,
    }));

    return {
      result: objects.sort((a, b) => (a.label ?? "").localeCompare(b.label ?? "")),
    };
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: {
    result: [
      {
        label: "Registered address (A1 Design Services)",
        key: "27927",
      },
    ],
  },
});
