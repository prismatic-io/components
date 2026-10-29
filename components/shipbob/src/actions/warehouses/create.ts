import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createWarehouseReceivingOrderExamplePayload } from "../../examplePayloads";
import {
  box_packaging_type,
  boxes,
  connectionInput,
  expected_arrival_date,
  fulfillment_center,
  package_type,
  purchase_order_number,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const createWarehouseReceivingOrder = action({
  display: {
    label: "Create Warehouse Receiving Order",
    description: "Create a new Warehouse Receiving Order",
  },
  perform: async (context, { connectionInput, version, ...inputs }) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const body = generatePayload(inputs);
    const { data } = await client.post(`/receiving`, body);
    return { data };
  },
  inputs: {
    connectionInput,
    version: { ...version, default: "2.0" },
    fulfillment_center,
    package_type,
    box_packaging_type,
    boxes,
    expected_arrival_date,
    purchase_order_number,
  },
  examplePayload: createWarehouseReceivingOrderExamplePayload,
});
