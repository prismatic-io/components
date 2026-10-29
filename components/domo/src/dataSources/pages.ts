import { dataSource, input } from "@prismatic-io/spectral";
import type { ListPagesQueryParams } from "../actions/types/ListPagesQueryParams";
import { getDomoClient } from "../client";
import { connection, limit, offset } from "../inputs";

const pages = dataSource({
  display: {
    label: "Select Page",
    description: "Selects a Domo page.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, limit, offset }) => {
    const client = await getDomoClient(connection, false);
    const queryParams: ListPagesQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;

    const { data } = await client.get(`/pages`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return {
      result: data.map((page: Record<string, string>) => ({
        label: page.name,
        key: String(page.id),
      })),
    };
  },
  inputs: {
    connection,
    limit: input({
      ...limit,
      required: false,
      comments:
        "The amount of pages to return in the list. The default is 50 and the maximum is 500.",
    }),
    offset: input({
      ...offset,
      required: false,
      comments:
        "The offset of the page ID to begin list of pages within the response.",
    }),
  },
});

export default { pages };
