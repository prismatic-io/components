const filterRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    active_flag: { type: "boolean" },
    type: { type: "string" },
    temporary_flag: { type: "string" },
    user_id: { type: "integer" },
    add_time: { type: "string" },
    update_time: { type: "string" },
    visible_to: { type: "string" },
    custom_view_id: { type: "integer" },
    conditions: {
      type: "object",
      properties: {
        glue: { type: "string" },
        conditions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              glue: { type: "string" },
              conditions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    object: { type: "string" },
                    field_id: { type: "string" },
                    operator: { type: "string" },
                    value: { type: "string" },
                    extra_value: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getFiltersOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: filterRecordSchema },
      },
    },
  },
};

export const getFilterOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: filterRecordSchema,
      },
    },
  },
};

export const updateFilterOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: filterRecordSchema,
      },
    },
  },
};
