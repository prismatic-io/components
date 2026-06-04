import { dataSource, type Element } from "@prismatic-io/spectral";
import { createToastClient } from "../client";
import { selectAccesibleRestaurantInputs as inputs } from "../inputs/dataSources";

export const selectAccessibleRestaurant = dataSource({
  display: {
    label: "Select Accessible Restaurant",
    description:
      "Select an accessible restaurant from a list of accessible restaurants.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = await createToastClient(connection, false);
    const { data } = await client.get(`/partners/v1/restaurants`);

    const objects = (
      data as { restaurantGuid: string; restaurantName: string }[]
    ).map<Element>((accesibleRestaurant) => ({
      key: accesibleRestaurant.restaurantGuid,
      label: accesibleRestaurant.restaurantName,
    }));

    return { result: objects };
  },
});
