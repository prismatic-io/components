import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { listPurchaseOrdersExamplePayload as examplePayload } from "../../examplePayloads/purchaseOrders";
import {
  connectionInput,
  fetchAll,
  maxResults,
  startPosition,
} from "../../inputs";
import type { PaginatedDataRequest } from "../../types";
import { paginatedData } from "../../util";

export const listPurchaseOrders = action({
  display: {
    label: "List Purchase Orders",
    description: "Retrieve a list of all Purchase Orders.",
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
      queryString: "select * from PurchaseOrder",
      objectName: "PurchaseOrder",
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
