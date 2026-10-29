import { BASE_URL } from "../constants";

export const listProductsExamplePayload = {
  data: {
    results: [
      {
        id: "76543210987",
        properties: {
          createdate: "2024-01-05T08:15:20.123Z",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          hs_object_id: "76543210987",
          name: "Enterprise Software License",
          price: "25000.00",
          description:
            "Annual enterprise software license with premium support",
          hs_sku: "ENT-SW-001",
        },
        createdAt: "2024-01-05T08:15:20.123Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "76543210988",
        link: `${BASE_URL}/crm/objects/2026-09/products?limit=10&after=76543210988`,
      },
    },
  },
};

export const getProductExamplePayload = {
  data: {
    id: "76543210987",
    properties: {
      createdate: "2024-01-05T08:15:20.123Z",
      hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
      hs_object_id: "76543210987",
      name: "Enterprise Software License",
      price: "25000.00",
      description: "Annual enterprise software license with premium support",
      hs_sku: "ENT-SW-001",
    },
    createdAt: "2024-01-05T08:15:20.123Z",
    updatedAt: "2024-01-15T14:22:10.456Z",
    archived: false,
  },
};

export const deleteProductExamplePayload = { data: "" };

export const createProductExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:35:05.442Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      name: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "Professional Services - Implementation",
          timestamp: "2024-01-15T00:35:05.442Z",
        },
      ],
    },
    id: "76543210989",
    properties: {
      name: "Professional Services - Implementation",
      price: "8500.00",
      hs_sku: "PS-IMP-002",
      description:
        "Full implementation service including data migration and training",
      hs_cost_of_goods_sold: "2500.00",
      hs_recurring_billing_period: "P0M",
    },
    updatedAt: "2024-01-15T00:35:05.442Z",
  },
};

export const updateProductExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:35:05.457Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      price: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "9000.00",
          timestamp: "2024-01-16T12:10:45.680Z",
        },
      ],
      description: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value:
            "Full implementation service including data migration, training, and 30-day support",
          timestamp: "2024-01-16T12:10:45.680Z",
        },
      ],
    },
    id: "76543210989",
    properties: {
      name: "Professional Services - Implementation",
      price: "9000.00",
      hs_sku: "PS-IMP-002",
      description:
        "Full implementation service including data migration, training, and 30-day support",
      hs_cost_of_goods_sold: "2500.00",
      hs_recurring_billing_period: "P0M",
    },
    updatedAt: "2024-01-16T12:10:45.680Z",
  },
};
