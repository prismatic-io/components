












const modifierObject = {
  id: 206,
  product_id: 158,
  name: "Insurance",
  display_name: "Insurance",
  type: "checkbox",
  required: true,
  sort_order: 0,
  config: {
    checkbox_label: "$5 for insurance",
    checked_by_default: false,
  },
  option_values: [
    {
      id: 183,
      option_id: 206,
      label: "Yes",
      sort_order: 0,
      value_data: {
        checked_value: true,
      },
      is_default: false,
      adjusters: {
        price: {
          adjuster: "relative",
          adjuster_value: 5,
        },
        weight: null,
        image_url: "",
        purchasing_disabled: {
          status: false,
          message: "",
        },
      },
    },
  ],
};

const paginationMeta = {
  pagination: {
    total: 1,
    count: 1,
    per_page: 50,
    current_page: 1,
    total_pages: 1,
    links: {
      current: "?page=1&limit=50",
    },
  },
};

export const getAllProductModifiersExamplePayload = {
  data: {
    data: [modifierObject],
    meta: paginationMeta,
  },
};

export const getModifierExamplePayload = {
  data: {
    data: modifierObject,
    meta: {},
  },
};

export const createProductModifierExamplePayload = {
  data: {
    data: modifierObject,
    meta: {},
  },
};

export const updateProductModifierExamplePayload = {
  data: {
    data: modifierObject,
    meta: {},
  },
};

export const deleteProductModifierExamplePayload = {
  data: null,
};

export const createModifierImageExamplePayload = {
  data: {
    data: {
      image_url:
        "https://cdn11.bigcommerce.com/s-abc123/modifiers/modifier-image.jpg",
    },
    meta: {},
  },
};
