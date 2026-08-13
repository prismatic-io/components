import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listLocationsResponse } from "../../examplePayloads/locations";
import { defaultListInputs } from "../../inputs";
import type { Location } from "../../interfaces/locations";
import { listLocationsOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listLocations = action({
  display: {
    label: "List Locations",
    description: "Retrieve a list of all locations",
  },
  inputs: {
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listLocationsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<Location>(
      client,
      "locations",
      {
        ...customQueryParams,
        page_size: pagination.pageSize,
        start: pagination.start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { fetchAll },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...listLocationsResponse,
      page: fetchAll ? null : listLocationsResponse.page,
    },
  }),
  examplePayload: {
    data: listLocationsResponse,
  },
});
