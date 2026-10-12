const dealFieldRecord = {
  id: 12345,
  key: "title",
  name: "Title",
  order_nr: 1,
  field_type: "varchar",
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
  searchable_flag: true,
  filtering_allowed: true,
  sortable_flag: true,
  mandatory_flag: true,
  options: null,
};
const dealFieldV2Record = {
  id: 12345,
  key: "title",
  name: "Title",
  field_type: "varchar",
  group: "system",
  order_nr: 1,
  is_searchable: true,
  is_filterable: true,
  is_sortable: true,
  is_required: true,
  add_time: "2024-01-01T00:00:00Z",
  update_time: "2024-01-01T00:00:00Z",
};
export const getDealFieldsExamplePayload = {
  data: {
    success: true,
    data: [dealFieldRecord],
    additional_data: {
      pagination: {
        start: 0,
        limit: 100,
        more_items_in_collection: false,
      },
    },
  },
};
export const getDealFieldsV2ExamplePayload = {
  data: {
    data: [dealFieldV2Record],
    additional_data: { next_cursor: "eyJpZCI6Mn0" },
  },
};
export const getDealFieldExamplePayload = {
  data: {
    success: true,
    data: dealFieldRecord,
  },
};
export const getDealFieldV2ExamplePayload = {
  data: {
    success: true,
    data: dealFieldV2Record,
  },
};
export const deleteDealFieldExamplePayload = {
  data: {
    success: true,
    data: {
      id: 12345,
    },
  },
};
export const deleteDealFieldV2ExamplePayload = {
  data: {
    success: true,
    data: {
      id: 12345,
    },
  },
};
