import { nullableString } from "./shared";

export const listSupportedTimezonesOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    value: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          alias: nullableString,
          displayName: nullableString,
        },
      },
    },
  },
  required: ["value"],
};

export const listSupportedLanguagesOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    value: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          displayName: nullableString,
          locale: nullableString,
        },
      },
    },
  },
  required: ["value"],
};
