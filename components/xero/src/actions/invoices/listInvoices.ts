import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import {
  page,
  connectionInput,
  where,
  modifiedAfter,
  fetchAll,
} from "../../inputs";
import { fetchAllData } from "../../util";
import { type Invoice } from "../../interfaces/Invoice";
import { listInvoicesExamplePayload } from "../../examplePayloads";

export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "List all invoices",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const data = await fetchAllData<Invoice, "Invoices">({
      client,
      path: "/invoices",
      key: "Invoices",
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
  examplePayload: listInvoicesExamplePayload as any,
});
