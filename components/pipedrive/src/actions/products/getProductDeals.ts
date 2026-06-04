import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  paginationLimitInput,
  paginationStartInput,
  productIdInput,
} from "../../inputs";
import { cleanString } from "../../util";

export const getProductDeals = action({
  display: {
    label: "Get Product Deals",
    description: "Gets deals that a product is attached to.",
  },
  perform: async (context, { connection, id, start, limit, status }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/products/${id}/deals`, {
      params: { start, limit, status },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: productIdInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
    status: input({
      label: "Status",
      type: "string",
      model: [
        { label: "Open", value: "open" },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" },
        { label: "Deleted", value: "deleted" },
      ],
      clean: cleanString,
      comments: "Only fetch deals with a specific status",
    }),
  },
});
