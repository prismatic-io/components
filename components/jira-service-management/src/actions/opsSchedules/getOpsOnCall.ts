import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { getOpsOnCallExamplePayload } from "../../examplePayloads";
import { getOpsOnCallInputs } from "../../inputs";

export const getOpsOnCall = action({
  display: {
    label: "Get Ops On-Call",
    description:
      "Returns the recipients currently on-call for the specified Ops schedule.",
  },
  inputs: getOpsOnCallInputs,
  perform: async (
    context,
    { connection, scheduleId, scheduleFlat, scheduleDate },
  ) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/v1/schedules/${scheduleId}/on-calls`, {
      params: { flat: scheduleFlat, date: scheduleDate },
    });
    return { data };
  },
  examplePayload: getOpsOnCallExamplePayload,
});
