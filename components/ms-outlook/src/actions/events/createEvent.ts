import { action } from "@prismatic-io/spectral";
import type { Attendee, Event } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { createEventExamplePayload } from "../../examplePayloads";
import { createEventInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const createEvent = action({
  display: {
    label: "Create Event",
    description: "Creates an event on a calendar.",
  },
  inputs: createEventInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    const attendees: Attendee[] = [
      ...params.attendees,
      ...(params.attendeesData && Array.isArray(params.attendeesData) ? params.attendeesData : []),
    ];

    const url = computeEndpointBasedOnConnection(
      params.connection,
      params.calendarId ? `/me/calendars/${params.calendarId}/events` : "/me/events",
    );

    const payload: Event = {
      subject: params.subject,
      attendees,
      location: {
        displayName: params.locationName,
      },
      start: {
        dateTime: params.start,
        timeZone: params.startTimezone,
      },
      end: {
        dateTime: params.end,
        timeZone: params.endTimezone,
      },
      body: {
        contentType: "html",
        content: params.body,
      },
    };

    const { data } = await client.post<Event>(url, payload);
    return { data };
  },
  examplePayload: createEventExamplePayload,
});
