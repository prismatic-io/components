const eventResource = {
  type: "object",
  properties: {
    uri: { type: "string" },
    name: { type: ["string", "null"] },
    meeting_notes_plain: { type: ["string", "null"] },
    meeting_notes_html: { type: ["string", "null"] },
    status: { type: "string", enum: ["active", "canceled"] },
    booking_method: { type: ["string", "null"] },
    start_time: { type: "string", format: "date-time" },
    end_time: { type: "string", format: "date-time" },
    event_type: { type: "string" },
    location: {
      type: ["object", "null"],
      properties: {
        type: { type: "string" },
        location: { type: ["string", "null"] },
        additional_info: { type: ["string", "null"] },
        join_url: { type: ["string", "null"] },
        status: { type: ["string", "null"] },
        data: { type: "object" },
      },
    },
    invitees_counter: {
      type: "object",
      properties: {
        total: { type: "number" },
        active: { type: "number" },
        limit: { type: "number" },
      },
    },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    event_memberships: {
      type: "array",
      items: {
        type: "object",
        properties: {
          user: { type: "string" },
          user_email: { type: "string" },
          user_name: { type: ["string", "null"] },
        },
      },
    },
    event_guests: {
      type: "array",
      items: {
        type: "object",
        properties: {
          email: { type: "string" },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" },
        },
      },
    },
    calendar_event: {
      type: ["object", "null"],
      properties: {
        kind: { type: "string" },
        external_id: { type: "string" },
      },
    },
    cancellation: {
      type: ["object", "null"],
      properties: {
        canceled_by: { type: "string" },
        reason: { type: ["string", "null"] },
        canceler_type: { type: "string" },
        created_at: { type: "string", format: "date-time" },
      },
    },
  },
  required: [
    "uri",
    "status",
    "start_time",
    "end_time",
    "event_type",
    "created_at",
    "updated_at",
  ],
};
export const getEventOutputSchema = {
  type: "object",
  properties: {
    resource: eventResource,
  },
  required: ["resource"],
};
export const listEventsOutputSchema = {
  type: "array",
  items: eventResource,
};
export const cancelEventOutputSchema = {
  type: "object",
  properties: {
    resource: {
      type: "object",
      properties: {
        canceled_by: { type: "string" },
        reason: { type: ["string", "null"] },
        canceler_type: { type: "string" },
        created_at: { type: "string", format: "date-time" },
      },
      required: ["canceled_by", "canceler_type", "created_at"],
    },
  },
  required: ["resource"],
};
export const deleteScheduledEventDataOutputSchema = {
  type: "object",
  properties: {},
};
