import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listLocationsExamplePayload } from "../../examplePayloads";
import { listLocationsInputs } from "../../inputs";
import type { Location } from "../../types";
import { fetchAllRecords } from "../../util";
export const listLocations = action({
  display: {
    label: "List Locations",
    description: "Retrieve a list of Locations",
  },
  inputs: listLocationsInputs,
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    if (fetchAll) {
      const data = await fetchAllRecords<Location>(client, "/locations", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/locations`, {
      params: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listLocationsExamplePayload,
});
