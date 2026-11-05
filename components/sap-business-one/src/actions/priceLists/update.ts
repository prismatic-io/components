import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_UPDATE_RESPONSE } from "../../constants";
import { updatePriceListsInputs } from "../../inputs/priceLists/update";

export const updatePriceList = action({
  display: {
    label: "Update Price List",
    description: "Update an instance of Price Lists.",
  },
  inputs: {
    ...updatePriceListsInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, PriceListNo, PriceListName }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.patch(`/PriceLists(${PriceListNo})`, {
      PriceListName,
      ...bodyFields,
    });

    return {
      data: DEFAULT_UPDATE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_UPDATE_RESPONSE,
  },
});
