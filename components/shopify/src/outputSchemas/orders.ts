import {
  countSchema,
  moneyV2Schema,
  pageInfoSchema,
  userErrorsArraySchema,
} from "./shared";

const moneyBagSchema = {
  type: "object" as const,
  properties: {
    shopMoney: moneyV2Schema,
    presentmentMoney: moneyV2Schema,
  },
};

const shopMoneyOnlySchema = {
  type: "object" as const,
  properties: {
    shopMoney: moneyV2Schema,
  },
};

const gqlOrderSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    name: { type: "string" as const },
    app: {
      type: ["object", "null"],
      properties: { id: { type: "string" as const } },
    },
    clientIp: { type: ["string", "null"] },
    customerAcceptsMarketing: { type: "boolean" as const },
    cancelReason: { type: ["string", "null"] },
    cancelledAt: { type: ["string", "null"] },
    closedAt: { type: ["string", "null"] },
    confirmationNumber: { type: ["string", "null"] },
    confirmed: { type: "boolean" as const },
    createdAt: { type: "string" as const },
    currencyCode: { type: "string" as const },
    currentSubtotalPriceSet: moneyBagSchema,
    currentTotalAdditionalFeesSet: { type: ["object", "null"] },
    currentTotalDiscountsSet: moneyBagSchema,
    currentTotalDutiesSet: { type: ["object", "null"] },
    currentTotalPriceSet: moneyBagSchema,
    currentTotalTaxSet: moneyBagSchema,
    customerLocale: { type: ["string", "null"] },
    discountCodes: { type: "array" as const, items: { type: "object" } },
    dutiesIncluded: { type: "boolean" as const },
    email: { type: "string" as const },
    estimatedTaxes: { type: "boolean" as const },
    displayFinancialStatus: { type: ["string", "null"] },
    displayFulfillmentStatus: { type: ["string", "null"] },
    retailLocation: { type: ["object", "null"] },
    merchantBusinessEntity: { type: ["object", "null"] },
    merchantOfRecordApp: { type: ["object", "null"] },
    note: { type: ["string", "null"] },
    originalTotalAdditionalFeesSet: { type: ["object", "null"] },
    originalTotalDutiesSet: { type: ["object", "null"] },
    paymentGatewayNames: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    phone: { type: ["string", "null"] },
    poNumber: { type: ["string", "null"] },
    presentmentCurrencyCode: { type: "string" as const },
    processedAt: { type: "string" as const },
    sourceIdentifier: { type: ["string", "null"] },
    sourceName: { type: ["string", "null"] },
    registeredSourceUrl: { type: ["string", "null"] },
    subtotalPriceSet: moneyBagSchema,
    tags: { type: "array" as const, items: { type: "string" as const } },
    taxExempt: { type: "boolean" as const },
    taxLines: { type: "array" as const, items: { type: "object" } },
    taxesIncluded: { type: "boolean" as const },
    test: { type: "boolean" as const },
    totalCashRoundingAdjustment: {
      type: ["object", "null"],
      properties: {
        paymentSet: moneyBagSchema,
        refundSet: moneyBagSchema,
      },
    },
    totalDiscountsSet: moneyBagSchema,
    totalOutstandingSet: shopMoneyOnlySchema,
    totalPriceSet: moneyBagSchema,
    totalShippingPriceSet: moneyBagSchema,
    totalTaxSet: moneyBagSchema,
    totalTipReceivedSet: shopMoneyOnlySchema,
    totalWeight: { type: ["string", "null"] },
    updatedAt: { type: "string" as const },
    billingAddress: { type: ["object", "null"] },
    customer: { type: ["object", "null"] },
    lineItems: {
      type: "object" as const,
      properties: {
        nodes: { type: "array" as const, items: { type: "object" } },
      },
    },
    paymentTerms: { type: ["object", "null"] },
    refunds: { type: "array" as const, items: { type: "object" } },
    shippingAddress: { type: ["object", "null"] },
  },
};

export const cancelOrderGqlOutputSchema = {
  type: "object" as const,
  properties: {
    job: {
      type: ["object", "null"],
      properties: {
        id: { type: "string" as const },
        done: { type: "boolean" as const },
      },
    },
    orderCancelUserErrors: userErrorsArraySchema,
    userErrors: userErrorsArraySchema,
  },
};

export const closeOrderGqlOutputSchema = {
  type: "object" as const,
  properties: {
    order: gqlOrderSchema,
    userErrors: userErrorsArraySchema,
  },
};

export const countOrdersGqlOutputSchema = countSchema;

export const createOrderGqlOutputSchema = closeOrderGqlOutputSchema;

export const deleteOrderGqlOutputSchema = {
  type: "object" as const,
  properties: {
    deletedId: { type: "string" as const },
    userErrors: userErrorsArraySchema,
  },
};

export const getOrderGqlOutputSchema = {
  type: "object" as const,
  properties: {
    order: gqlOrderSchema,
  },
};

export const listOrdersGqlOutputSchema = {
  type: "object" as const,
  properties: {
    orders: { type: "array" as const, items: gqlOrderSchema },
    pageInfo: pageInfoSchema,
  },
};

export const getOrderOutputSchema = {
  type: "object" as const,
  properties: {
    order: { type: "object" },
  },
};
