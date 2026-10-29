const activityFieldRecord = {
  id: 1,
  key: "due_date",
  name: "Due Date",
  order_nr: 1,
  field_type: "date",
  add_time: "2024-01-01 00:00:00",
  update_time: "2024-01-01 00:00:00",
  last_updated_by_user_id: null,
  active_flag: true,
  edit_flag: false,
  index_visible_flag: true,
  details_visible_flag: true,
  add_visible_flag: true,
  important_flag: true,
  bulk_edit_allowed: true,
  searchable_flag: false,
  filtering_allowed: true,
  sortable_flag: true,
  mandatory_flag: true,
};

const activityFieldV2Record = {
  id: 1,
  key: "due_date",
  name: "Due Date",
  field_type: "date",
  group: "system",
  order_nr: 1,
  is_searchable: false,
  is_filterable: true,
  is_sortable: true,
  is_required: true,
  add_time: "2024-01-01T00:00:00Z",
  update_time: "2024-01-01T00:00:00Z",
};

export const getActivityFieldsExamplePayload = {
  data: {
    success: true,
    data: [activityFieldRecord],
    additional_data: {
      pagination: {
        start: 0,
        limit: 100,
        more_items_in_collection: false,
      },
    },
  },
};

export const getActivityFieldsV2ExamplePayload = {
  data: {
    data: [activityFieldV2Record],
    additional_data: { next_cursor: "eyJpZCI6Mn0" },
  },
};
