import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postWorkerTimeBlockExamplePayload } from "../../examplePayloads";
import { postWorkerTimeBlockInputs } from "../../inputs";
import { postWorkerTimeBlockOutputSchema } from "../../outputSchemas";
import { getIdObject } from "../../util";

export const postWorkerTimeBlock = action({
  display: {
    label: "Create Worker Time Block",
    description: "Creates a worker time block for the specified worker.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      workerId,
      extraBody,
      calendarDate,
      reportedQuantity,
      timeEntryCodeId,
      doNotBill,
      comment,
      instanceId,
      instanceDescriptor,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      worker: getIdObject(workerId),
      calendarDate,
      reportedQuantity,
      timeEntryCode: getIdObject(timeEntryCodeId),
      doNotBill,
      comment,
      id: instanceId,
      descriptor: instanceDescriptor,
      ...(extraBody || {}),
    };
    const { data } = await client.post(
      `${SERVICES.timeTracking}/workers/${workerId}/workerTimeBlock`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => postWorkerTimeBlockExamplePayload,
  inputs: postWorkerTimeBlockInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postWorkerTimeBlockOutputSchema,
  }),
  examplePayload: postWorkerTimeBlockExamplePayload,
});
