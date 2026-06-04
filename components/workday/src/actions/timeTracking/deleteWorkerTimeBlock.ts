import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { deleteWorkerTimeBlockExamplePayload } from "../../examplePayloads";
import { deleteWorkerTimeBlockInputs } from "../../inputs";

export const deleteWorkerTimeBlock = action({
  display: {
    label: "Delete Worker Time Block",
    description:
      "Deletes a worker time block with the specified ID for the specified worker.",
  },
  perform: async (context, { connection, workerId, workerTimeBlockId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `${SERVICES.timeTracking}/workers/${workerId}/workerTimeBlock/${workerTimeBlockId}`,
    );
    return {
      data,
    };
  },
  inputs: deleteWorkerTimeBlockInputs,
  examplePayload: deleteWorkerTimeBlockExamplePayload,
});
