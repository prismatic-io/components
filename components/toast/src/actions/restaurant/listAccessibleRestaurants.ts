import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { listAccessibleRestaurantsExamplePayload as examplePayload } from "../../examplePayloads";
import { listAccessibleRestaurantsInputs as inputs } from "../../inputs/restaurant";

export const listAccessibleRestaurants = action({
  display: {
    label: "List Accessible Restaurants",
    description:
      "Returns an array of PartnerAccessExternalRep objects that contain information about the Toast restaurants that your partner API client can access.",
  },
  perform: async (context, { connection, lastModified }) => {
    const client = await createToastClient(connection, context.debug.enabled);

    const { data } = await client.get(`/partners/v1/restaurants`, {
      params: { lastModified },
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
