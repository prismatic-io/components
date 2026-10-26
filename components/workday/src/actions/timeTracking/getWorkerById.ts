import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerByIdExamplePayload } from "../../examplePayloads";
import { getWorkerByIdInputs } from "../../inputs";
import { getWorkerByIdOutputSchema } from "../../outputSchemas";
export const getWorkerById = action({
  display: {
    label: "Get Worker by ID",
    description: "Retrieves a worker and current staffing information by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, workerId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.timeTracking}/workers/${workerId}`,
    );
    return {
      data,
    };
  },
  inputs: getWorkerByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkerByIdOutputSchema,
  }),
  examplePayload: getWorkerByIdExamplePayload,
});
