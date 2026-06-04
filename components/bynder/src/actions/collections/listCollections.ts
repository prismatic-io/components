import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCollectionsResponse } from "../../examplePayloads";
import {
  connection,
  count,
  extraParams,
  fetchAll,
  limit,
  page,
} from "../../inputs";
import type { Collection, Collections } from "../../types";
import { fetchCollections } from "../../util";

export const listCollections = action({
  display: {
    label: "List Collections",
    description: "Retrieve all collections",
  },
  inputs: {
    page,
    limit,
    count,
    fetchAll,
    extraParams,
    connection,
  },
  perform: async (
    context,
    { connection, limit, page, count, fetchAll, extraParams },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    let records: Collection[] = [];
    if (fetchAll) {
      records = await fetchCollections(client, extraParams);
    } else {
      const {
        data: { collections },
      } = await client.get<Collections>(`/collections`, {
        params: {
          limit,
          page,
          count: true,
          ...extraParams,
        },
      });
      records = collections;
    }
    if (count) {
      return { data: { collections: records, count: records.length } };
    }
    return { data: { collections: records } };
  },
  examplePayload: {
    data: listCollectionsResponse,
  },
});
