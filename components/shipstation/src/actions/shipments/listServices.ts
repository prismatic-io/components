import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listServicesExamplePayload } from "../../examplePayloads";
import { listServicesInputs } from "../../inputs";

export const listServices = action({
  display: {
    label: "List Services",
    description:
      "Retrieves the list of available shipping services for the specified carrier.",
  },
  perform: async (context, { carrierCode, connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get(
      `/carriers/listservices?carrierCode=${carrierCode}`,
    );

    return { data };
  },
  inputs: listServicesInputs,
  examplePayload: listServicesExamplePayload,
});
