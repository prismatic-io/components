import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  enabled,
  metadataId,
  name,
  region,
  settings,
} from "../../inputs";
import { createWarehouseExamplePayload } from "../../examplePayloads";

export const createWarehouse = action({
  display: {
    label: "Create Warehouse",
    description: "Creates a new Warehouse.",
  },
  inputs: {
    connectionInput,
    region,
    metadataId,
    settings,
    name,
    enabled,
  },
  perform: async (
    context,
    { connectionInput, region, metadataId, settings, name, enabled },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.post(
      `/warehouses`,
      {
        metadataId: metadataId || undefined,
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
    data: createWarehouseExamplePayload,
  },
});
