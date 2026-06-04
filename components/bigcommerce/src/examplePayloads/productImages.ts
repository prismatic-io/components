











const productImageObject = {
  id: 382,
  product_id: 174,
  is_thumbnail: true,
  sort_order: 0,
  description: "Main product image",
  image_file: "products/174/images/jar-main__52168.1534347946.jpg",
  url_zoom:
    "https://cdn11.bigcommerce.com/s-abc123/images/stencil/1280x1280/products/174/382/jar-main__52168.1534347946.jpg",
  url_standard:
    "https://cdn11.bigcommerce.com/s-abc123/images/stencil/500x659/products/174/382/jar-main__52168.1534347946.jpg",
  url_thumbnail:
    "https://cdn11.bigcommerce.com/s-abc123/images/stencil/100x100/products/174/382/jar-main__52168.1534347946.jpg",
  url_tiny:
    "https://cdn11.bigcommerce.com/s-abc123/images/stencil/44x44/products/174/382/jar-main__52168.1534347946.jpg",
  date_modified: "2018-08-15T14:49:15+00:00",
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

export const getAllProductImagesExamplePayload = {
  data: {
    data: [productImageObject],
    meta: paginationMeta,
  },
};

export const getProductImageExamplePayload = {
  data: {
    data: productImageObject,
    meta: {},
  },
};

export const createProductImageExamplePayload = {
  data: {
    data: productImageObject,
    meta: {},
  },
};

export const updateProductImageExamplePayload = {
  data: {
    data: productImageObject,
    meta: {},
  },
};

export const deleteProductImageExamplePayload = {
  data: null,
};
