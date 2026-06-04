import type { JSONForm } from "@prismatic-io/spectral";

interface Option {
  const: string;
  title: string;
}

export const createKeyValMapper = (keyOptions: Option[], valueOptions: Option[]): Omit<JSONForm, "data"> => ({
  schema: {
    type: "object",
    properties: {
      mappings: {
        type: "array",
        items: {
          type: "object",
          properties: {
            key: {
              type: "string",
              oneOf: keyOptions,
            },
            value: {
              type: "string",
              oneOf: valueOptions,
            },
          },
        },
      },
    },
  },
  uiSchema: {
    type: "VerticalLayout",
    




 
  },
});
