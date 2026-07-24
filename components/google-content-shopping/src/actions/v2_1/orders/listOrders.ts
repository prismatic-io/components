import { action } from "@prismatic-io/spectral";
import type { content_v2_1 } from "googleapis";
import { createClient } from "../../../client";
import { listOrdersExamplePayload } from "../../../examplePayloads/v2_1";
import { listOrdersInputs } from "../../../inputs/v2_1";
import { fetchAllOrders } from "../../../util/fetchAllOrders";
export const listOrders = action({
  display: {
    label: "List Orders (Legacy v2.1)",
    description: "Lists the orders in the Merchant Center account.",
  },
  inputs: listOrdersInputs,
  perform: async (
    context,
    {
      connectionInput,
      merchantId,
      pagination,
      statuses,
      placedDateStart,
      placedDateEnd,
      orderBy,
      acknowledged,
      fetchAll,
    },
  ) => {
    context.logger.warn(
      "'List Orders' is deprecated as Google is retiring the Orders endpoints in the Content API.",
    );
    const client = createClient(connectionInput);
    const params: content_v2_1.Params$Resource$Orders$List = {
      merchantId,
      maxResults: pagination.maxResults,
      pageToken: pagination.pageToken,
      placedDateStart,
      placedDateEnd,
      orderBy,
      acknowledged: acknowledged || undefined,
      statuses,
    };
    const { data } = await fetchAllOrders({ client, fetchAll, params });
    return {
      data,
    };
  },
  examplePayload: listOrdersExamplePayload,
});
