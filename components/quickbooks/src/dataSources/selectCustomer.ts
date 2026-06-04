import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { selectCustomerExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { PaginatedDataRequest } from "../types";
import { paginatedData } from "../util";

export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "Select a Customer from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createHttpClient(connectionInput, true);

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from Customer",
      objectName: "Customer",
      fetchAll: true,
    };

    const data = await paginatedData(request);

    const objects = data.map<Element>((customer) => ({
      key: customer.Id.toString(),
      label: customer.DisplayName as string,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectCustomerExamplePayload,
});
