import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getStaffingWorkersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getStaffingWorkersInputs } from "../../inputs";
import { getStaffingWorkersOutputSchema } from "../../outputSchemas";
export const getStaffingWorkers = action({
  display: {
    label: "Get Staffing Workers",
    description:
      "Retrieves a collection of workers and current staffing information from the Staffing service.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.staffing}/workers`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => getStaffingWorkersExamplePayload,
  inputs: getStaffingWorkersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getStaffingWorkersOutputSchema,
  }),
  examplePayload: getStaffingWorkersExamplePayload,
});
