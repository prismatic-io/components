import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPackagesExamplePayload } from "../../examplePayloads";
import { listPackagesInputs } from "../../inputs";
import type { Package } from "../../types";
import { paginateResults } from "../../util";
export const listPackages = action({
  display: {
    label: "List Packages",
    description: "List all packages with optional filtering and pagination.",
  },
  inputs: listPackagesInputs,
  perform: async (
    context,
    { connection, pagination, sort, filter, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateResults<Package>(
      client,
      "/v1/packages",
      fetchAll,
      { page: pagination.page, "page-size": pagination.pageSize, sort, filter },
    );
    return { data };
  },
  examplePayload: listPackagesExamplePayload,
});
