import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { listConnectedRestaurantsExamplePayload as examplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { listConnectedRestaurantsInputs as inputs } from "../../inputs/restaurant";

export const listConnectedRestaurants = action({
  display: {
    label: "List Connected Restaurants",
    description:
      "Returns a PaginatedResponse object that contains a paginateResultsd array of the restaurants that have connected to your integrated partner service.",
  },
  perform: async (
    context,
    { connection, fetchAll, lastModified, pageSize, pageToken },
  ) => {
    const client = await createToastClient(connection, context.debug.enabled);

    return paginateResults({
      client,
      endpoint: "/partners/v1/connectedRestaurants",
      params: { lastModified },
      pageSize,
      fetchAll,
      pageToken,
    });
  },
  inputs,
  examplePayload,
});
