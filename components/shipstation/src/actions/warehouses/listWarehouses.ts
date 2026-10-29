import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listWarehousesExamplePayload } from "../../examplePayloads";
import { listWarehousesInputs } from "../../inputs";

export const listWarehouses = action({
  display: {
    label: "List Warehouses",
    description:
      "Retrieves a list of Ship From Locations (warehouses) in the account.",
  },
  perform: async (context, { connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get("/warehouses");
    return { data };
  },
  inputs: listWarehousesInputs,
  examplePayload: listWarehousesExamplePayload,
});
