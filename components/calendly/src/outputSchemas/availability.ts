const intervalSchema = {
  type: "object",
  properties: {
    from: { type: "string" },
    to: { type: "string" },
  },
};
const availabilityRuleSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    intervals: {
      type: "array",
      items: intervalSchema,
    },
    wday: { type: "string" },
    date: { type: "string" },
  },
};
const availabilityScheduleResource = {
  type: "object",
  properties: {
    uri: { type: "string" },
    default: { type: "boolean" },
    name: { type: ["string", "null"] },
    user: { type: "string" },
    timezone: { type: "string" },
    rules: {
      type: "array",
      items: availabilityRuleSchema,
    },
  },
  required: ["uri", "default", "user", "timezone", "rules"],
};
export const getUserAvailabilityScheduleOutputSchema = {
  type: "object",
  properties: {
    resource: availabilityScheduleResource,
  },
  required: ["resource"],
};
export const listUserAvailabilitySchedulesOutputSchema = {
  type: "object",
  properties: {
    collection: {
      type: "array",
      items: availabilityScheduleResource,
    },
  },
  required: ["collection"],
};
export const listUserBusyTimesOutputSchema = {
  type: "object",
  properties: {
    collection: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string" },
          start_time: { type: "string", format: "date-time" },
          end_time: { type: "string", format: "date-time" },
          buffered_start_time: {
            type: ["string", "null"],
            format: "date-time",
          },
          buffered_end_time: {
            type: ["string", "null"],
            format: "date-time",
          },
          event: {
            type: ["object", "null"],
            properties: {
              uri: { type: "string" },
            },
          },
        },
        required: ["type", "start_time", "end_time"],
      },
    },
  },
  required: ["collection"],
};
