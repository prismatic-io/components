














const categoryTreeObject = {
  id: 1,
  name: "Default Category Tree",
  channels: [1],
};

const categoryNodeObject = {
  id: 19,
  parent_id: 0,
  depth: 0,
  path: [19],
  name: "Garden",
  is_visible: true,
  children: [],
};

const simplifiedCategoryObject = {
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
  url: {
    path: "/garden/",
    is_customized: false,
  },
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

export const getAllCategoryTreesExamplePayload = {
  data: {
    data: [categoryTreeObject],
    meta: paginationMeta,
  },
};

export const getCategoryTreeExamplePayload = {
  data: {
    data: [categoryNodeObject],
    meta: {},
  },
};

export const upsertCategoryTreesExamplePayload = {
  data: {
    data: [categoryTreeObject],
    meta: {},
  },
};

export const deleteCategoryTreesExamplePayload = {
  data: null,
};

export const getAllCategoriesSimpleExamplePayload = {
  data: {
    data: [simplifiedCategoryObject],
    meta: paginationMeta,
  },
};






export const createCategoryTreeExamplePayload = {
  data: {
    data: {
      id: 25,
      parent_id: 0,
      name: "New Category Tree",
      description: "",
      views: 0,
      sort_order: 0,
      page_title: "",
      meta_keywords: [],
      meta_description: "",
      layout_file: "category.html",
      image_url: "",
      is_visible: true,
      search_keywords: "",
      default_product_sort: "use_store_settings",
      custom_url: {
        url: "/new-category-tree/",
        is_customized: false,
      },
    },
    meta: {},
  },
};

export const updateCategoriesExamplePayload = {
  data: null,
};

export const deleteCategoriesTreeExamplePayload = {
  data: null,
};
