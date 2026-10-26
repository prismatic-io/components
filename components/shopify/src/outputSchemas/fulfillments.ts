import { moneyV2Schema } from "./shared";
const gqlFulfillmentLineItemSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    lineItem: {
      type: "object" as const,
      properties: {
        title: { type: "string" as const },
        quantity: { type: "number" as const },
        originalUnitPriceSet: {
          type: "object" as const,
          properties: {
            shopMoney: moneyV2Schema,
            presentmentMoney: moneyV2Schema,
          },
        },
        totalDiscountSet: {
          type: "object" as const,
          properties: {
            shopMoney: moneyV2Schema,
            presentmentMoney: moneyV2Schema,
          },
        },
        discountAllocations: {
          type: "array" as const,
          items: { type: "object" },
        },
        duties: { type: "array" as const, items: { type: "object" } },
        discountedTotalSet: {
          type: "object" as const,
          properties: { shopMoney: moneyV2Schema },
        },
        variant: { type: ["object", "null"] },
        requiresShipping: { type: "boolean" as const },
        vendor: { type: "string" as const },
        sku: { type: ["string", "null"] },
        taxable: { type: "boolean" as const },
        isGiftCard: { type: "boolean" as const },
        name: { type: "string" as const },
      },
    },
  },
};
const gqlFulfillmentSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    order: {
      type: "object" as const,
      properties: { id: { type: "string" as const } },
    },
    status: { type: "string" as const },
    createdAt: { type: "string" as const },
    updatedAt: { type: "string" as const },
    service: {
      type: "object" as const,
      properties: { type: { type: "string" as const } },
    },
    trackingInfo: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          company: { type: ["string", "null"] },
          number: { type: ["string", "null"] },
          url: { type: ["string", "null"] },
        },
      },
    },
    location: {
      type: "object" as const,
      properties: { id: { type: "string" as const } },
    },
    originAddress: {
      type: ["object", "null"],
      properties: {
        address1: { type: ["string", "null"] },
        address2: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        countryCode: { type: ["string", "null"] },
        provinceCode: { type: ["string", "null"] },
        zip: { type: ["string", "null"] },
      },
    },
    fulfillmentLineItems: {
      type: "object" as const,
      properties: {
        nodes: { type: "array" as const, items: gqlFulfillmentLineItemSchema },
      },
    },
    name: { type: "string" as const },
  },
};
const restFulfillmentSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" as const },
    order_id: { type: "number" as const },
    status: { type: "string" as const },
    created_at: { type: "string" as const },
    service: { type: "string" as const },
    updated_at: { type: "string" as const },
    tracking_company: { type: ["string", "null"] },
    location_id: { type: "number" as const },
    origin_address: { type: ["object", "null"] },
    line_items: { type: "array" as const, items: { type: "object" } },
    tracking_number: { type: ["string", "null"] },
    tracking_numbers: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    tracking_url: { type: ["string", "null"] },
    tracking_urls: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    name: { type: "string" as const },
    admin_graphql_api_id: { type: "string" as const },
  },
};
export const getFulfillmentGqlOutputSchema = {
  type: "object" as const,
  properties: {
    fulfillment: gqlFulfillmentSchema,
  },
};
export const listFulfillmentsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        fulfillments: { type: "array" as const, items: restFulfillmentSchema },
      },
    },
  },
};
const restFulfillmentOrderSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" as const },
    order_id: { type: "number" as const },
    request_status: { type: "string" as const },
    status: { type: "string" as const },
    supported_actions: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    destination: { type: ["object", "null"] },
    line_items: { type: "array" as const, items: { type: "object" } },
    international_duties: { type: ["object", "null"] },
    fulfill_at: { type: ["string", "null"] },
    fulfill_by: { type: ["string", "null"] },
    fulfillment_holds: { type: "array" as const, items: { type: "object" } },
    created_at: { type: "string" as const },
    updated_at: { type: "string" as const },
    delivery_method: { type: ["object", "null"] },
    assigned_location: { type: "object" },
    merchant_requests: { type: "array" as const, items: { type: "object" } },
  },
};
export const getFulfillmentOrderOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        fulfillment_order: restFulfillmentOrderSchema,
      },
    },
  },
};
export const getFulfillmentOrderGqlOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        fulfillment_order: restFulfillmentOrderSchema,
      },
    },
  },
};
export const listFulfillmentOrdersOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        fulfillment_orders: {
          type: "array" as const,
          items: restFulfillmentOrderSchema,
        },
      },
    },
    pagination: {
      type: ["object", "null"],
      properties: {
        next: {
          type: "object" as const,
          properties: {
            page_info: { type: "string" as const },
            rel: { type: "string" as const },
          },
        },
      },
    },
    pageInfo: { type: ["string", "null"] },
    rel: { type: ["string", "null"] },
  },
};
export const listFulfillmentOrdersGqlOutputSchema =
  listFulfillmentOrdersOutputSchema;
export const listFulfillmentsGqlOutputSchema = listFulfillmentsOutputSchema;
