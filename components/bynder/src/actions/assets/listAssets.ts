import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAssetsResponse } from "../../examplePayloads";
import {
  connection,
  count,
  extraParams,
  fetchAll,
  limit,
  page,
  total,
} from "../../inputs";
import { fetchAllRecords } from "../../util";

export const listAssets = action({
  display: {
    label: "List Assets",
    description: "Retrieve all assets",
  },
  inputs: {
    page,
    limit: {
      ...limit,
      comments: "Maximum number of results. Maximum: 1000. Default: 50",
    },
    count,
    total,
    fetchAll,
    extraParams,
    connection,
  },
  perform: async (
    context,
    { connection, limit, page, count, fetchAll, total, extraParams },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const records = await fetchAllRecords(
      client,
      "media",
      { page, limit, count, total, fetchAll, ...extraParams },
      "media",
    );
    return { data: records };
  },
  examplePayload: {
    data: listAssetsResponse,
  },
});
