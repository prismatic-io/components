import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { CAMPAIGNS_PATH } from "../constants";
import { connection } from "../inputs/common";
import type { PaginatedResponse } from "../types";
import { paginateResults } from "../util/pagination";

export const selectCampaign = dataSource({
  display: {
    label: "Select Campaign",
    description: "Select a campaign from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const response = await paginateResults(client, CAMPAIGNS_PATH, true, {
      $pageSize: 500,
    });

    const items = (response as PaginatedResponse).items ?? [];

    const result = items
      .map<Element>((item) => ({
        label: util.types.toString(item.name),
        key: util.types.toString(item.id),
      }))
      .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "New campaign", key: "145" },
      { label: "Summer Sale", key: "267" },
    ],
  },
});
