import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProductExamplePayload } from "../../examplePayloads";
import {
  ActiveStatus,
  BundleStatus,
  connectionInput,
  fetchAll,
  IDs,
  Limit,
  Page,
  ReferenceIds,
  Search,
  shipbob_channel_id,
  version,
} from "../../inputs";
import { generatePayload } from "../util";
import { getAllPaginatedData } from "../../util";

export const listProduct = action({
  display: {
    label: "Get Multiple Products",
    description: "Retrieve a list of several Products",
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
        "/product",
        params,
        headers,
      );
      return { data };
    }

    const { data } = await client.get(`/product`, {
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
    IDs: {
      ...IDs,
      comments: "Comma separated list of product ids to filter by",
    },
    ReferenceIds,
    Search,
    ActiveStatus,
    BundleStatus,
    Page,
    Limit,
  },
  examplePayload: listProductExamplePayload,
});
