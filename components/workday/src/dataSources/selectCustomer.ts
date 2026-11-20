import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectCustomerExamplePayload } from "../examplePayloads";
import { selectCustomerInputs } from "../inputs";
import type { CustomerSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "A picklist of customers in the Workday tenant.",
  },
  inputs: selectCustomerInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.customerAccounts}/customers`,
      fetchAll: true,
    });

    return {
      result: toSortedPicklist(data as CustomerSummary[], (item) => ({
        key: item.id,
        label: item.descriptor || item.name || item.Customer_ID || item.id,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectCustomerExamplePayload,
});
