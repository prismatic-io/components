











const productObject = {
  id: 174,
  name: "1L Le Parfait Jar",
  type: "physical",
  sku: "JAR-001",
  description: "<p>Classic glass jar for preserving and storing.</p>",
  weight: 1,
  width: 0,
  depth: 0,
  height: 0,
  price: 7.95,
  cost_price: 0,
  retail_price: 10,
  sale_price: 0,
  map_price: 0,
  tax_class_id: 0,
  product_tax_code: "",
  calculated_price: 7.95,
  categories: [23, 21],
  brand_id: 36,
  brand_name: "Common Good",
  inventory_level: 0,
  inventory_warning_level: 0,
  inventory_tracking: "none",
  reviews_rating_sum: 0,
  reviews_count: 0,
  total_sold: 7,
  fixed_cost_shipping_price: 0,
  is_free_shipping: false,
  is_visible: true,
  is_featured: false,
  related_products: [-1],
  warranty: "",
  bin_picking_number: "",
  layout_file: "product.html",
  upc: "",
  mpn: "",
  gtin: "",
  search_keywords: "jar, glass",
  availability: "available",
  availability_description: "",
  gift_wrapping_options_type: "any",
  gift_wrapping_options_list: [],
  sort_order: 0,
  condition: "New",
  is_condition_shown: false,
  order_quantity_minimum: 0,
  order_quantity_maximum: 0,
  page_title: "",
  meta_keywords: [],
  meta_description: "",
  date_created: "2018-08-15T14:48:46+00:00",
  date_modified: "2018-09-05T20:42:07+00:00",
  view_count: 10,
  preorder_release_date: null,
  preorder_message: "",
  is_preorder_only: false,
  is_price_hidden: false,
  price_hidden_label: "",
  custom_url: {
    url: "/all/1l-le-parfait-jar/",
    is_customized: true,
  },
  base_variant_id: 345,
  open_graph_type: "product",
  open_graph_title: "",
  open_graph_description: "",
  open_graph_use_meta_description: true,
  open_graph_use_product_name: true,
  open_graph_use_image: true,
};

const paginationMeta = {
  pagination: {
    total: 36,
    count: 36,
    per_page: 50,
    current_page: 1,
    total_pages: 1,
    links: {
      current: "?page=1&limit=50",
    },
  },
};

export const getAllProductsExamplePayload = {
  data: {
    data: [productObject],
    meta: paginationMeta,
  },
};

export const createProductExamplePayload = {
  data: {
    data: productObject,
    meta: {},
  },
};

export const updateProductExamplePayload = {
  data: {
    data: productObject,
    meta: {},
  },
};

export const updateProductsBatchExamplePayload = {
  data: {
    data: [productObject],
    meta: {},
  },
};

export const deleteProductExamplePayload = {
  data: null,
};
