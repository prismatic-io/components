import { action, outputSchema } from "@prismatic-io/spectral";
import { updateEventOutputSchema } from "../../outputSchemas";
import type { Attendee, Event } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { updateEventExamplePayload } from "../../examplePayloads";
import { updateEventInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const updateEvent = action({
  display: {
    label: "Update Event",
    description: "Updates an existing event.",
  },
  inputs: updateEventInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(params.connection, `/me/events/${params.eventId}`);

    const attendees: Attendee[] = [
      ...params.attendees,
      ...(params.attendeesData && Array.isArray(params.attendeesData) ? params.attendeesData : []),
    ];

    const payload: Event = {};
    if (params.eventDetails?.locationName) {
      payload.location = { displayName: params.eventDetails.locationName };
    }
    if (params.eventDetails?.subject) {
      payload.subject = params.eventDetails.subject;
    }
    if (params.eventDetails?.body) {
      payload.body = {
        contentType: "html",
        content: params.eventDetails.body,
      };
    }
    if (attendees.length > 0) {
      payload.attendees = attendees;
    }
    if (params.schedule?.start && params.schedule?.startTimezone) {
      payload.start = {
        dateTime: params.schedule?.start,
        timeZone: params.schedule?.startTimezone,
      };
    }
    if (params.schedule?.end && params.schedule?.endTimezone) {
      payload.end = {
        dateTime: params.schedule?.end,
        timeZone: params.schedule?.endTimezone,
      };
    }

    const { data } = await client.patch<Event>(url, payload);
    return { data };
  },
  examplePerform: async () => updateEventExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateEventOutputSchema,
  }),
  examplePayload: updateEventExamplePayload,
});
