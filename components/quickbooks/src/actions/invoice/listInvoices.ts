import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { listInvoicesExamplePayload as examplePayload } from "../../examplePayloads/invoices";
import {
  connectionInput,
  fetchAll,
  maxResults,
  startPosition,
} from "../../inputs";
import type { PaginatedDataRequest } from "../../types";
import { paginatedData } from "../../util";

export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "Retrieve a list of all Invoices.",
  },
  perform: async (
    context,
    { quickbooksConnection, fetchAll, startPosition, maxResults },
  ) => {
    const client = createHttpClient(
      quickbooksConnection,
      context.debug.enabled,
    );

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from Invoice",
      objectName: "Invoice",
      fetchAll,
      params: { startPosition, maxResults },
    };

    const data = await paginatedData(request);
    return {
      data,
    };
  },
  inputs: {
    fetchAll,
    maxResults,
    startPosition,
    quickbooksConnection: connectionInput,
  },
  examplePayload,
});
