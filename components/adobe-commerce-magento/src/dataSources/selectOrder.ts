import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { DEFAULT_PAGE_SIZE, ENDPOINTS } from "../constants";
import { selectOrderExamplePayload } from "../examplePayloads";
import { selectOrderInputs } from "../inputs";
import { toSortedElements } from "../utils";
export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "A picklist of orders in the Adobe Commerce store.",
  },
  inputs: selectOrderInputs,
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    const { data } = await client.get<{
      items: {
        entity_id: number;
        increment_id: string;
        grand_total: number;
        status: string;
      }[];
    }>(ENDPOINTS.orders, {
      params: {
        "searchCriteria[pageSize]": DEFAULT_PAGE_SIZE,
      },
    });
    return {
      result: toSortedElements(data?.items, (item) => ({
        label: `#${item.increment_id} - ${item.status} ($${item.grand_total})`,
        key: item.entity_id.toString(),
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectOrderExamplePayload,
});
