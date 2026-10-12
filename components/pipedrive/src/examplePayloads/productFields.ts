const productFieldRecord = {
  id: 1,
  key: "name",
  name: "Name",
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
const productFieldV2Record = {
  id: 1,
  key: "name",
  name: "Name",
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
export const getProductFieldsExamplePayload = {
  data: {
    success: true,
    data: [productFieldRecord],
    additional_data: {
      pagination: {
        start: 0,
        limit: 100,
        more_items_in_collection: false,
      },
    },
  },
};
export const getProductFieldsV2ExamplePayload = {
  data: {
    data: [productFieldV2Record],
    additional_data: { next_cursor: "eyJpZCI6Mn0" },
  },
};
export const getProductFieldExamplePayload = {
  data: {
    success: true,
    data: productFieldRecord,
  },
};
export const getProductFieldV2ExamplePayload = {
  data: {
    success: true,
    data: productFieldV2Record,
  },
};
export const deleteProductFieldExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};
export const deleteProductFieldV2ExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};
