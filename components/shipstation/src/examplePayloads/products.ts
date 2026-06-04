





export const getProductExamplePayload = {
  data: {
    aliases: null,
    productId: 12345678,
    sku: "1004",
    name: "Coffee Mug",
    price: 26,
    defaultCost: 0,
    length: 3,
    width: 3,
    height: 3,
    weightOz: 26,
    internalNotes: null,
    fulfillmentSku: "F1004",
    createDate: "2014-09-04T09:18:01.293",
    modifyDate: "2014-09-18T12:38:43.893",
    active: true,
    productCategory: {
      categoryId: 9999,
      name: "Door Closers",
    },
    productType: null,
    warehouseLocation: "Bin 22",
    defaultCarrierCode: "fedex",
    defaultServiceCode: "fedex_home_delivery",
    defaultPackageCode: "package",
    defaultIntlCarrierCode: "ups",
    defaultIntlServiceCode: "ups_worldwide_saver",
    defaultIntlPackageCode: "package",
    defaultConfirmation: "direct_signature",
    defaultIntlConfirmation: "adult_signature",
    customsDescription: null,
    customsValue: null,
    customsTariffNo: null,
    customsCountryCode: null,
    noCustoms: null,
    tags: [{ tagId: 9180, name: "APItest" }],
    upc: "012345678905",
    thumbnailURL: "url_to_thumbnail_image",
  },
};







export const listProductsExamplePayload = {
  data: {
    products: [getProductExamplePayload.data],
    total: 1,
    page: 1,
    pages: 1,
  },
};







export const updateProductExamplePayload = {
  data: {
    success: true,
    message: "The requested product has been updated",
  },
};
