import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTimeOffDetailsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getTimeOffDetailsInputs } from "../../inputs";
export const getTimeOffDetails = action({
  display: {
    label: "Get Time Off Details",
    description:
      "Retrieves Time Off Entries for the specified worker ID. Supports filtering by date range, status, and type; returns all entries when no query parameters are specified.",
  },
  perform: async (
    context,
    { connection, workerId, params, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.absenceManagement}/workers/${workerId}/timeOffDetails`,
      params,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  inputs: getTimeOffDetailsInputs,
  examplePayload: getTimeOffDetailsExamplePayload,
});
