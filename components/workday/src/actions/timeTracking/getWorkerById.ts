import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerByIdExamplePayload } from "../../examplePayloads";
import { getWorkerByIdInputs } from "../../inputs";

export const getWorkerById = action({
  display: {
    label: "Get Worker by ID",
    description: "Retrieves a worker and current staffing information by ID.",
  },
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
  examplePayload: getWorkerByIdExamplePayload,
});
