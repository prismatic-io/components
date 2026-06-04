import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listShipmentsExamplePayload } from "../../examplePayloads";
import { listShipmentsInputs } from "../../inputs";

export const listShipments = action({
  display: {
    label: "List Shipments",
    description:
      "Retrieves a list of shipments that match the specified criteria.",
  },
  perform: async (
    context,
    {
      connectionInput,
      trackingNumber,
      createDateStart,
      createDateEnd,
      shipDateStart,
      shipDateEnd,
      recipientName,
      recipientCountryCode,
      page,
      pageSize,
    },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const params = {
      trackingNumber,
      createDateStart,
      createDateEnd,
      shipDateStart,
      shipDateEnd,
      recipientName,
      recipientCountryCode,
      page,
      pageSize,
    };

    const { data } = await client.get("/shipments", { params });
    return { data };
  },
  inputs: listShipmentsInputs,
  examplePayload: listShipmentsExamplePayload,
});
