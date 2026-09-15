const customQuestionSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    type: { type: "string" },
    position: { type: "number" },
    enabled: { type: "boolean" },
    required: { type: "boolean" },
    answer_choices: {
      type: "array",
      items: { type: "string" },
    },
    include_other: { type: "boolean" },
  },
};
const profileSchema = {
  type: ["object", "null"],
  properties: {
    type: { type: "string" },
    name: { type: "string" },
    owner: { type: "string" },
  },
};
const eventTypeResource = {
  type: "object",
  properties: {
    uri: { type: "string" },
    name: { type: ["string", "null"] },
    active: { type: "boolean" },
    booking_method: { type: ["string", "null"] },
    slug: { type: ["string", "null"] },
    scheduling_url: { type: "string" },
    duration: { type: "number" },
    kind: { type: "string" },
    pooling_type: { type: ["string", "null"] },
    type: { type: "string" },
    color: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    internal_note: { type: ["string", "null"] },
    description_plain: { type: ["string", "null"] },
    description_html: { type: ["string", "null"] },
    profile: profileSchema,
    secret: { type: "boolean" },
    deleted_at: { type: ["string", "null"] },
    admin_managed: { type: "boolean" },
    custom_questions: {
      type: "array",
      items: customQuestionSchema,
    },
  },
  required: [
    "uri",
    "active",
    "scheduling_url",
    "duration",
    "kind",
    "type",
    "created_at",
    "updated_at",
  ],
};
export const getEventTypeOutputSchema = {
  type: "object",
  properties: {
    resource: eventTypeResource,
  },
  required: ["resource"],
};
export const listUserEventTypesOutputSchema = {
  type: "array",
  items: eventTypeResource,
};
export const listEventTypeAvailableTimesOutputSchema = {
  type: "object",
  properties: {
    collection: {
      type: "array",
      items: {
        type: "object",
        properties: {
          status: { type: "string" },
          invitees_remaining: { type: "number" },
          start_time: { type: "string", format: "date-time" },
          scheduling_url: { type: "string" },
        },
        required: ["status", "start_time", "scheduling_url"],
      },
    },
  },
  required: ["collection"],
};
