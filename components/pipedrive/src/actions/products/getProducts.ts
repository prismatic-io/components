import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput, sortBy, sortDirection } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const getProducts = action({
  display: {
    label: "Get Products",
    description: "Gets all products.",
  },
  perform: async (context, { connection, filterId, ids, limit, sortBy, sortDirection, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/products", {
      params: {
        filter_id: filterId,
        ids,
        limit,
        sort_by: sortBy,
        sort_direction: sortDirection,
        cursor,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    filterId: input({
      label: "Filter ID",
      type: "string",
      clean: cleanNumber,
      comments: "The ID of the filter to use",
      example: "123",
      placeholder: "Enter Filter ID",
    }),
    ids: input({
      label: "Ids",
      type: "string",
      clean: cleanString,
      comments:
        "An array of integers with the IDs of the products that should be returned in the response",
      example: "123,456,789",
      placeholder: "Enter Product IDs (comma-separated)",
    }),
    limit: paginationLimitInput,
    cursor,
    sortBy,
    sortDirection,
  },
});
