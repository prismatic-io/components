import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listInvoicesExamplePayload } from "../../examplePayloads";
import { listInvoicesInputs } from "../../inputs";

export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "Returns a list of invoices for a given location.",
  },
  perform: async (context, { squareConnection, locationId, cursor, limit }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const params: {
      location_id: unknown;
      cursor?: unknown;
      limit: unknown;
    } = {
      location_id: locationId,
      limit: limit || 100,
    };

    
    if (cursor !== undefined) {
      params.cursor = cursor;
    }

    const response = await client.get("/v2/invoices", { params });
    return {
      data: response.data,
    };
  },
  inputs: listInvoicesInputs,
  examplePayload: listInvoicesExamplePayload,
});
