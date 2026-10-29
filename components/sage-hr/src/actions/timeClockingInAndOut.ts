import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { timeClockingInAndOutExamplePayload } from "../examplePayloads";
import { clocked_time, connectionInput, override } from "../inputs";

export const timeClockingInAndOut = action({
  display: {
    label: "Time Clocking In and Out",
    description: "Clock in and out employees on specific days",
  },
  inputs: {
    connectionInput,
    override,
    clocked_time,
  },
  perform: async (context, { connectionInput, ...params }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post("/timesheets/clock-in", {
      ...params,
    });
    return {
      data,
    };
  },
  examplePayload: timeClockingInAndOutExamplePayload,
});
