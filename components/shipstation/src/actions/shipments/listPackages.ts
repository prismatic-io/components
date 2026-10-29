import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listPackagesExamplePayload } from "../../examplePayloads";
import { listPackagesInputs } from "../../inputs";

export const listPackages = action({
  display: {
    label: "List Packages",
    description: "Retrieves a list of packages for the specified carrier.",
  },
  perform: async (context, { carrierCode, connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get(
      `/carriers/listpackages?carrierCode=${carrierCode}`,
    );

    return { data };
  },
  inputs: listPackagesInputs,
  examplePayload: listPackagesExamplePayload,
});
