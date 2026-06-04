









const shipmentData = {
  id: 33045821,
  order_id: 11587429,
  reference_id: "ext-order-98712",
  created_date: "2024-06-15T14:25:00Z",
  last_update_at: "2024-06-16T10:30:00Z",
  last_tracking_update_at: "2024-06-16T10:30:00Z",
  actual_fulfillment_date: "2024-06-16T08:00:00Z",
  estimated_fulfillment_date: "2024-06-17T00:00:00Z",
  delivery_date: null,
  estimated_fulfillment_date_status: "FulfilledOnTime",
  status: "Completed",
  gift_message: null,
  require_signature: false,
  is_tracking_uploaded: true,
  insurance_value: null,
  invoice_amount: 40.64,
  invoice_currency_code: "USD",
  ship_option: "Standard",
  package_material_type: "Box",
  location: {
    id: 5,
    name: "Cicero (IL)",
  },
  recipient: {
    name: "Jane Smith",
    full_name: "Jane Smith",
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
  tracking: {
    tracking_number: "1Z999AA10123456784",
    tracking_url: "https://www.ups.com/track?tracknum=1Z999AA10123456784",
    carrier: "UPS",
    carrier_service: "UPS Ground",
    shipping_date: "2024-06-16T08:00:00Z",
    bol: null,
    pro_number: null,
    scac: null,
  },
  measurements: {
    length_in: 12,
    width_in: 10,
    depth_in: 4,
    total_weight_oz: 18,
  },
  products: [
    {
      id: 29187456,
      name: "Medium Blue T-Shirt",
      sku: "TShirtBlueM",
      reference_id: "TShirtBlueM",
      inventory_items: [
        {
          id: 78234,
          name: "Medium Blue T-Shirt",
          quantity: 2,
          quantity_committed: 2,
          lot: "LOT-2024-0618",
          expiration_date: "2025-12-31T00:00:00Z",
          is_dangerous_goods: false,
          serial_numbers: null,
        },
      ],
    },
  ],
  parent_cartons: [],
  status_details: [],
};

export const getShipmentExamplePayload = {
  data: shipmentData,
};

export const getAllShipmentsForOrderExamplePayload = {
  data: [shipmentData],
};

export const cancelShipmentExamplePayload = {
  data: {
    results: [
      {
        shipment_id: 33045821,
        action: "Cancel",
        is_success: true,
        reason: "Shipment successfully cancelled",
      },
    ],
  },
};

export const getLogsShipmentExamplePayload = {
  data: [
    {
      log_type_id: 1,
      log_type_name: "ShipmentCreated",
      log_type_text: "Shipment was created",
      metadata: null,
      timestamp: "2024-06-15T14:25:00Z",
    },
    {
      log_type_id: 4,
      log_type_name: "ShipmentShipped",
      log_type_text: "Shipment has been shipped",
      metadata: {
        carrier: "UPS",
        tracking_number: "1Z999AA10123456784",
      },
      timestamp: "2024-06-16T08:00:00Z",
    },
  ],
};
