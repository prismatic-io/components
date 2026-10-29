import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerServiceDatesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getWorkerServiceDatesInputs } from "../../inputs";
import { getWorkerServiceDatesOutputSchema } from "../../outputSchemas";

export const getWorkerServiceDates = action({
  display: {
    label: "Get Worker Service Dates",
    description:
      "Retrieves a collection of service dates (hire date, continuous service date, etc.) for the specified worker ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, workerId, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.staffing}/workers/${workerId}/serviceDates`,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => getWorkerServiceDatesExamplePayload,
  inputs: getWorkerServiceDatesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkerServiceDatesOutputSchema,
  }),
  examplePayload: getWorkerServiceDatesExamplePayload,
});
