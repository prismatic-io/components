import { action } from "@prismatic-io/spectral";
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
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(params.connection, `/me/events/${params.eventId}`);

    const attendees: Attendee[] = [
      ...params.attendees,
      ...(params.attendeesData && Array.isArray(params.attendeesData) ? params.attendeesData : []),
    ];

    const payload: Event = {};
    if (params.locationName) {
      payload.location = { displayName: params.locationName };
    }
    if (params.subject) {
      payload.subject = params.subject;
    }
    if (params.body) {
      payload.body = {
        contentType: "html",
        content: params.body,
      };
    }
    if (attendees.length > 0) {
      payload.attendees = attendees;
    }
    if (params.start && params.startTimezone) {
      payload.start = {
        dateTime: params.start,
        timeZone: params.startTimezone,
      };
    }
    if (params.end && params.endTimezone) {
      payload.end = {
        dateTime: params.end,
        timeZone: params.endTimezone,
      };
    }

    const { data } = await client.patch<Event>(url, payload);
    return { data };
  },
  examplePayload: updateEventExamplePayload,
});
