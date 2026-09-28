import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { DEFAULT_PAGE_SIZE, ENDPOINTS } from "../constants";
import { selectTransactionExamplePayload } from "../examplePayloads";
import { selectTransactionInputs } from "../inputs";
import { toSortedElements } from "../utils";
export const selectTransaction = dataSource({
  display: {
    label: "Select Transaction",
    description: "A picklist of transactions in the Adobe Commerce store.",
  },
  inputs: selectTransactionInputs,
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    const { data } = await client.get<{
      items: {
        transaction_id: number;
        txn_id: string;
        txn_type: string;
        order_id: number;
      }[];
    }>(ENDPOINTS.transactions, {
      params: {
        "searchCriteria[pageSize]": DEFAULT_PAGE_SIZE,
      },
    });
    return {
      result: toSortedElements(data?.items, (item) => ({
        label: `${item.txn_id} (${item.txn_type} - Order #${item.order_id})`,
        key: item.transaction_id.toString(),
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectTransactionExamplePayload,
});
