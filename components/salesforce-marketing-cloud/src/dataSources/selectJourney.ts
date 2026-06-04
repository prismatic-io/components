import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { JOURNEYS_PATH } from "../constants";
import { connection } from "../inputs/common";
import type { PaginatedResponse } from "../types";
import { paginateResults } from "../util/pagination";

export const selectJourney = dataSource({
  display: {
    label: "Select Journey",
    description: "Select a journey (interaction) from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const response = await paginateResults(client, JOURNEYS_PATH, true, {
      $pageSize: 50,
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
        label: "Welcome Series",
        key: "69dd5e94-d963-4508-861b-8f818d6da93a",
      },
      {
        label: "Re-engagement Campaign",
        key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    ],
  },
});
