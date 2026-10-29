const personFieldDetailSchema = {
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
    options: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          label: { type: "string" },
        },
      },
    },
  },
};

const personRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    company_id: { type: "integer" },
    owner_id: { type: "integer" },
    org_id: { type: "integer" },
    name: { type: "string" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    open_deals_count: { type: "integer" },
    related_open_deals_count: { type: "integer" },
    closed_deals_count: { type: "integer" },
    related_closed_deals_count: { type: "integer" },
    participant_open_deals_count: { type: "integer" },
    participant_closed_deals_count: { type: "integer" },
    email_messages_count: { type: "integer" },
    activities_count: { type: "integer" },
    done_activities_count: { type: "integer" },
    undone_activities_count: { type: "integer" },
    files_count: { type: "integer" },
    notes_count: { type: "integer" },
    followers_count: { type: "integer" },
    won_deals_count: { type: "integer" },
    related_won_deals_count: { type: "integer" },
    lost_deals_count: { type: "integer" },
    related_lost_deals_count: { type: "integer" },
    active_flag: { type: "boolean" },
    phone: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: { type: "string" },
          primary: { type: "boolean" },
        },
      },
    },
    email: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: { type: "string" },
          primary: { type: "boolean" },
        },
      },
    },
    first_char: { type: "string" },
    update_time: { type: "string" },
    add_time: { type: "string" },
    visible_to: { type: "string" },
    picture_id: { type: "integer" },
    label: { type: "string" },
    org_name: { type: "string" },
    cc_email: { type: "string" },
  },
};

export const getPersonFieldDetailsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: personFieldDetailSchema,
      },
    },
  },
};

export const setFieldValueForPersonOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: personRecordSchema,
      },
    },
  },
};
