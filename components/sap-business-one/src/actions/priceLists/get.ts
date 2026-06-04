import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, $select } from "../../inputs/general";
import { priceListNo } from "../../inputs/priceLists/general";
import { getPriceListExamplePayload } from "../../examplePayloads/priceLists";

export const getPriceList = action({
  display: {
    label: "Get Price List",
    description:
      "Retrieve all or some selected properties from an instance of PriceLists with the given id.",
  },
  inputs: {
    priceListNo,
    $select,
    connection,
  },
  perform: async (context, { connection, $select, priceListNo }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.get(`/PriceLists(${priceListNo})`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
  examplePayload: getPriceListExamplePayload,
});
