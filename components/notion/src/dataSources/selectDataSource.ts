import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectDataSourceInputs } from "../inputs";
import { getPaginatedData, sortArray } from "../util";
import { HttpMethod } from "../constants";
import type { InlineDSDataSource } from "../types";
import { selectDataSourceResponse } from "../examplePayloads";

export const selectDataSource = dataSource({
  display: {
    label: "Select Data Source",
    description: "Select a Notion data source from a picklist",
  },
  inputs: selectDataSourceInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await getPaginatedData(
      client,
      HttpMethod.POST,
      "/search",
      true,
      {
        filter: {
          value: "data_source",
          property: "object",
        },
      },
    );
    const result = sortArray(
      data.results.map((ds: InlineDSDataSource) => ({
        label: ds.title?.[0]?.plain_text || "Untitled",
        key: ds.id,
      })),
    );
    return {
      result,
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectDataSourceResponse,
});
