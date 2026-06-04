






export const listOrdersResponse = [
  {
    id: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
    order_ref: "NA13334",
    net_price: 0,
    date_created: "2018-10-25T14:26:01+00:00",
    username: "jane.smith@example.com",
    account_name: "Bynder",
    order_status: "In production",
    currency_symbol: "8364",
  },
  {
    id: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
    order_ref: "US12774",
    net_price: 79,
    date_created: "2018-09-10T12:12:21+00:00",
    username: "jane.smith@example.com",
    account_name: "Bynder",
    order_status: "Waiting for approval",
    currency_symbol: "36",
  },
];

export const getOrderInfoResponse = {
  id: "A1B2C3D4-E5F6-7890-A1B2C3D4E5F67890",
  dateCreated: "2015-06-01T08:36:18Z",
  status: "IN_PRODUCTION",
  orderReference: "NL0456",
};

export const getOrderResponse = [
  {
    id: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
    orderId: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
    product: {
      id: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
      name: "Train the trainer product",
      description: "This is such a nice product!",
      isFeatured: false,
      product_number: "999999999",
      supplier_number: null,
      size_height: 1,
      size_width: 1,
      size_depth: 1,
      weight: 1,
      min_quantity: 1,
      max_quantity: 10,
      default_quantity: 1,
      datecreated: "2016-08-10T12:14:16+00:00",
      isActive: true,
      product_type: "print",
      product_package: "unit",
      countries: null,
      sku: "1",
      step: 1,
      display_length_unit: "cm",
      isFree: false,
      pages: null,
      language: null,
      supplier_version_specifier: null,
      isShipping: false,
    },
    referenceId: "999999999",
    name: "Train the trainer product",
    description: "",
    itemPrice: 0.2333,
    quantity: 3,
    supplier: null,
    customerReference: null,
    metaproperties: null,
  },
];
