import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postWorkerTimeBlockExamplePayload } from "../../examplePayloads";
import { postWorkerTimeBlockInputs } from "../../inputs";

export const postWorkerTimeBlock = action({
  display: {
    label: "Create Worker Time Block",
    description: "Creates a worker time block for the specified worker.",
  },
  perform: async (
    context,
    {
      connection,
      workerId,
      additionalFields,
      doNotBill,
      comment,
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
    const { data } = await client.post(
      `${SERVICES.timeTracking}/workers/${workerId}/workerTimeBlock`,
      body,
    );
    return {
      data,
    };
  },
  inputs: postWorkerTimeBlockInputs,
  examplePayload: postWorkerTimeBlockExamplePayload,
});
