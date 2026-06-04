import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  enabled,
  name,
  region,
  settings,
  warehouseId,
} from "../../inputs";
import { updateWarehouseExamplePayload } from "../../examplePayloads";

export const updateWarehouse = action({
  display: {
    label: "Update Warehouse",
    description: "Updates an existing Warehouse.",
  },
  inputs: {
    connectionInput,
    region,
    warehouseId,
    settings,
    name,
    enabled,
  },
  perform: async (
    context,
    { connectionInput, region, warehouseId, settings, name, enabled },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.patch(
      `/warehouses/${warehouseId}`,
      {
        settings: settings || undefined,
        name: name || undefined,
        enabled: enabled === "" ? undefined : util.types.toBool(enabled),
      },
      {
        headers: {
          "Content-Type": "application/vnd.segment.v1+json",
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: updateWarehouseExamplePayload,
  },
});
