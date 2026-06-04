import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDataStoresExamplePayload } from "../../examplePayloads";
import { connectionInput, limit, page, projections, sort } from "../../inputs";

export const listDataStores = action({
  display: {
    label: "List Data Stores",
    description: "Get all data stores.",
  },
  examplePayload: listDataStoresExamplePayload,
  perform: async (context, { connection, limit, page, projections, sort }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/data-stores`, {
      params: {
        limit: limit || undefined,
        page: page || undefined,
        projections: projections || undefined,
        sort: sort || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    limit,
    page,
    projections,
    sort,
  },
});
