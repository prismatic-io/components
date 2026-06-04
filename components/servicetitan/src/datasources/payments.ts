import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import type { Payment } from "../interfaces";

export const selectPayment = dataSource({
  display: {
    label: "Select Payment",
    description:
      "Select a payment from a dropdown menu (up to 10,000 payments)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "accounting");
    let payments: Payment[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/payments`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      payments = [...payments, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    const objects = payments
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((payment) => ({
        key: payment.id.toString(),
        label: `#${payment.id} - ${payment.type}`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "#12345 - Check", key: "12345" }],
  },
});
