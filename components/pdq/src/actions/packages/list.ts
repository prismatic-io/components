import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { listPackagesExamplePayload } from "../../examplePayloads/packages";
import { connection, listDefaultInputs } from "../../inputs/general";
import { fetchAllData } from "../../util";

export const listPackages = action({
  display: {
    label: "List Packages",
    description: "Retrieve a list of packages",
  },
  inputs: {
    ...listDefaultInputs,
    connection,
  },
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, filter, page, pageSize, sort },
  ) => {
    const client = createHttpClient(connection, context.debug.enabled);

    const data = await fetchAllData(
      client,
      "/packages",
      {
        ...customQueryParams,
        filter,
        page,
        pageSize,
        sort,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listPackagesExamplePayload,
  },
});
