import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { selectPurchaseOrderExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { PaginatedDataRequest } from "../types";
import { paginatedData } from "../util";

export const selectPurchaseOrder = dataSource({
  display: {
    label: "Select Purchase Order",
    description: "Select a Purchase Order from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createHttpClient(connectionInput, true);

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from PurchaseOrder",
      objectName: "PurchaseOrder",
      fetchAll: true,
    };

    const data = await paginatedData(request);

    const objects = data.map<Element>((purchaseOrder) => ({
      key: purchaseOrder.Id.toString(),
      label: purchaseOrder.DocNumber as string,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectPurchaseOrderExamplePayload,
});
