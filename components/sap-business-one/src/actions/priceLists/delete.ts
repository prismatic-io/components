import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_DELETE_RESPONSE } from "../../constants";
import { priceListNo } from "../../inputs/priceLists/general";

export const deletePriceList = action({
  display: {
    label: "Delete Price List",
    description: "Delete an instance of Items with the specified id.",
  },
  inputs: {
    priceListNo,
    connection,
  },
  perform: async (context, { connection, priceListNo }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.delete(`/PriceLists(${priceListNo})`);
    return {
      data: DEFAULT_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_DELETE_RESPONSE,
  },
});
