import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listInventoryItemsExamplePayload } from "../../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  IDs,
  IsActive,
  IsDigital,
  Limit,
  LocationType,
  Page,
  Search,
  Sort,
  shipbob_channel_id,
  version,
} from "../../../inputs";
import { generatePayload } from "../../util";
import { getAllPaginatedData } from "../../../util";

export const listInventoryItems = action({
  display: {
    label: "List Inventory Items",
    description: "Retrieve a list of Inventory Items",
  },
  perform: async (
    context,
    {
      connection,
      version,
      shipbob_channel_id,
      fetchAll: doFetchAll,
      ...inputs
    },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const params = generatePayload(inputs);

    if (doFetchAll) {
      const data = await getAllPaginatedData(
        client,
        "/inventory",
        params,
        headers,
      );
      return { data };
    }

    const { data } = await client.get(`/inventory`, {
      headers,
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    shipbob_channel_id,
    fetchAll,
    IsActive,
    IsDigital,
    IDs,
    Sort,
    Search,
    LocationType,
    Page,
    Limit,
  },
  examplePayload: listInventoryItemsExamplePayload,
});
