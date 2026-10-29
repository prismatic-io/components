import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listPagesExamplePayload } from "../../examplePayloads";
import { listPagesInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { ListPagesQueryParams } from "../types/ListPagesQueryParams";

export const listPages = action({
  display: {
    label: "List Pages",
    description: "Lists all pages in a Domo instance.",
  },
  examplePayload: listPagesExamplePayload,
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListPagesQueryParams = {};
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    return await paginateResults(
      client,
      "/pages",
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listPagesInputs,
});

export default { listPages };
