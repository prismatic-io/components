import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { selectInvoiceExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { PaginatedDataRequest } from "../types";
import { paginatedData } from "../util";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "Select an Invoice from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createHttpClient(connectionInput, true);

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from Invoice",
      objectName: "Invoice",
      fetchAll: true,
    };

    const data = await paginatedData(request);

    const objects = data.map<Element>((invoice) => ({
      key: invoice.Id.toString(),
      label: invoice.DocNumber as string,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectInvoiceExamplePayload,
});
