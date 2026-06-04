import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { AUTOMATIONS_PATH } from "../constants";
import { connection } from "../inputs/common";
import type { PaginatedResponse } from "../types";
import { paginateResults } from "../util/pagination";

export const selectAutomation = dataSource({
  display: {
    label: "Select Automation",
    description: "Select an automation from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const response = await paginateResults(client, AUTOMATIONS_PATH, true, {
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
      {
        label: "Daily Data Sync",
        key: "6b6ec44f-aaf1-4d3d-9f05-074a0328a9ee",
      },
      {
        label: "Weekly Report Export",
        key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    ],
  },
});
