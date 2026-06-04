import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DATA_EXTENSIONS_PATH } from "../constants";
import { connection } from "../inputs/common";
import type { PaginatedResponse } from "../types";
import { paginateResults } from "../util/pagination";

export const selectDataExtension = dataSource({
  display: {
    label: "Select Data Extension",
    description: "Select a data extension from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const response = await paginateResults(client, DATA_EXTENSIONS_PATH, true, {
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
        label: "Contact_Salesforce",
        key: "36e73253-16a9-ee11-ac6c-0abc489251b9",
      },
      {
        label: "Email_Subscribers",
        key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    ],
  },
});
