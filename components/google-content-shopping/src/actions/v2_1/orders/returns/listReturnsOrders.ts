import { action } from "@prismatic-io/spectral";
import type { content_v2_1 } from "googleapis";
import { createClient } from "../../../../client";
import { listOrderReturnsExamplePayload } from "../../../../examplePayloads/v2_1";
import { listReturnsOrdersInputs } from "../../../../inputs/v2_1";
import { fetchAllOrderReturns } from "../../../../util/fetchAllOrderReturns";
export const listReturnsOrders = action({
  display: {
    label: "List Orders Returns (Legacy v2.1)",
    description: "Lists order returns in the Merchant Center account.",
  },
  inputs: listReturnsOrdersInputs,
  perform: async (
    context,
    {
      connectionInput,
      merchantId,
      pagination,
      orderBy,
      createdStartDate,
      createdEndDate,
      shipmentTypes,
      shipmentStatus,
      shipmentStates,
      acknowledged,
      googleOrderIds,
      shipmentTrackingNumbers,
      fetchAll,
    },
  ) => {
    context.logger.warn(
      "'List Orders Returns' is deprecated as Google is retiring the Orders endpoints in the Content API.",
    );
    const client = createClient(connectionInput);
    const params: content_v2_1.Params$Resource$Orderreturns$List = {
      merchantId,
      maxResults: pagination.maxResults,
      orderBy,
      createdStartDate,
      createdEndDate,
      pageToken: pagination.pageToken,
      shipmentTypes,
      shipmentStatus,
      shipmentStates,
      acknowledged: acknowledged || undefined,
      googleOrderIds,
      shipmentTrackingNumbers,
    };
    const { data } = await fetchAllOrderReturns({ client, fetchAll, params });
    return {
      data,
    };
  },
  examplePayload: listOrderReturnsExamplePayload,
});
