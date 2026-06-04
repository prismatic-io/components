import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listPagesInputs } from "../../inputs";
import type { ListPagesQueryParams } from "../types/ListPagesQueryParams";
import { listPagesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const listPages = action({
  display: {
    label: "List Pages",
    description: "Lists all pages in a Domo instance.",
  },
  examplePayload: listPagesExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListPagesQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    return paginateResults(client, "/pages", fetchAll, queryParams as Record<string, string>);
  },
  inputs: listPagesInputs,
});

export default { listPages };
