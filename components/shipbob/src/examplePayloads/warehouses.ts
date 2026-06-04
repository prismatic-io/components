













const receivingOrderData = {
  id: 5042781,
  purchase_order_number: "PO-2024-06-150042",
  status: "Awaiting",
  box_packaging_type: "OneSkuPerBox",
  package_type: "Package",
  expected_arrival_date: "2024-06-25T00:00:00Z",
  insert_date: "2024-06-15T11:30:00Z",
  last_updated_date: "2024-06-15T11:30:00Z",
  box_labels_uri: null,
  fulfillment_center: {
    id: 5,
    name: "Cicero (IL)",
    address1: "4415 S Sacramento Ave",
    address2: null,
    city: "Chicago",
    state: "IL",
    zip_code: "60632",
    country: "US",
    phone_number: "+13125551234",
    email: "cicero-fc@shipbob.com",
    timezone: "America/Chicago",
  },
  boxes: [
    {
      box_id: 982341,
      box_number: 1,
      box_status: "Awaiting",
      tracking_number: "1Z999AA10123456790",
      arrived_date: null,
      received_date: null,
      counting_started_date: null,
      box_items: [
        {
          inventory_id: 78234,
          quantity: 100,
          received_quantity: 0,
          lot_number: "LOT-2024-0618",
          lot_date: "2025-12-31T00:00:00Z",
        },
      ],
    },
  ],
};

export const listWarehouseReceivingOrdersExamplePayload = {
  data: [receivingOrderData],
};

export const getWarehouseReceivingOrdersExamplePayload = {
  data: receivingOrderData,
};

export const createWarehouseReceivingOrderExamplePayload = {
  data: receivingOrderData,
};

export const cancelWarehouseReceivingOrderExamplePayload = {
  data: null,
};







export const getWarehouseReceivingOrderBoxLabelsExamplePayload = {
  data: null,
};
