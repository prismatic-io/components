import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkersExamplePayload } from "../../examplePayloads";
import { getWorkersInputs } from "../../inputs";
import { getWorkersOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";

export const getWorkers = action({
  display: {
    label: "List Workers",
    description:
      "Retrieves a collection of workers and current staffing information.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.timeTracking}/workers`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => getWorkersExamplePayload,
  inputs: getWorkersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkersOutputSchema,
  }),
  examplePayload: getWorkersExamplePayload,
});
