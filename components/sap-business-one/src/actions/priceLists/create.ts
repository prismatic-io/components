import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createPriceListsInputs } from "../../inputs/priceLists/create";
import { getPriceListExamplePayload as createPriceListExamplePayload } from "../../examplePayloads/priceLists";

export const createPriceList = action({
  display: {
    label: "Create Price List",
    description: "Create an instance of Price Lists",
  },
  inputs: {
    ...createPriceListsInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, PriceListName }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.post(`/PriceLists`, {
      PriceListName,
      ...bodyFields,
    });
    return {
      data,
    };
  },
  examplePayload: createPriceListExamplePayload,
});
