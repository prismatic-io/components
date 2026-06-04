import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTimeOffDetailsExamplePayload } from "../../examplePayloads";
import { getTimeOffDetailsInputs } from "../../inputs";

export const getTimeOffDetails = action({
  display: {
    label: "Get Time Off Details",
    description:
      "Retrieves Time Off Entries for the specified worker ID. Supports filtering by date range, status, and type; returns all entries when no query parameters are specified.",
  },
  perform: async (context, { connection, workerId, params, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.absenceManagement}/workers/${workerId}/timeOffDetails`,
      { params: { limit, offset, ...params } },
    );
    return {
      data,
    };
  },
  inputs: getTimeOffDetailsInputs,
  examplePayload: getTimeOffDetailsExamplePayload,
});
