import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { getStoreExamplePayload } from "../../examplePayloads";
import { getStoreInputs } from "../../inputs";

export const getStore = action({
  display: {
    label: "Get Store",
    description: "Retrieves detailed information about a specific store.",
  },
  perform: async (context, { connectionInput, storeId }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get(`/stores/${storeId}`);
    return { data };
  },
  inputs: getStoreInputs,
  examplePayload: getStoreExamplePayload,
});
