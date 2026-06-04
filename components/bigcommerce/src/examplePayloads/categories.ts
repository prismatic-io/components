













const categoryObject = {
  id: 19,
  parent_id: 0,
  name: "Garden",
  description: "<p>This is the garden description</p>",
  views: 0,
  sort_order: 2,
  page_title: "Garden Supplies",
  meta_keywords: ["garden", "outdoor", "plants"],
  meta_description: "Browse our selection of garden supplies and tools.",
  layout_file: "category.html",
  image_url: "",
  is_visible: true,
  search_keywords: "garden, outdoor, plants",
  default_product_sort: "use_store_settings",
  custom_url: {
    url: "/garden/",
    is_customized: false,
  },
};

const paginationMeta = {
  pagination: {
    total: 6,
    count: 6,
    per_page: 50,
    current_page: 1,
    total_pages: 1,
    links: {
      current: "?page=1&limit=50",
    },
  },
};

export const getAllCategoriesExamplePayload = {
  data: {
    data: [categoryObject],
    meta: paginationMeta,
  },
};

export const getCategoryExamplePayload = {
  data: {
    data: categoryObject,
    meta: {},
  },
};

export const createCategoryExamplePayload = {
  data: {
    data: categoryObject,
    meta: {},
  },
};

export const updateCategoryExamplePayload = {
  data: {
    data: categoryObject,
    meta: {},
  },
};

export const deleteCategoriesExamplePayload = {
  data: null,
};

export const createCategoryImageExamplePayload = {
  data: {
    data: {
      image_url: "https://cdn11.bigcommerce.com/s-abc123/categories/garden.jpg",
    },
    meta: {},
  },
};

export const deleteCategoryImageExamplePayload = {
  data: null,
};
