









const orderData = {
  id: 11587429,
  order_number: "ORD-20240615-0042",
  reference_id: "ext-order-98712",
  status: "Processing",
  type: "DTC",
  created_date: "2024-06-15T14:22:00Z",
  purchase_date: "2024-06-15T14:18:45Z",
  channel: {
    id: 48291,
    name: "House of Slippers",
  },
  recipient: {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone_number: "+15551234567",
    address: {
      address1: "456 Oak Avenue",
      address2: "Suite 200",
      city: "Chicago",
      state: "IL",
      country: "US",
      zip_code: "60601",
      company_name: null,
    },
  },
  products: [
    {
      id: 29187456,
      reference_id: "TShirtBlueM",
      sku: "TShirtBlueM",
      gtin: "012345678905",
      upc: "012345678912",
      quantity: 2,
      unit_price: 20.32,
      external_line_id: null,
      quantity_unit_of_measure_code: null,
    },
  ],
  shipments: [],
  financials: {
    total_price: 40.64,
  },
  gift_message: null,
  shipping_method: "Standard",
  shipping_terms: {
    carrier_type: null,
    payment_term: null,
  },
  retailer_program_data: null,
  tags: [
    {
      name: "priority",
      value: "normal",
    },
  ],
};

export const getOrderExamplePayload = {
  data: orderData,
};

export const listOrdersExamplePayload = {
  data: [orderData],
};

export const createOrderExamplePayload = {
  data: orderData,
};

export const cancelOrderExamplePayload = {
  data: {
    order_id: 11587429,
    status: "Success",
    canceled_shipment_results: [
      {
        shipment_id: 33045821,
        action: "Cancel",
        is_success: true,
        reason: "Order canceled successfully",
      },
    ],
    order: orderData,
  },
};
