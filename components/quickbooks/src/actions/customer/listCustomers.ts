import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { listCustomersExamplePayload as examplePayload } from "../../examplePayloads/customers";
import {
  connectionInput,
  fetchAll,
  maxResults,
  startPosition,
} from "../../inputs";
import type { PaginatedDataRequest } from "../../types";
import { paginatedData } from "../../util";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Retrieve a list of all Customers.",
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
      queryString: "select * from Customer",
      objectName: "Customer",
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
