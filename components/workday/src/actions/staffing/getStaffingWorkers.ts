import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getStaffingWorkersExamplePayload } from "../../examplePayloads";
import { getStaffingWorkersInputs } from "../../inputs";

export const getStaffingWorkers = action({
  display: {
    label: "Get Staffing Workers",
    description:
      "Retrieves a collection of workers and current staffing information from the Staffing service.",
  },
  perform: async (context, { connection, params, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(`${SERVICES.staffing}/workers`, {
      params: { limit, offset, ...params },
    });
    return {
      data,
    };
  },
  inputs: getStaffingWorkersInputs,
  examplePayload: getStaffingWorkersExamplePayload,
});
