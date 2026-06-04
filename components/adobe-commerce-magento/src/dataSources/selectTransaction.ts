import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { connectionInput } from "../inputs";

export const selectTransaction = dataSource({
  display: {
    label: "Select Transaction",
    description: "A picklist of transactions in your Adobe Commerce store.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    try {
      const {
        data: {
          data: { items },
        },
      } = await client.get<{
        data: {
          items: {
            transaction_id: number;
            txn_id: string;
            txn_type: string;
            order_id: number;
          }[];
        };
      }>("/transactions", {
        params: {
          "searchCriteria[pageSize]": "100",
        },
      });

      return {
        result: (items || [])
          .map<Element>((item) => ({
            label: `${item.txn_id} (${item.txn_type} - Order #${item.order_id})`,
            key: item.transaction_id.toString(),
          }))
          .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "txn-abc123 (capture - Order #1)",
        key: "1",
      },
    ],
  },
});
