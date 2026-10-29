import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomersInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Lists customer profiles associated with a Square account.",
  },
  perform: async (
    context,
    { fetchAll, pagination = {}, sorting = {}, squareConnection },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const data = await fetchAllPages(
      client,
      "/v2/customers",
      "customers",
      {
        initialCursor: pagination.cursor,
        additionalParams: {
          limit:
            pagination.limit !== undefined
              ? util.types.toInt(pagination.limit)
              : undefined,
          sort_field:
            sorting.sortField !== undefined
              ? util.types.toString(sorting.sortField)
              : undefined,
          sort_order:
            sorting.sortOrder !== undefined
              ? util.types.toString(sorting.sortOrder)
              : undefined,
        },
      },
      fetchAll,
    );

    return { data };
  },
  inputs: listCustomersInputs,
  examplePayload: listCustomersExamplePayload,
});
