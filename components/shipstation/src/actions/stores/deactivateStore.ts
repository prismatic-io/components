import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { deactivateStoreExamplePayload } from "../../examplePayloads";
import { deactivateStoreInputs } from "../../inputs";

export const deactivateStore = action({
  display: {
    label: "Deactivate Store",
    description: "Deactivates the specified store.",
  },
  perform: async (context, { connectionInput, storeId }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const body = {
      storeId,
    };

    const { data } = await client.post("/stores/deactivate", body);
    return { data };
  },
  inputs: deactivateStoreInputs,
  examplePayload: deactivateStoreExamplePayload,
});
