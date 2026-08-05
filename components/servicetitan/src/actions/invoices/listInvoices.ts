import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listInvoicesExamplePayload } from "../../examplePayloads";
import { listInvoicesInputs } from "../../inputs";
import type { Invoice } from "../../types";
import { fetchAllRecords } from "../../util";
export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "Retrieves a list of invoices",
  },
  inputs: listInvoicesInputs,
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
  examplePayload: listInvoicesExamplePayload,
});
