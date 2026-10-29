import { countSchema, moneyV2Schema, userErrorsArraySchema } from "./shared";

const gqlAddressSchema = {
  type: "object" as const,
  properties: {
    firstName: { type: ["string", "null"] },
    address1: { type: ["string", "null"] },
    phone: { type: ["string", "null"] },
    city: { type: ["string", "null"] },
    zip: { type: ["string", "null"] },
    province: { type: ["string", "null"] },
    country: { type: ["string", "null"] },
    lastName: { type: ["string", "null"] },
    address2: { type: ["string", "null"] },
    company: { type: ["string", "null"] },
    latitude: { type: ["number", "null"] },
    longitude: { type: ["number", "null"] },
    name: { type: ["string", "null"] },
    countryCodeV2: { type: ["string", "null"] },
    provinceCode: { type: ["string", "null"] },
  },
};

const shopMoneySchema = {
  type: "object" as const,
  properties: {
    shopMoney: moneyV2Schema,
  },
};

const gqlDraftOrderSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    note2: { type: ["string", "null"] },
    email: { type: ["string", "null"] },
    taxesIncluded: { type: "boolean" as const },
    currencyCode: { type: "string" as const },
    invoiceSentAt: { type: ["string", "null"] },
    createdAt: { type: "string" as const },
    updatedAt: { type: "string" as const },
    taxExempt: { type: "boolean" as const },
    completedAt: { type: ["string", "null"] },
    name: { type: "string" as const },
    status: { type: "string" as const },
    lineItems: {
      type: "object" as const,
      properties: {
        nodes: {
          type: "array" as const,
          items: {
            type: "object" as const,
            properties: {
              id: { type: "string" as const },
              variant: { type: ["object", "null"] },
              product: { type: ["object", "null"] },
              title: { type: "string" as const },
              variantTitle: { type: ["string", "null"] },
              sku: { type: ["string", "null"] },
              vendor: { type: ["string", "null"] },
              quantity: { type: "number" as const },
              requiresShipping: { type: "boolean" as const },
              taxable: { type: "boolean" as const },
              isGiftCard: { type: "boolean" as const },
              fulfillmentService: {
                type: "object" as const,
                properties: { type: { type: "string" as const } },
              },
              weight: {
                type: "object" as const,
                properties: {
                  unit: { type: "string" as const },
                  value: { type: "number" as const },
                },
              },
              taxLines: { type: "array" as const, items: { type: "object" } },
              appliedDiscount: { type: ["object", "null"] },
              name: { type: "string" as const },
              custom: { type: "boolean" as const },
              originalUnitPriceSet: shopMoneySchema,
            },
          },
        },
      },
    },
    shippingAddress: gqlAddressSchema,
    billingAddress: gqlAddressSchema,
    invoiceUrl: { type: ["string", "null"] },
    appliedDiscount: { type: ["object", "null"] },
    order: {
      type: ["object", "null"],
      properties: { id: { type: "string" as const } },
    },
    shippingLine: { type: ["object", "null"] },
    taxLines: { type: "array" as const, items: { type: "object" } },
    tags: { type: "array" as const, items: { type: "string" as const } },
    totalPriceSet: shopMoneySchema,
    subtotalPriceSet: shopMoneySchema,
    totalTaxSet: shopMoneySchema,
    paymentTerms: { type: ["object", "null"] },
    customer: { type: ["object", "null"] },
  },
};

const restDraftOrderSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" as const },
    note: { type: ["string", "null"] },
    email: { type: ["string", "null"] },
    taxes_included: { type: "boolean" as const },
    currency: { type: "string" as const },
    invoice_sent_at: { type: ["string", "null"] },
    created_at: { type: "string" as const },
    updated_at: { type: "string" as const },
    tax_exempt: { type: "boolean" as const },
    completed_at: { type: ["string", "null"] },
    name: { type: "string" as const },
    status: { type: "string" as const },
    line_items: { type: "array" as const, items: { type: "object" } },
    shipping_address: { type: ["object", "null"] },
    billing_address: { type: ["object", "null"] },
    invoice_url: { type: ["string", "null"] },
    applied_discount: { type: ["object", "null"] },
    order_id: { type: ["number", "null"] },
    shipping_line: { type: ["object", "null"] },
    tax_lines: { type: "array" as const, items: { type: "object" } },
    tags: { type: "string" as const },
    total_price: { type: "string" as const },
    subtotal_price: { type: "string" as const },
    total_tax: { type: "string" as const },
    payment_terms: { type: ["object", "null"] },
    customer: { type: ["object", "null"] },
    admin_graphql_api_id: { type: "string" as const },
  },
};

export const completeDraftOrderGqlOutputSchema = {
  type: "object" as const,
  properties: {
    draftOrder: gqlDraftOrderSchema,
    userErrors: userErrorsArraySchema,
  },
};

export const createDraftOrderGqlOutputSchema = {
  type: "object" as const,
  properties: {
    userErrors: userErrorsArraySchema,
    draftOrder: gqlDraftOrderSchema,
  },
};

export const deleteDraftOrderGqlOutputSchema = {
  type: "object" as const,
  properties: {
    deletedId: { type: "string" as const },
    userErrors: userErrorsArraySchema,
  },
};

export const getDraftOrderGqlOutputSchema = {
  type: "object" as const,
  properties: {
    draftOrder: gqlDraftOrderSchema,
  },
};

export const countDraftOrdersGqlOutputSchema = countSchema;

export const listDraftOrdersOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        draft_orders: { type: "array" as const, items: restDraftOrderSchema },
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

export const listDraftOrdersGqlOutputSchema = listDraftOrdersOutputSchema;
