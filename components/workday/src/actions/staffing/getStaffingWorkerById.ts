import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getStaffingWorkerByIdExamplePayload } from "../../examplePayloads";
import { getStaffingWorkerByIdInputs } from "../../inputs";

export const getStaffingWorkerById = action({
  display: {
    label: "Get Staffing Worker By ID",
    description:
      "Retrieves a worker with the specified ID and current staffing information from the Staffing service.",
  },
  perform: async (context, { connection, workerId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.staffing}/workers/${workerId}`,
    );
    return {
      data,
    };
  },
  inputs: getStaffingWorkerByIdInputs,
  examplePayload: getStaffingWorkerByIdExamplePayload,
});
