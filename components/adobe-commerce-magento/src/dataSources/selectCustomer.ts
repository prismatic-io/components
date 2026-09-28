import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { DEFAULT_PAGE_SIZE, ENDPOINTS } from "../constants";
import { selectCustomerExamplePayload } from "../examplePayloads";
import { selectCustomerInputs } from "../inputs";
import { toSortedElements } from "../utils";
export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "A picklist of customers in the Adobe Commerce store.",
  },
  inputs: selectCustomerInputs,
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    const { data } = await client.get<{
      items: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
      }[];
    }>(ENDPOINTS.customerSearch, {
      params: {
        "searchCriteria[pageSize]": DEFAULT_PAGE_SIZE,
      },
    });
    return {
      result: toSortedElements(data?.items, (item) => ({
        label: `${item.firstname} ${item.lastname} (${item.email})`,
        key: item.id.toString(),
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectCustomerExamplePayload,
});
