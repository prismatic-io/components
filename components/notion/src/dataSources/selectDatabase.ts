import { dataSource } from "@prismatic-io/spectral";
import { createOldClient } from "../client";
import { selectDatabaseInputs } from "../inputs";
import { getPaginatedData, sortArray } from "../util";
import { HttpMethod } from "../constants";
import type { InlineDSDatabase } from "../types";

export const selectDatabase = dataSource({
  display: {
    label: "Select Database (Deprecated)",
    description: "Select a Notion database from a picklist",
  },
  inputs: selectDatabaseInputs,
  perform: async (_context, { connection }) => {
    const client = createOldClient(connection, false);

    const { data } = await getPaginatedData(
      client,
      HttpMethod.POST,
      "/search",
      true,
      {
        filter: {
          value: "database",
          property: "object",
        },
      },
    );
    const result = sortArray(
      data.results.map((db: InlineDSDatabase) => ({
        label: db.title?.[0]?.plain_text || "Untitled",
        key: db.id,
      })),
    );
    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
