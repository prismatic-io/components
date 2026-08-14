import { action, outputSchema } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { PACKAGES_ENDPOINT } from "../../constants";
import { listPackagesExamplePayload } from "../../examplePayloads/packages";
import { listPackagesInputs } from "../../inputs";
import { listPackagesOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listPackages = action({
  display: {
    label: "List Packages",
    description: "Retrieve a list of packages.",
  },
  inputs: listPackagesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPackagesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, filters = {}, pagination = {} },
  ) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const data = await fetchAllData(
      client,
      PACKAGES_ENDPOINT,
      {
        ...customQueryParams,
        filter: filters.filter,
        page: pagination.page,
        pageSize: pagination.pageSize,
        sort: filters.sort,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listPackagesExamplePayload.data,
  }),
  examplePayload: listPackagesExamplePayload,
});
