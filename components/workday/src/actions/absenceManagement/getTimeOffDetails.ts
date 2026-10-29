import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTimeOffDetailsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getTimeOffDetailsInputs } from "../../inputs";
import { getTimeOffDetailsOutputSchema } from "../../outputSchemas";

export const getTimeOffDetails = action({
  display: {
    label: "Get Time Off Details",
    description:
      "Retrieves Time Off Entries for the specified worker ID. Supports filtering by date range, status, and type; returns all entries when no query parameters are specified.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, workerId, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.absenceManagement}/workers/${workerId}/timeOffDetails`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => getTimeOffDetailsExamplePayload,
  inputs: getTimeOffDetailsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTimeOffDetailsOutputSchema,
  }),
  examplePayload: getTimeOffDetailsExamplePayload,
});
