import { dataSource, type Element } from "@prismatic-io/spectral";
import { createToastClient } from "../client";
import { selectConnectedRestaurantInputs as inputs } from "../inputs/dataSources";

export const selectConnectedRestaurant = dataSource({
  display: {
    label: "Select Connected Restaurant",
    description:
      "Select a connected restaurant from a list of connected restaurants.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = await createToastClient(connection, false);

    const { data } = await client.get(`/partners/v1/connectedRestaurants`);

    const objects = (
      data as { restaurantGuid: string; restaurantName: string }[]
    ).map<Element>((connectedRestaurant) => ({
      key: connectedRestaurant.restaurantGuid,
      label: connectedRestaurant.restaurantName,
    }));

    return { result: objects };
  },
});
