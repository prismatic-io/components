import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listLocationsResponse } from "../../examplePayloads/locations";
import { defaultListInputs } from "../../inputs";
import type { Location } from "../../interfaces/locations";
import { fetchAllData } from "../../util";

export const listLocations = action({
  display: {
    label: "List Locations",
    description: "Retrieve a list of all locations",
  },
  inputs: {
    ...defaultListInputs,
  },
  perform: async (context, { connection, customQueryParams, fetchAll, pageSize, start }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<Location>(
      client,
      "locations",
      {
        ...customQueryParams,
        page_size: pageSize,
        start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listLocationsResponse,
  },
});
