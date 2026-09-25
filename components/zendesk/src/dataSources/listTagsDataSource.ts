import { dataSource } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { listTagsDataSourceExamplePayload } from "../examplePayloads";
import { listTagsDataSourceInputs } from "../inputs";
import type { Tag } from "../types";
import { paginateResults } from "../util";
export const listTagsDataSource = dataSource({
  display: {
    label: "Select Tags",
    description: "Select a tag from the Zendesk account.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Tag[];
    const nextUrl = "/tags.json";
    const paginatedResults = await paginateResults<Tag>(
      client,
      nextUrl,
      results,
      "tags",
    );
    return {
      result: paginatedResults.map((tag) => ({
        label: tag.name,
        key: tag.name,
      })),
    };
  },
  inputs: listTagsDataSourceInputs,
  dataSourceType: "picklist",
  examplePayload: listTagsDataSourceExamplePayload,
});
