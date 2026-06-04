import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listInvoiceResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { Invoice } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "Retrieves a list of invoices",
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
      const data = await fetchAllRecords<Invoice>(client, "/invoices", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/invoices`, {
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
    data: listInvoiceResponse,
  },
});
