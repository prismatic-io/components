import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listInvoicesExamplePayload } from "../../examplePayloads";
import { listInvoicesInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "Returns a list of invoices for a given location.",
  },
  perform: async (
    context,
    { squareConnection, fetchAll, locationId, pagination = {} },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const data = await fetchAllPages(
      client,
      "/v2/invoices",
      "invoices",
      {
        initialCursor: pagination.cursor,
        additionalParams: {
          location_id: locationId,
          limit: pagination.limit || 100,
        },
      },
      fetchAll,
    );

    return { data };
  },
  inputs: listInvoicesInputs,
  examplePayload: listInvoicesExamplePayload,
});
