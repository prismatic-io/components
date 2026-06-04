import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import {
  page,
  connectionInput,
  modifiedAfter,
  where,
  fetchAll,
} from "../../inputs";

import { type Payment } from "../../interfaces/Payment";
import { fetchAllData } from "../../util";
import { listPaymentsExamplePayload } from "../../examplePayloads";
export const listPayments = action({
  display: {
    label: "List Payments",
    description: "List all payments",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const data = await fetchAllData<Payment, "Payments">({
      client,
      path: "/payments",
      key: "Payments",
      queryParams: {
        page: util.types.toInt(params.page) || undefined,
        where: util.types.toString(params.where) || undefined,
      },
      headers: {
        "If-Modified-Since": util.types.toString(params.modifiedAfter),
      },
      fetchAll: params.fetchAll,
    });
    return { data };
  },
  inputs: {
    xeroConnection: connectionInput,
    fetchAll,
    page,
    modifiedAfter,
    where,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  examplePayload: listPaymentsExamplePayload as any,
});
