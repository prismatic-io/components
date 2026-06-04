import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { updateStoreExamplePayload } from "../../examplePayloads";
import { updateStoreInputs } from "../../inputs";

export const updateStore = action({
  display: {
    label: "Update Store",
    description: "Updates an existing store.",
  },
  perform: async (context, { connectionInput, storeId, storeUpdateData }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.put(`/stores/${storeId}`, storeUpdateData);
    return { data };
  },
  inputs: updateStoreInputs,
  examplePayload: updateStoreExamplePayload,
});
