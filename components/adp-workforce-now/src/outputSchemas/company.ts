import {
  linksSchema,
  metaSchema,
  underscoreConfirmMessageSchema,
} from "./common";

export const listCompanyCodesOutputSchema = {
  type: "object" as const,
  properties: {
    codeListTitle: { type: "string" },
    exclusiveIndicator: { type: "boolean" },
    multiSelectionIndicator: { type: "boolean" },
    listItems: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          code: { type: "string" },
          name: { type: "string" },
          inactiveIndicator: { type: "boolean" },
          defaultIndicator: { type: "boolean" },
          description: { type: "string" },
          category: { type: "string" },
          valuePattern: { type: "string" },
          links: linksSchema,
        },
        required: ["code"],
      },
    },
    links: linksSchema,
    _meta: metaSchema,
    _confirmMessage: underscoreConfirmMessageSchema,
  },
};
