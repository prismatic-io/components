













const brandObject = {
  id: 36,
  name: "Common Good",
  page_title: "Common Good",
  meta_keywords: ["modern", "clean", "contemporary"],
  meta_description:
    "Common Good is a modern brand focused on sustainable household products.",
  image_url: "https://cdn11.bigcommerce.com/s-abc123/brands/common-good.jpg",
  search_keywords: "common good, sustainable, household",
  custom_url: {
    url: "/brands/common-good/",
    is_customized: false,
  },
};

const paginationMeta = {
  pagination: {
    total: 15,
    count: 15,
    per_page: 50,
    current_page: 1,
    total_pages: 1,
    links: {
      current: "?page=1&limit=50",
    },
  },
};

export const listBrandsExamplePayload = {
  data: {
    data: [brandObject],
    meta: paginationMeta,
  },
};

export const getBrandExamplePayload = {
  data: {
    data: brandObject,
    meta: {},
  },
};

export const createBrandExamplePayload = {
  data: {
    data: brandObject,
    meta: {},
  },
};

export const updateBrandExamplePayload = {
  data: {
    data: brandObject,
    meta: {},
  },
};

export const deleteBrandExamplePayload = {
  data: null,
};

export const createBrandImageExamplePayload = {
  data: {
    data: {
      image_url:
        "https://cdn11.bigcommerce.com/s-abc123/brands/common-good.jpg",
    },
    meta: {},
  },
};

export const deleteBrandImageExamplePayload = {
  data: null,
};
