const activityTypeRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    order_nr: { type: "integer" },
    name: { type: "string" },
    key_string: { type: "string" },
    icon_key: { type: "string" },
    active_flag: { type: "boolean" },
    color: { type: "string" },
    is_custom_flag: { type: "boolean" },
    add_time: { type: "string" },
    update_time: { type: "string" },
  },
};
export const getActivityTypesOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: activityTypeRecordSchema },
      },
    },
  },
};
