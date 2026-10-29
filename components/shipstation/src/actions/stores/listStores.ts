import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listStoresExamplePayload } from "../../examplePayloads";
import { listStoresInputs } from "../../inputs";

export const listStores = action({
  display: {
    label: "List Stores",
    description: "Retrieves the list of installed stores on the account.",
  },
  perform: async (
    context,
    { connectionInput, showInactive, marketplaceId },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const params = {
      showInactive,
      marketplaceId,
    };

    const { data } = await client.get("/stores", { params });
    return { data };
  },
  inputs: listStoresInputs,
  examplePayload: listStoresExamplePayload,
});
