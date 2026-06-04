












const variantObject = {
  id: 384,
  product_id: 192,
  sku: "SMIT-2",
  sku_id: 350,
  price: 25,
  calculated_price: 25,
  sale_price: 20,
  retail_price: 25,
  map_price: null,
  weight: 2,
  calculated_weight: 1,
  width: 5,
  height: 5,
  depth: 5,
  is_free_shipping: false,
  fixed_cost_shipping_price: 10,
  purchasing_disabled: false,
  purchasing_disabled_message: "",
  image_url: "",
  cost_price: 25,
  upc: "",
  mpn: "",
  gtin: "",
  inventory_level: 0,
  inventory_warning_level: 0,
  bin_picking_number: "",
  option_values: [
    {
      id: 176,
      label: "Black",
      option_id: 220,
      option_display_name: "Color",
    },
  ],
};

const paginationMeta = {
  pagination: {
    total: 3,
    count: 3,
    per_page: 50,
    current_page: 1,
    total_pages: 1,
    links: {
      current: "?page=1&limit=50",
    },
  },
};

export const getAllProductVariantsExamplePayload = {
  data: {
    data: [variantObject],
    meta: paginationMeta,
  },
};

export const getProductVariantExamplePayload = {
  data: {
    data: variantObject,
    meta: {},
  },
};

export const createProductVariantExamplePayload = {
  data: {
    data: variantObject,
    meta: {},
  },
};

export const updateProductVariantExamplePayload = {
  data: {
    data: variantObject,
    meta: {},
  },
};

export const deleteProductVariantExamplePayload = {
  data: null,
};

export const createVariantImageExamplePayload = {
  data: {
    data: {
      image_url:
        "https://cdn11.bigcommerce.com/s-abc123/variants/variant-image.jpg",
    },
    meta: {},
  },
};
