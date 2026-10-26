export const pageInfoSchema = {
  type: "object" as const,
  properties: {
    hasNextPage: { type: "boolean" as const },
    endCursor: { type: "string" as const },
  },
};
export const userErrorSchema = {
  type: "object" as const,
  properties: {
    field: { type: "array" as const, items: { type: "string" as const } },
    message: { type: "string" as const },
  },
};
export const userErrorsArraySchema = {
  type: "array" as const,
  items: userErrorSchema,
};
export const moneyV2Schema = {
  type: "object" as const,
  properties: {
    amount: { type: "string" as const },
    currencyCode: { type: "string" as const },
  },
};
export const moneyBagSchema = {
  type: "object" as const,
  properties: {
    shopMoney: moneyV2Schema,
    presentmentMoney: moneyV2Schema,
  },
};
export const countSchema = {
  type: "object" as const,
  properties: {
    count: { type: "number" as const },
  },
};
export const restPaginationSchema = {
  type: "object" as const,
  properties: {
    limit: { type: "string" as const },
    page_info: { type: "string" as const },
    rel: { type: "string" as const },
    url: { type: "string" as const },
  },
};
export const restPaginationEnvelopeProperties = {
  pagination: {
    type: "object" as const,
    properties: {
      previous: restPaginationSchema,
      next: restPaginationSchema,
    },
  },
  pageInfo: { type: "string" as const },
  rel: { type: "string" as const },
};
