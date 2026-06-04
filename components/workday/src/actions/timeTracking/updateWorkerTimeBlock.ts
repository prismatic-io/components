import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { updateWorkerTimeBlockExamplePayload } from "../../examplePayloads";
import { updateWorkerTimeBlockInputs } from "../../inputs";

export const updateWorkerTimeBlock = action({
  display: {
    label: "Update Worker Time Block",
    description:
      "Updates the worker time block for the specified worker with the specified data in the request body.",
  },
  perform: async (
    context,
    {
      connection,
      workerId,
      workerTimeBlockId,
      doNotBill,
      comment,
      additionalFields,
      instanceId,
      instanceDescriptor,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      doNotBill,
      comment,
      id: instanceId,
      descriptor: instanceDescriptor,
      ...(additionalFields || {}),
    };
    const { data } = await client.patch(
      `${SERVICES.timeTracking}/workers/${workerId}/workerTimeBlock/${workerTimeBlockId}`,
      body,
    );
    return {
      data,
    };
  },
  inputs: updateWorkerTimeBlockInputs,
  examplePayload: updateWorkerTimeBlockExamplePayload,
});
