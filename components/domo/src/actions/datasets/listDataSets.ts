import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listDataSetsExamplePayload } from "../../examplePayloads";
import { listDataSetsInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { ListDataSetsQueryParams } from "../types/ListDataSetsQueryParams";

export const listDataSets = action({
  display: {
    label: "List DataSets",
    description: "Lists all DataSets in a Domo instance.",
  },
  examplePayload: listDataSetsExamplePayload,
  perform: async (
    context,
    { connection, fetchAll, nameLike, sort, pagination },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListDataSetsQueryParams = {};
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (nameLike.length) queryParams.nameLike = nameLike;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    if (sort.length) queryParams.sort = sort;
    return await paginateResults(
      client,
      "/datasets",
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listDataSetsInputs,
});

export default { listDataSets };
