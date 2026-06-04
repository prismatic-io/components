import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";

export const addCallLog = action({
  display: {
    label: "Add Call Log",
    description: "Adds a call log.",
  },
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
  inputs: {
    connection: connectionInput,
    userId: input({
      label: "User ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the owner of the call log",
    }),
    activityId: input({
      label: "Activity ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments:
        "If specified, this activity will be converted into a call log, with the information provided",
    }),
    subject: input({
      label: "Subject",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The name of the activity this call is attached to",
    }),
    duration: input({
      label: "Duration",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The duration of the call in seconds",
    }),
    outcome: input({
      label: "Outcome",
      type: "string",
      required: true,
      model: [
        { label: "Connected", value: "connected" },
        { label: "No Answer", value: "no_answer" },
        { label: "Left Message", value: "left_message" },
        { label: "Left Voicemail", value: "left_voicemail" },
        { label: "Wrong Number", value: "wrong_number" },
        { label: "Busy", value: "busy" },
      ],
      clean: util.types.toString,
      comments: "Describes the outcome of the call",
    }),
    fromPhoneNumber: input({
      label: "From Phone Number",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The number that made the call",
    }),
    toPhoneNumber: input({
      label: "To Phone Number",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The number called",
    }),
    startTime: input({
      label: "Start Time",
      type: "string",
      required: true,
      clean: cleanString,
      comments: "The date and time of the start of the call in UTC",
    }),
    endTime: input({
      label: "End Time",
      type: "string",
      required: true,
      clean: cleanString,
      comments: "The date and time of the end of the call in UTC",
    }),
    personId: input({
      label: "Person ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the person this call is associated with",
    }),
    orgId: input({
      label: "Org ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the organization this call is associated with",
    }),
    dealId: input({
      label: "Deal ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the deal this call is associated with",
    }),
    note: input({
      label: "Note",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The note for the call log in HTML format",
    }),
  },
});
