import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPaymentsResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { Payment } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listPayments = action({
  display: {
    label: "List Payments",
    description: "Retrieve a list of payments",
  },
  inputs: {
    connection,
    fetchAll,
    page,
    pageSize,
    includeTotal,
    sort,
    customQueryParams,
  },
  perform: async (
    context,
    {
      connection,
      page,
      pageSize,
      includeTotal,
      sort,
      customQueryParams,
      fetchAll,
    },
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
        page,
        pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listPaymentsResponse,
  },
});
