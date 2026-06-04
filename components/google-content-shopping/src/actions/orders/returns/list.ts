import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  merchantId,
  maxResults,
  pageToken,
  orderBy,
  acknowledged,
  createdStartDate,
  createdEndDate,
  shipmentTypes,
  shipmentStatus,
  shipmentStates,
  googleOrderIds,
  shipmentTrackingNumbers,
  fetchAll,
} from "../../../inputs";
import { fetchAllOrderReturns } from "../../../helpers/fetchAllOrderReturns";
import type { content_v2_1 } from "googleapis";
import { listOrderReturnsExamplePayload } from "../../../examplePayloads";

export const listReturnsOrders = action({
  display: {
    label: "List Orders Returns (Deprecated)",
    description:
      "Lists order returns in your Merchant Center account. " +
      "This action is deprecated as Google is retiring the Orders endpoints in the Content API.",
  },
  inputs: {
    connectionInput,
    merchantId,
    maxResults,
    orderBy,
    createdStartDate,
    createdEndDate,
    pageToken,
    shipmentTypes,
    shipmentStatus,
    shipmentStates,
    acknowledged,
    googleOrderIds,
    shipmentTrackingNumbers,
    fetchAll,
  },
  perform: async (
    context,
    {
      connectionInput,
      merchantId,
      maxResults,
      orderBy,
      createdStartDate,
      createdEndDate,
      pageToken,
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
      "'List Orders Returns' is deprecated. Google is retiring the Orders endpoints in the Content API.",
    );

    const client = createClient(connectionInput);

    const params: content_v2_1.Params$Resource$Orderreturns$List = {
      merchantId,
      maxResults: maxResults || undefined,
      orderBy: orderBy || undefined,
      createdStartDate: createdStartDate || undefined,
      createdEndDate: createdEndDate || undefined,
      pageToken: pageToken || undefined,
      shipmentTypes: shipmentTypes || undefined,
      shipmentStatus: shipmentStatus || undefined,
      shipmentStates: shipmentStates || undefined,
      acknowledged: acknowledged || undefined,
      googleOrderIds: googleOrderIds || undefined,
      shipmentTrackingNumbers: shipmentTrackingNumbers || undefined,
    };

    const { data } = await fetchAllOrderReturns({ client, fetchAll, params });

    return {
      data,
    };
  },
  examplePayload: listOrderReturnsExamplePayload,
});
