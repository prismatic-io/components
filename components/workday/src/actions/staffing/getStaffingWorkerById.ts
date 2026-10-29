import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getStaffingWorkerByIdExamplePayload } from "../../examplePayloads";
import { getStaffingWorkerByIdInputs } from "../../inputs";
import { getStaffingWorkerByIdOutputSchema } from "../../outputSchemas";

export const getStaffingWorkerById = action({
  display: {
    label: "Get Staffing Worker by ID",
    description:
      "Retrieves a worker with the specified ID and current staffing information from the Staffing service.",
  },
  performSafety: "safe",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getStaffingWorkerByIdOutputSchema,
  }),
  examplePayload: getStaffingWorkerByIdExamplePayload,
});
