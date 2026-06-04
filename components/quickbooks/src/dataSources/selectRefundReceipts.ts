import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { selectRefundReceiptExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { PaginatedDataRequest } from "../types";
import { paginatedData } from "../util";

export const selectRefundReceipt = dataSource({
  display: {
    label: "Select Refund Receipt",
    description: "Select a Refund Receipt from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createHttpClient(connectionInput, true);

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from RefundReceipt",
      objectName: "RefundReceipt",
      fetchAll: true,
    };

    const data = await paginatedData(request);

    const objects = data.map<Element>((refundReceipt) => ({
      key: refundReceipt.Id.toString(),
      label: refundReceipt.DocNumber as string,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectRefundReceiptExamplePayload,
});
