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
      shipmentFilters = {},
      dateRangeFilters = {},
      pagination = {},
    },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );
    const params = {
      trackingNumber: shipmentFilters.trackingNumber,
      createDateStart: dateRangeFilters.createDateStart,
      createDateEnd: dateRangeFilters.createDateEnd,
      shipDateStart: dateRangeFilters.shipDateStart,
      shipDateEnd: dateRangeFilters.shipDateEnd,
      recipientName: shipmentFilters.recipientName,
      recipientCountryCode: shipmentFilters.recipientCountryCode,
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
    const { data } = await client.get("/shipments", { params });
    return { data };
  },
  inputs: listShipmentsInputs,
  examplePayload: listShipmentsExamplePayload,
});
