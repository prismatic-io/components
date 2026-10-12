const filterRecord = {
  id: 1,
  name: "Active Deals",
  active_flag: true,
  type: "deals",
  temporary_flag: null,
  user_id: 18487521,
  add_time: "2024-06-15 10:00:00",
  update_time: "2024-06-15 10:00:00",
  visible_to: "3",
  custom_view_id: null,
  conditions: {
    glue: "and",
    conditions: [
      {
        glue: "and",
        conditions: [
          {
            object: "deal",
            field_id: "status",
            operator: "=",
            value: "open",
            extra_value: null,
          },
        ],
      },
    ],
  },
};
export const getFiltersExamplePayload = {
  data: {
    success: true,
    data: [filterRecord],
  },
};
export const getFilterExamplePayload = {
  data: {
    success: true,
    data: filterRecord,
  },
};
export const updateFilterExamplePayload = {
  data: {
    success: true,
    data: filterRecord,
  },
};
