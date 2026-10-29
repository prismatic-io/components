const productFieldRecordSchema = {
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

const productFieldV2RecordSchema = {
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

export const getProductFieldsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: productFieldRecordSchema },
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

export const getProductFieldsV2OutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        data: { type: "array", items: productFieldV2RecordSchema },
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

export const getProductFieldOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: productFieldRecordSchema,
      },
    },
  },
};

export const getProductFieldV2OutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: productFieldV2RecordSchema,
      },
    },
  },
};

export const deleteProductFieldOutputSchema = {
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

export const deleteProductFieldV2OutputSchema = {
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
