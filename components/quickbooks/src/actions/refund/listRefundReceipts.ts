import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { listRefundReceiptsExamplePayload as examplePayload } from "../../examplePayloads/refundReceipts";
import {
  connectionInput,
  fetchAll,
  maxResults,
  startPosition,
} from "../../inputs";
import type { PaginatedDataRequest } from "../../types";
import { paginatedData } from "../../util";

export const listRefundReceipts = action({
  display: {
    label: "List Refund Receipts",
    description: "Retrieve a list of all Refund Receipts.",
  },
  perform: async (
    context,
    { quickbooksConnection, fetchAll, startPosition, maxResults },
  ) => {
    const client = createHttpClient(
      quickbooksConnection,
      context.debug.enabled,
    );

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from RefundReceipt",
      objectName: "RefundReceipt",
      fetchAll,
      params: { startPosition, maxResults },
    };

    const data = await paginatedData(request);
    return {
      data,
    };
  },
  inputs: {
    fetchAll,
    maxResults,
    startPosition,
    quickbooksConnection: connectionInput,
  },
  examplePayload,
});
