import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ASSETS_PATH } from "../constants";
import { connection } from "../inputs/common";
import type { PaginatedResponse } from "../types";
import { paginateResults } from "../util/pagination";

export const selectAsset = dataSource({
  display: {
    label: "Select Asset",
    description: "Select a Content Builder asset from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const response = await paginateResults(client, ASSETS_PATH, true, {
      $pageSize: 200,
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
      { label: "Test", key: "151239" },
      { label: "Welcome Email Template", key: "263847" },
    ],
  },
});
