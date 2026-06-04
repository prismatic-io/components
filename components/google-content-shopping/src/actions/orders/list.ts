import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  merchantId,
  maxResults,
  pageToken,
  statuses,
  placedDateStart,
  placedDateEnd,
  orderBy,
  acknowledged,
  fetchAll,
} from "../../inputs";
import { fetchAllOrders } from "../../helpers/fetchAllOrders";
import type { content_v2_1 } from "googleapis";
import { listOrdersExamplePayload } from "../../examplePayloads";

export const listOrders = action({
  display: {
    label: "List Orders (Deprecated)",
    description:
      "Lists the orders in your Merchant Center account. " +
      "This action is deprecated as Google is retiring the Orders endpoints in the Content API.",
  },
  inputs: {
    connectionInput,
    merchantId,
    maxResults,
    pageToken,
    statuses,
    placedDateStart,
    placedDateEnd,
    orderBy,
    acknowledged,
    fetchAll,
  },
  perform: async (
    context,
    {
      connectionInput,
      merchantId,
      maxResults,
      pageToken,
      statuses,
      placedDateStart,
      placedDateEnd,
      orderBy,
      acknowledged,
      fetchAll,
    },
  ) => {
    context.logger.warn(
      "'List Orders' is deprecated. Google is retiring the Orders endpoints in the Content API.",
    );

    const client = createClient(connectionInput);

    const params: content_v2_1.Params$Resource$Orders$List = {
      merchantId,
      maxResults: maxResults || undefined,
      pageToken: pageToken || undefined,
      placedDateStart: placedDateStart || undefined,
      placedDateEnd: placedDateEnd || undefined,
      orderBy: orderBy || undefined,
      acknowledged: acknowledged || undefined,
      statuses: statuses || undefined,
    };

    const { data } = await fetchAllOrders({ client, fetchAll, params });

    return {
      data,
    };
  },
  examplePayload: listOrdersExamplePayload,
});
