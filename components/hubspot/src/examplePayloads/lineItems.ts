import { BASE_URL } from "../constants";

export const listLineItemsExamplePayload = {
  data: {
    results: [
      {
        id: "54321098765",
        properties: {
          amount: "6000.00",
          createdate: "2024-01-10T10:20:30.456Z",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          hs_object_id: "54321098765",
          hs_product_id: "76543210987",
          name: "Professional Services Package",
          price: "6000.00",
          quantity: "1",
        },
        createdAt: "2024-01-10T10:20:30.456Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "54321098766",
        link: `${BASE_URL}/crm/objects/2026-09/line_items?limit=10&after=54321098766`,
      },
    },
  },
};

export const getLineItemExamplePayload = {
  data: {
    id: "54321098765",
    properties: {
      amount: "6000.00",
      createdate: "2024-01-10T10:20:30.456Z",
      hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
      hs_object_id: "54321098765",
      hs_product_id: "76543210987",
      name: "Professional Services Package",
      price: "6000.00",
      quantity: "1",
    },
    createdAt: "2024-01-10T10:20:30.456Z",
    updatedAt: "2024-01-15T14:22:10.456Z",
    archived: false,
  },
};

export const deleteLineItemExamplePayload = { data: "" };

export const createLineItemExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:31:42.469Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      name: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "1 Year Implementation Consultation",
          timestamp: "2024-01-15T00:31:42.469Z",
        },
      ],
    },
    id: "54321098767",
    properties: {
      name: "1 Year Implementation Consultation",
      price: "12000.00",
      quantity: "1",
      hs_product_id: "76543210988",
      recurringbillingfrequency: "annually",
      hs_recurring_billing_period: "P12M",
      amount: "12000.00",
    },
    updatedAt: "2024-01-15T00:31:42.469Z",
  },
};

export const updateLineItemExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:31:42.485Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      quantity: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "2",
          timestamp: "2024-01-16T11:45:30.250Z",
        },
      ],
      amount: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "24000.00",
          timestamp: "2024-01-16T11:45:30.250Z",
        },
      ],
    },
    id: "54321098767",
    properties: {
      name: "1 Year Implementation Consultation",
      price: "12000.00",
      quantity: "2",
      hs_product_id: "76543210988",
      recurringbillingfrequency: "annually",
      hs_recurring_billing_period: "P12M",
      amount: "24000.00",
    },
    updatedAt: "2024-01-16T11:45:30.250Z",
  },
};
