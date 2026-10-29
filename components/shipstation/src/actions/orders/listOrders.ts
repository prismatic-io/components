import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listOrdersExamplePayload } from "../../examplePayloads";
import { listOrdersInputs } from "../../inputs";

export const listOrders = action({
  display: {
    label: "List Orders",
    description: "Retrieves a list of orders based on specified criteria.",
  },
  perform: async (
    context,
    {
      customerName,
      orderStatusList,
      pageFullorders,
      pageSizeFulfillorders,
      connectionInput,
    },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );
    const params = {
      customerName,
      orderStatusList,
      pageFullorders,
      pageSizeFulfillorders,
    };

    const { data } = await client.get("/orders", { params });
    return { data };
  },
  inputs: listOrdersInputs,
  examplePayload: listOrdersExamplePayload,
});
