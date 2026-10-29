import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { getProductExamplePayload } from "../../examplePayloads";
import { getProductInputs } from "../../inputs";

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Retrieves a specific product from the database by its ID.",
  },
  perform: async (context, { productId, connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get(`/products/${productId}`);
    return { data };
  },
  inputs: getProductInputs,
  examplePayload: getProductExamplePayload,
});
