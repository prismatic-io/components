import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listComputersExamplePayload } from "../../examplePayloads";
import { listComputersInputs } from "../../inputs";
import type { ComputerInventory } from "../../types";
import { paginateResults } from "../../util";
export const listComputers = action({
  display: {
    label: "List Computers",
    description:
      "List computer inventory records with optional filtering and pagination.",
  },
  inputs: listComputersInputs,
  perform: async (
    context,
    { connection, pagination, sort, filter, section, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateResults<ComputerInventory>(
      client,
      "/v3/computers-inventory",
      fetchAll,
      {
        page: pagination.page,
        "page-size": pagination.pageSize,
        sort,
        filter,
        section,
      },
    );
    return { data };
  },
  examplePayload: listComputersExamplePayload,
});
