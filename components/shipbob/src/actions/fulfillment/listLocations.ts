import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listLocationsExamplePayload } from "../../examplePayloads";
import {
  AccessGranted,
  connectionInput,
  IncludeInactive,
  ReceivingEnabled,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const listLocations = action({
  display: {
    label: "List Locations",
    description:
      "Receives a list of the physical locations across a fulfillment network",
  },
  perform: async (context, { connectionInput, version, ...inputs }) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const params = generatePayload(inputs);
    const { data } = await client.get(`/location`, {
      params,
    });
    return { data };
  },
  inputs: {
    connectionInput,
    version,
    IncludeInactive,
    ReceivingEnabled,
    AccessGranted,
  },
  examplePayload: listLocationsExamplePayload,
});
