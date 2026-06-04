import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listOrdersExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  DeliveryEndDate,
  DeliveryStartDate,
  EndDate,
  fetchAll,
  FulfillmentEndDate,
  FulfillmentStartDate,
  HasTracking,
  IDs,
  IsTrackingUploaded,
  LastTrackingUpdateEndDate,
  LastTrackingUpdateStartDate,
  LastUpdateEndDate,
  LastUpdateStartDate,
  Limit,
  Page,
  ReferenceIds,
  SortOrder,
  StartDate,
  shipbob_channel_id,
  version,
} from "../../inputs";
import { generatePayload } from "../util";
import { getAllPaginatedData } from "../../util";

export const listOrders = action({
  display: {
    label: "List Orders",
    description: "Retrieve all Orders",
  },
  perform: async (
    context,
    {
      connectionInput,
      version,
      shipbob_channel_id,
      fetchAll: doFetchAll,
      ...inputs
    },
  ) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const params = generatePayload(inputs);
    const headers = generatePayload({ shipbob_channel_id });

    if (doFetchAll) {
      const data = await getAllPaginatedData(client, "/order", params, headers);
      return { data };
    }

    const { data } = await client.get(`/order`, {
      params,
      headers,
    });
    return { data };
  },
  inputs: {
    connectionInput,
    version,
    shipbob_channel_id,
    fetchAll,
    IDs,
    ReferenceIds,
    StartDate,
    EndDate,
    SortOrder,
    HasTracking,
    LastUpdateStartDate,
    LastUpdateEndDate,
    IsTrackingUploaded,
    LastTrackingUpdateStartDate,
    LastTrackingUpdateEndDate,
    DeliveryStartDate,
    DeliveryEndDate,
    FulfillmentStartDate,
    FulfillmentEndDate,
    Page,
    Limit,
  },
  examplePayload: listOrdersExamplePayload,
});
