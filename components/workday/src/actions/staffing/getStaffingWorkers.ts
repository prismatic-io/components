import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getStaffingWorkersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getStaffingWorkersInputs } from "../../inputs";
export const getStaffingWorkers = action({
  display: {
    label: "Get Staffing Workers",
    description:
      "Retrieves a collection of workers and current staffing information from the Staffing service.",
  },
  perform: async (
    context,
    { connection, params, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.staffing}/workers`,
      params,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  inputs: getStaffingWorkersInputs,
  examplePayload: getStaffingWorkersExamplePayload,
});
