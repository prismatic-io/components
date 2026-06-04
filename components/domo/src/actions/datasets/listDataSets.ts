import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listDataSetsInputs } from "../../inputs";
import type { ListDataSetsQueryParams } from "../types/ListDataSetsQueryParams";
import { listDataSetsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const listDataSets = action({
  display: {
    label: "List DataSets",
    description: "Lists all DataSets in a Domo instance.",
  },
  examplePayload: listDataSetsExamplePayload,
  perform: async (
    context,
    { connection, fetchAll, limit, nameLike, offset, sort },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListDataSetsQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (nameLike.length) queryParams.nameLike = nameLike;
    if (offset.length) queryParams.offset = offset;
    if (sort.length) queryParams.sort = sort;
    return paginateResults(client, "/datasets", fetchAll, queryParams as Record<string, string>);
  },
  inputs: listDataSetsInputs,
});

export default { listDataSets };
