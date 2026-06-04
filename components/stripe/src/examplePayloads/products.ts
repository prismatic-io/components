





export const getProductExamplePayload = {
  data: {
    id: "prod_NWjs8kKbJWmuuc",
    object: "product",
    active: true,
    attributes: [],
    created: 1716397800,
    default_price: null,
    description: "Comfortable cotton t-shirt available in multiple sizes.",
    features: [],
    images: ["https://files.example.com/products/tshirt.png"],
    livemode: false,
    metadata: {},
    name: "T-shirt",
    package_dimensions: null,
    shippable: true,
    statement_descriptor: null,
    tax_code: null,
    type: "good",
    unit_label: null,
    updated: 1716397800,
    url: "https://example.com/products/tshirt",
  } as unknown,
};




export const createProductExamplePayload = getProductExamplePayload;




export const updateProductExamplePayload = getProductExamplePayload;






export const deleteProductExamplePayload = {
  data: {
    id: "prod_NWjs8kKbJWmuuc",
    object: "product",
    deleted: true,
  } as unknown,
};






export const listProductsExamplePayload = {
  data: {
    object: "list",
    data: [getProductExamplePayload.data],
    has_more: false,
    url: "/v1/products",
  } as unknown,
};
