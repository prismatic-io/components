import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPaymentsExamplePayload } from "../../examplePayloads";
import { listPaymentsInputs } from "../../inputs";
import type { Payment } from "../../types";
import { fetchAllRecords } from "../../util";
export const listPayments = action({
  display: {
    label: "List Payments",
    description: "Retrieve a list of payments",
  },
  inputs: listPaymentsInputs,
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
  ) => {
    const client = createClient(
      connection,
      "accounting",
      context.debug.enabled,
    );
    if (fetchAll) {
      const data = await fetchAllRecords<Payment>(client, "/payments", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/payments`, {
      params: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listPaymentsExamplePayload,
});
