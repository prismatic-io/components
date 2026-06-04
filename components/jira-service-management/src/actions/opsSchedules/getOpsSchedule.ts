import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { getOpsScheduleExamplePayload } from "../../examplePayloads";
import { getOpsScheduleInputs } from "../../inputs";

export const getOpsSchedule = action({
  display: {
    label: "Get Ops Schedule",
    description: "Returns a single Ops schedule by ID.",
  },
  inputs: getOpsScheduleInputs,
  perform: async (context, { connection, scheduleId }) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/v1/schedules/${scheduleId}`);
    return { data };
  },
  examplePayload: getOpsScheduleExamplePayload,
});
