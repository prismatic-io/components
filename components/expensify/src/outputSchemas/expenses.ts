import { responseEnvelopeSchema } from "./common";

export const createExpenseOutputSchema = {
  type: "object" as const,
  properties: {
    ...responseEnvelopeSchema.properties,
    transactionList: {
      type: "array",
      items: {
        type: "object",
        properties: {
          transactionID: { type: "string" },
          amount: { type: "number" },
          merchant: { type: "string" },
          created: { type: "string" },
          currency: { type: "string" },
        },
      },
    },
  },
  required: ["responseCode"],
};
