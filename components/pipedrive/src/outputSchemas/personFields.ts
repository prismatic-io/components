const personFieldRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    key: { type: "string" },
    name: { type: "string" },
    order_nr: { type: "integer" },
    field_type: { type: "string" },
    add_time: { type: "string" },
    update_time: { type: "string" },
    last_updated_by_user_id: { type: "integer" },
    active_flag: { type: "boolean" },
    edit_flag: { type: "boolean" },
    index_visible_flag: { type: "boolean" },
    details_visible_flag: { type: "boolean" },
    add_visible_flag: { type: "boolean" },
    important_flag: { type: "boolean" },
    bulk_edit_allowed: { type: "boolean" },
    searchable_flag: { type: "boolean" },
    filtering_allowed: { type: "boolean" },
    sortable_flag: { type: "boolean" },
    mandatory_flag: { type: "boolean" },
    options: {},
  },
};

const personFieldV2RecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    key: { type: "string" },
    name: { type: "string" },
    field_type: { type: "string" },
    group: { type: "string" },
    order_nr: { type: "integer" },
    is_searchable: { type: "boolean" },
    is_filterable: { type: "boolean" },
    is_sortable: { type: "boolean" },
    is_required: { type: "boolean" },
    add_time: { type: "string" },
    update_time: { type: "string" },
  },
};

export const getPersonFieldsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: personFieldRecordSchema },
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

export const getPersonFieldsV2OutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        data: { type: "array", items: personFieldV2RecordSchema },
        additional_data: {
          type: "object",
          properties: {
            next_cursor: { type: "string" },
          },
        },
      },
    },
  },
};

export const getPersonFieldOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: personFieldRecordSchema,
      },
    },
  },
};

export const getPersonFieldV2OutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: personFieldV2RecordSchema,
      },
    },
  },
};

export const deletePersonFieldOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
      },
    },
  },
};

export const deletePersonFieldV2OutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
      },
    },
  },
};
