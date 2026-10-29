const leadRecordSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    owner_id: { type: "integer" },
    creator_id: { type: "integer" },
    label_ids: { type: "array", items: { type: "string" } },
    person_id: { type: "integer" },
    organization_id: { type: "integer" },
    source_name: { type: "string" },
    origin: { type: "string" },
    origin_id: { type: "string" },
    channel: { type: "string" },
    channel_id: { type: "string" },
    is_archived: { type: "boolean" },
    was_seen: { type: "boolean" },
    value: {
      type: "object",
      properties: {
        amount: { type: "number" },
        currency: { type: "string" },
      },
    },
    expected_close_date: { type: "string" },
    next_activity_id: { type: "integer" },
    add_time: { type: "string" },
    update_time: { type: "string" },
    visible_to: { type: "string" },
    cc_email: { type: "string" },
  },
};

export const getLeadsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: leadRecordSchema },
        additional_data: {
          type: "object",
          properties: {
            pagination: {
              type: "object",
              properties: {
                start: { type: "integer" },
                limit: { type: "integer" },
                more_items_in_collection: { type: "boolean" },
              },
            },
          },
        },
      },
    },
  },
};

export const addLeadOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: leadRecordSchema,
      },
    },
  },
};

export const getLeadOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: leadRecordSchema,
      },
    },
  },
};

export const updateLeadOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: leadRecordSchema,
      },
    },
  },
};

export const deleteLeadOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
  },
};

export const searchLeadsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  result_score: { type: "number" },
                  item: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      type: { type: "string" },
                      title: { type: "string" },
                      owner: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                        },
                      },
                      person: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          name: { type: "string" },
                        },
                      },
                      organization: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          name: { type: "string" },
                        },
                      },
                      phones: { type: "array", items: {} },
                      emails: { type: "array", items: {} },
                      custom_fields: { type: "array", items: {} },
                      notes: { type: "array", items: {} },
                    },
                  },
                },
              },
            },
          },
        },
        additional_data: {
          type: "object",
          properties: {
            pagination: {
              type: "object",
              properties: {
                start: { type: "integer" },
                limit: { type: "integer" },
                more_items_in_collection: { type: "boolean" },
              },
            },
          },
        },
      },
    },
  },
};
