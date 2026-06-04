import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectPageInputs } from "../inputs";
import { getPageTitle, getPaginatedData, sortArray } from "../util";
import { HttpMethod } from "../constants";
import type { InlineDSPage } from "../types";
import { selectPageResponse } from "../examplePayloads";

export const selectPage = dataSource({
  display: {
    label: "Select Page",
    description: "Select a Notion page from a picklist",
  },
  inputs: selectPageInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await getPaginatedData(
      client,
      HttpMethod.POST,
      "/search",
      true,
      {
        filter: {
          value: "page",
          property: "object",
        },
      },
    );
    const result = sortArray(
      data.results.map((page: InlineDSPage) => ({
        label: getPageTitle(page),
        key: page.id,
      })),
    );
    return {
      result,
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectPageResponse,
});
