import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getWorkersInputs } from "../../inputs";
export const getWorkers = action({
  display: {
    label: "List Workers",
    description:
      "Retrieves a collection of workers and current staffing information.",
  },
  perform: async (
    context,
    { connection, params, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.timeTracking}/workers`,
      params,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  inputs: getWorkersInputs,
  examplePayload: getWorkersExamplePayload,
});
