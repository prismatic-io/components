import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, warehouseMetadataId } from "../../inputs";
import { getWarehouseMetadataExamplePayload } from "../../examplePayloads";

export const getWarehouseMetadata = action({
  display: {
    label: "Get Warehouse Metadata",
    description: "Returns a Warehouse catalog item by its id.",
  },
  inputs: {
    connectionInput,
    region,
    warehouseMetadataId,
  },
  perform: async (
    context,
    { connectionInput, region, warehouseMetadataId },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(
      `/catalog/warehouses/${warehouseMetadataId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getWarehouseMetadataExamplePayload,
  },
});
