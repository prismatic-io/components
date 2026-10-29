import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addCallLogInputs } from "../../inputs";
import { addCallLogExamplePayload } from "../../examplePayloads";
import { addCallLogOutputSchema } from "../../outputSchemas";

export const addCallLog = action({
  display: {
    label: "Add Call Log",
    description: "Adds a call log.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      userId,
      activityId,
      subject,
      duration,
      outcome,
      fromPhoneNumber,
      toPhoneNumber,
      startTime,
      endTime,
      personId,
      orgId,
      dealId,
      note,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/callLogs", {
      user_id: userId,
      activity_id: activityId,
      subject,
      duration,
      outcome,
      from_phone_number: fromPhoneNumber,
      to_phone_number: toPhoneNumber,
      start_time: startTime,
      end_time: endTime,
      person_id: personId,
      org_id: orgId,
      deal_id: dealId,
      note,
    });
    return { data };
  },
  inputs: addCallLogInputs,
  examplePayload: addCallLogExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addCallLogOutputSchema,
  }),
});
