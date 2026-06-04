








const productData = {
  id: 29187456,
  reference_id: "TShirtBlueM",
  bundle_root_information: {
    id: 11042,
    name: "Blue T-Shirt Bundle",
  },
  created_date: "2024-06-15T09:22:31Z",
  channel: {
    id: 48291,
    name: "House of Slippers",
  },
  sku: "TShirtBlueM",
  name: "Medium Blue T-Shirt",
  barcode: "123456789012",
  gtin: "012345678905",
  upc: "012345678912",
  unit_price: 20.32,
  total_fulfillable_quantity: 480,
  total_onhand_quantity: 500,
  total_committed_quantity: 20,
  fulfillable_inventory_items: [
    {
      id: 78234,
      name: "Medium Blue T-Shirt",
      quantity: 480,
    },
  ],
  fulfillable_quantity_by_fulfillment_center: [
    {
      id: 5,
      name: "Cicero (IL)",
      onhand_quantity: 300,
      fulfillable_quantity: 280,
      committed_quantity: 20,
    },
  ],
};

export const getProductExamplePayload = {
  data: productData,
};

export const listProductExamplePayload = {
  data: [productData],
};

export const updateProductExamplePayload = {
  data: productData,
};
