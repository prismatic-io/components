import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomersInputs as inputs } from "../../inputs/customers";
import type { ListCustomersResponse } from "../../interfaces/customers";
import { listCustomersExamplePayload as examplePayload } from "../../examplePayloads/customers";
import { fetchAllWithPagination } from "../../utils/fetchAllWithPagination";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description:
      "List customers, paginated, and ordered by their name (alphabetical order).",
  },
  perform: async (context, { connection, fetchAll, ...configVars }) => {
    const client = createClient({
      connection,
      debug: context.debug.enabled,
    });
    const { data } = fetchAll
      ? await fetchAllWithPagination<ListCustomersResponse>({
          client,
          configVars,
          endpoint: "/customers",
        })
      : await client.get<ListCustomersResponse>("/customers", {
          params: configVars,
        });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
