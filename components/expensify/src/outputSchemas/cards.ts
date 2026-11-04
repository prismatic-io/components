import { responseEnvelopeSchema } from "./common";

export const listCardsOutputSchema = {
  type: "object" as const,
  properties: {
    ...responseEnvelopeSchema.properties,
    domainCardList: {
      type: "array",
      items: {
        type: "object",
        properties: {
          bank: { type: "string" },
          cardID: { type: "number" },
          cardName: { type: "string" },
          cardNumber: { type: "string" },
          created: { type: "string" },
          email: { type: "string" },
          externalEmployeeID: { type: "string" },
          lastImport: { type: "string" },
          lastImportResult: { type: "number" },
          reimbursable: { type: "boolean" },
          scrapeMinDate: { type: "string" },
        },
      },
    },
  },
  required: ["responseCode"],
};
