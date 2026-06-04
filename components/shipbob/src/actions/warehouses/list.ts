import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWarehouseReceivingOrdersExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  FulfillmentCenterIds,
  IDs,
  InsertEndDate,
  InsertStartDate,
  Limit,
  Page,
  PurchaseOrderNumbers,
  Statuses,
  version,
} from "../../inputs";
import { generatePayload } from "../util";
import { getAllPaginatedData } from "../../util";

export const listWarehouseReceivingOrders = action({
  display: {
    label: "List Warehouse Receiving Orders",
    description: "Retrieve all Warehouse Receiving Orders",
  },
  perform: async (
    context,
    { connectionInput, version, fetchAll: doFetchAll, ...inputs },
  ) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const params = generatePayload(inputs);

    if (doFetchAll) {
      const data = await getAllPaginatedData(client, "/receiving", params);
      return { data };
    }

    const { data } = await client.get(`/receiving`, {
      params,
    });
    return { data };
  },
  inputs: {
    connectionInput,
    version: { ...version, default: "2.0" },
    fetchAll,
    IDs,
    Statuses,
    InsertStartDate,
    InsertEndDate,
    FulfillmentCenterIds,
    PurchaseOrderNumbers,
    Page: { ...Page, comments: "Page of WROs to get" },
    Limit: {
      ...Limit,
      comments: "Number of WROs per page to request",
    },
  },
  examplePayload: listWarehouseReceivingOrdersExamplePayload,
});
