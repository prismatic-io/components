import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listCarriersExamplePayload } from "../../examplePayloads";
import { listCarriersInputs } from "../../inputs";

export const listCarriers = action({
  display: {
    label: "List Carriers",
    description:
      "Lists all shipping providers connected to the ShipStation account.",
  },
  perform: async (context, { connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get("/carriers");

    return { data };
  },
  inputs: listCarriersInputs,
  examplePayload: listCarriersExamplePayload,
});
