import { pageInfoSchema } from "./shared";

export const listCurrenciesGqlOutputSchema = {
  type: "object" as const,
  properties: {
    currencies: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          currencyCode: { type: "string" as const },
          rateUpdatedAt: { type: "string" as const },
          enabled: { type: "boolean" as const },
        },
      },
    },
    pageInfo: pageInfoSchema,
  },
};
