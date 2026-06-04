










const customFieldObject = {
  id: 1,
  name: "Material",
  value: "Borosilicate Glass",
};

const paginationMeta = {
  pagination: {
    total: 2,
    count: 2,
    per_page: 50,
    current_page: 1,
    total_pages: 1,
    links: {
      current: "?page=1&limit=50",
    },
  },
};

export const getProductCustomFieldsExamplePayload = {
  data: {
    data: [customFieldObject],
    meta: paginationMeta,
  },
};

export const createCustomFieldExamplePayload = {
  data: {
    data: customFieldObject,
    meta: {},
  },
};

export const updateCustomFieldExamplePayload = {
  data: {
    data: customFieldObject,
    meta: {},
  },
};

export const deleteCustomFieldExamplePayload = {
  data: null,
};
