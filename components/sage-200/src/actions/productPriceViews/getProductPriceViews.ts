import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getProductPriceViewsPayload } from "../../examplePayloads";
import { company, connection, site } from "../../inputs/general";
export const getProductPriceViews = action({
  display: {
    label: "Get Product Price Views",
    description:
      "Returns the selling prices of your products. A price is returned for each price band associated with a product.",
  },
  perform: async (context, { connection, site, company }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/product_price_views");
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: getProductPriceViewsPayload,
});
